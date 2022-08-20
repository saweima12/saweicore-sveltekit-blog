---
title: 結合 Sanic 進行全方位強化  - Telegram Bot 開發雜談（二）
tags:
- bot
- web
- python
- programing
excerpt: 使用 Sanic Framework 取代 AIOGram 內建的 HTTP Server 可以獲得更好的開發體驗、更高的效能以及更高的擴展性。
---

午安旅人，在上一篇的介紹中 AIOGram 雖然提供了小型的 HTTP 伺服器方便快速啟用，但在開發上卻不是很便利。

每次修改代碼都必須手動重啟開發伺服器、可配置的路由較少只能用於接收 Webhook 訊息、缺少各式 DEBUG 訊息等，總是有些綁手綁腳。這時可以考慮使用 Web 框架取代內建的開發伺服器，進而提升開發體驗及獲得相關工具的支援。

在這篇會簡略的說明與 Sanic 框架一起使用的好處以及如何將 AIOGram 及 Sanic 兩者整合起來。

> **若是誤入此地的旅人，還不清楚 AIOGram 和 Sanic 是什麽的話，可以參考以下兩篇文章：**
> - [用 AIOGram 建立機器人專案 — Telegram Bot 開發雜談（一）](https://saweicore.com/posts/2022/07/create-aiogram-project) <br/>
> - [Sanic - 輕量快速的 Python Web Framework](https://saweicore.com/posts/2022/08/sanic-introduce)

## 結合 Sanic 的好處

Sanic 是當前 Python 生態中最兼具效能與工具鏈的 Web 框架，支援 async / await 特性與 AIOGram 正好契合，結合 Sanic 可獲得以下好處：

- **更高的效能** => Sanic 框架採用 uvloop 作為事件循環，相比 AIOGram 預設的 EventLoop 有著 40% 以上的性能提昇。[參考文章](https://magic.io/blog/uvloop-blazing-fast-python-networking/)
- **更靈活的應用** =>  透過 Sanic 定義 API 接口，可實作**呼叫對應 URL 對 Bot 下指令**的機制。
- **更方便的開發環境** =>  Sanic 提供了自動重載、讀取 Config 、完善的 Debug 訊息機制並且內建快速的 Server 方便開發與部署。


## 基本結構

```python
from sanic import Sanic, Request, response
from aiogram import Bot, Dispatcher
from aiogram.types import Update, ContentTypes, Message

# API_URL 用於填寫 DOMAIN 網址，更換環境時只要替換掉即可。
APP_URL = "https://21cd-61-64-6-47.jp.ngrok.io"

# 透過 BOT_TOKEN 及路由設定組合出需要註冊的 WEBHOOK_URL 
BOT_TOKEN = "5509354767:AAEJbXnhEI5cwrXAUMEsGcF4le5I9I0QAac"
BOT_WEBHOOK_PATH = f"/bot/{BOT_TOKEN}"
BOT_WEBHOOK_URL = f"{APP_URL}{BOT_WEBHOOK_PATH}"

# 建立 Sanic App 及 Aiogram 的 Bot 及 Dispatcher
app = Sanic(__name__)
bot = Bot(BOT_TOKEN)  # 所有操作（傳送訊息、刪除）都是透過 Bot 類完成
dp = Dispatcher(bot) # 內建的事件分發器，會自動將訊息處理成對應的 Type (如 Message)

# 註冊 Sanic 路由用於接收 telegram 更新訊息。
@app.post("/bot/<token:str>")
async def on_webhook(request: Request, token: str):
    # 將定義的 bot instance 設置為 Bot class 的預設值。
    Bot.set_current(bot)
    # 由於 BOT_TOKEN 理論上只有使用者及 Telegram 雙方知道，因此可以用於確認訊息是否來自於 telegram.
    if token != BOT_TOKEN:
        return response.empty(200)
		
    # 將收到的訊息轉換成 Update 物件並傳入 Dispatcher 進行型別轉換及分發事件。
    update = Update(**request.json)
    await dp.process_update(update)
    # 必須返回 200，當 telegram 收到此以外的數值會嘗試重新傳送訊息導致卡住。
    return response.empty(200)


# 可以擴展 route 來建立更多靈活應用。
@app.get("/me")
async def me(request: Request):
    # 取得 bot 的資訊並回傳 json.
    me_info = await bot.get_me()
    return response.json(me_info.to_python())

# 將 on_message 註冊為 dispatcher 監聽者，會將符合的訊息傳入到對應的 function.
@dp.message_handler(content_types=ContentTypes.ANY)
async def on_message(message: Message):
    # Message 類中包含 reply 、anser 等回覆用的 function.
    # 會自動取用 Bot.set_current 設置的 instance。
    await message.reply("Hello")
	

# 僅在 App 啟動時執行一次，避免多 worker 時重複設置 webhook。
@app.main_process_start
async def startup(app: Sanic):
    # 設置 telegram 的 webhook 接收路由，需要與上面的 sanic 路由匹配。
    await bot.set_webhook(BOT_WEBHOOK_URL)

# 伺服器關閉時註銷 webhook.
@app.before_server_stop
async def dispose(app: Sanic):
    await bot.delete_webhook()

if __name__ == '__main__':
    app.run() 
```

上面的範例，已經成功將 AIOGram 與 Sanic 組合在一起，主要流程為：

-> 啟動 Sanic 伺服器並向 Telegram 通知註冊 Webhook。  
-> 透過 Webhook 的 route 接收 Update 訊息。  
-> 將接收到的 Update 訊息處理成 Update 物件送入 Dispatcher。  
-> Dispatcher 會將內容轉換成 Message 物件並依據分類送入對應的 Handler。  
-> 最後 Handler 依據收到的 message 發送回應。  

雖然合併使用沒問題，但目前所有的內容都擠在一起，有點雜亂，接下來將會對此進行強化。

## 強化方案

強化方案會將各個部件依照職責進行拆分藉此獲得更好的擴展性、更乾淨的結構並在開發時啟用 debug 模式，當腳本變更時自動重新伺服器，藉此獲得更好的開發體驗。

```txt
/
├─ sanicbot
│   ├─ bot.py       - AIOGram 的輔助功能
│   ├─ config.py    - 配置變量
│   ├─ view.py      - 配置路由
│   └─ __init__.py  - App 入口
└─ dev.sh - 方便啟動時使用的腳本
```

### 分離 Config 配置

- 建立 `config.py` 檔案，將需要配置的內容移動過去。
```python
APP_URL = "https://21cd-61-64-6-47.jp.ngrok.io"
BOT_TOKEN = "5509354767:AAEJbXnhEI5cwrXAUMEsGcF4le5I9I0QAac"
BOT_WEBHOOK_PATH = f"/bot/{BOT_TOKEN}"
BOT_WEBHOOK_URL = f"{APP_URL}{BOT_WEBHOOK_PATH}"
```

- 在`__init__.py` 中，使用 `app.update_config()` 讀取 config module 。
```python
...
from . import config

app = Sanic(__name__)
app.update_config(config)
```

之後就可以透過 `Sanic.get_app()` 取得 app instance 後使用 `app.config[]` 讀取 config 了。

### 分離 Bot 邏輯

- 建立 `bot.py`，編寫與 Bot 相關的輔助功能。

```python
from sanic import Sanic
from aiogram import Bot, Dispatcher
from aiogram.types import ContentTypes, Message

# 作為 app.ctx 中的 key 值，不可重複。
SERVICE_CODE = "bot"
DP_CODE = f"{SERVICE_CODE}_dp" 

# 類型標注可幫助 IDE 取得類型，方便辨認。
def get_bot() -> Bot:
    app = Sanic.get_app()
    return getattr(app.ctx, SERVICE_CODE)

def get_dp() -> Dispatcher:
    app = Sanic.get_app()
    return getattr(app.ctx, DP_CODE)

async def register(app: Sanic):
    # 從 app.config 中取得 token 及 webhook url.
    token = app.config["BOT_TOKEN"]
    webhook_url = app.config["BOT_WEBHOOK_URL"]

    # 定義 bot 跟 dispatcher instance
    bot = Bot(token)
    dp = Dispatcher(bot)

    # 註冊 bot dispatcher handler
    @dp.message_handler(content_types=ContentTypes.ANY)
    async def on_message(message: Message):
        await message.reply("Hello")

    
    # 啟動時向 telegram 註冊 webhook.
    @app.main_process_start
    async def startup(app: Sanic):
        await bot.set_webhook(webhook_url)

    @app.before_server_stop
    async def dispose(app: Sanic):
        await bot.delete_webhook()


    # 重要：將 bot 及 dispatcher 加入 app.ctx 方便其他地方使用。
    setattr(app.ctx, SERVICE_CODE, bot)
    setattr(app.ctx, DP_CODE, dp)
```

- 在 `__init__.py` 中，使用 `register()` 將 Bot 及 Dispatcher 註冊進 **app.ctx**

```python
...
from . import bot

app = Sanic(__name__)
bot.register(app)
```

之後就能夠在其他地方透過 `get_bot()` 及 `get_dp()` 取得 instance 。

### 分離 Route 設置

- 建立 `view.py` 檔案，編寫所有的路由。 

```python
from sanic import Blueprint, Request, response
from aiogram import Bot
from aiogram.types import Update

from .bot import get_bot, get_dp

# 透過 sanic 的 Blueprint 定義路由，使用方法與使用 app.route 時相同。
bp = Blueprint("bot")

# Telegram 送來的資料都是 post 的 json 格式。
@bp.post("/bot/<token:str>")
async def on_webhook(request: Request, token: str):

    # 從 bot module 的輔助方法中分別取得 bot, dp, token
    bot = get_bot()
    dp = get_dp()

    # 檢查路由的 token 是否與 bot token 一致，確保資訊來源於 telegram。
    if token != bot._token:
        return response.empty(200)

    # 每次 request 都需要重新設定預設的 bot instance。
    Bot.set_current(bot)
    update = Update(**request.json)
    
    # 送入分發器進行處理。
    await dp.process_update(update)
    
    # must return status code 200.
    return response.empty(200)
```

- 在 `__init__.py` 中，使用 `app.blueprint()` 註冊路由。
```python
...
from . import view
app = Sanic(__name__)
app.blueprint(view.bp)
```

以上都完成後，就能夠運行看看是否能夠正常。

### 使用自動重載

```sh
sanic sanicbot:app -d
```

透過 Sanic 的 Command Line 工具啟動 App 並使用 `-d` 參數開啟 debug 模式，當偵測到檔案變更時，會自動進行 reload，不用再手動重啟伺服器。

## 範例專案

> **AIOGram-Sanic-Example**<br/>
> 撰寫本篇文章時建立的專案，也可作為最基礎專案的樣板使用。<br/><br/>
> GitHub：[點我進入](https://github.com/saweima12/aiogram-sanic-example)

<br/>

> **Saweibot**<br/>
> 最初用 AIOGram 及 Sanic 建立的專案，採用類似的結構分佈，另外有包含與資料庫、Redis 的交互及簡單的排程功能。<br/><br/>
> GitHub：[點我進入](https://github.com/saweima12/saweibot)

## TL;DR

- AIOGram 搭配 Sanic 使用能在效能、開發體驗上都獲得巨大提昇。
- 透過將 Route、Bot 邏輯、Config 分離，可以獲得更乾淨的專案結構。
- 對於重複使用的 instance 可以附加至 `app.ctx` 中，方便取用。
- 可以透過 `Sanic.get_app()` 取得 instance，並以此為基礎讀取 app.config 及 app.ctx 的內容。