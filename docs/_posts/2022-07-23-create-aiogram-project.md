---
title: 用 AIOGram 建立機器人專案 — Telegram Bot 開發雜談（一）
tags:
 - bot
 - python
 - programing
_draft: true
---

午安旅人，這裡是一個月沒有更新文章的 Saweima。不知道旅人有沒有在 Telegram 公開群組遇到過惡意騷擾人士呢？時不時的開新帳號跑進群組貼一些會讓人感到噁心的圖片，踢完過一陣子又再次故技重施，猶如蟑螂一般，殺也殺不完。

考量到管理員不可能時時刻刻都在、刪除圖片時管理員自身也不可避免的會受到精神攻擊，人工處理顯然不是一種好辦法。考量到需求的急迫性，花了幾週時間研究及編寫機器人，在這邊記錄下自己用到的東西們。


## AIOGram

AIOGram 是 Telegram Bot API 的 Python 包裝器，用於將繁瑣的 HTTP API 呼叫流程包裝為程式物件並解析 API 的回傳資料，讓操作流程與程式語句一樣直觀。

> **AIOGram** <br/>
> Github: [點我進入](https://github.com/aiogram/aiogram) <br/>
> 官方文擋: [點我進入](https://docs.aiogram.dev/en/latest/) <br/>

特性：
- 使用 Python 3.7 以上版本。
- 透過 asyncio 及 aiphttp 實作，支援 Asynchronous （異步/非同步）調用。
- 內置 API 封包解析及定義型別，省去研究封包結構的時間。

其他的 API 包裝器可參考 [**Telegram 的官方列表**](https://core.telegram.org/bots/samples)


## 註冊 Telegram Bot
 
在使用之前，必須先透過 Telegram Bot Father 註冊新的 bot 帳戶。

<div class="flex flex-col">
    <img class="lightbox" src="https://media.saweicore.com/blog/create-aiogram-project/register-tg-bot.jpg" style="max-height:500px"">
</div>

- 加入有藍色勾勾（證明為官方帳號）的 BotFather
- 輸入指令 `/newbot` 註冊新的 Bot
- 第一次輸入 Bot 的名稱
- 第二次輸入 Bot 的帳號

以上流程都成功後就後會取得使用 API 的 TOKEN 如：`5292723007:AAE-APVbUkZgOZ6CVb4GM_KfV7CtE5dgLmw`，這段需要保存好，未來所有操作都會需要用到。


## 建立基本結構

AIOGram 有兩種取得 update 資訊的方式。以下為兩種範例。

### 使用 Polling 

```py
# 導入 Aiogram 包
from aiogram import Bot
from aiogram.types import Message, ContentTypes
from aiogram.dispatcher import Dispatcher
from aiogram.utils.executor import start_polling

# 記錄 BOT_TOKEN 並且建立 Bot 物件
BOT_TOKEN = "5292723007:AAE-APVbUkZgOZ6CBGM_KfV7CtE5dgLmw"
bot = Bot(BOT_TOKEN)
# 建立 Bot 的分發器（收到的 Data 會被傳入這裡
dp = Dispatcher(bot)

# Process start command
@dp.message_handler(commands=['start'])
async def on_start_command(message: Message):  
    print("on start command")

# Process all messages except start command
@dp.message_handler(content_types=ContentTypes.ANY)
async def on_message(message: Message):
    await message.reply(message.from_user.id)

async def on_startup(dispatcher: Dispatcher):
    print("startup")

async def on_shutdown(dispatcher: Dispatcher):
    print("shutdown")


if __name__ == "__main__":
    start_polling(dp, on_startup=on_startup, on_shutdown=on_shutdown)
```

Polling 方式是透過一個迴圈，定期的呼叫 Telegram Bot API 的 getUpdate 方法取得新的訊息，並將其傳入 dispatcher 進行分發，直到被中斷為止。

- `Bot` 類負責與 Bot API 溝通，包含 **send_message** 或 **deleted_message** 等主動操作的 method 。
- `Dispatcher` 類負責接收 API 的 Update 訊息（不論是透過 Polling 還是 Webhook 接收的）依據特徵分發給各 message_handler 。
- `Message` 類是透過 Dispatcher 分類過後的訊息物件，包含 message_id , chat_id, user_id 等關鍵的判斷訊息， AIOGram 也有在此基礎上實作許多輔助方法。
- `dp.message_handler()` 可以將底下的 function 註冊為處理器，並且透過參數如: **content_types** 、**commands** 設定只接包含哪些特徵的訊息。
- `start_polling` 用於執行**自動抓取 Telegram 的訊息**更新。


### 使用 Webhook

```py
from aiogram import Bot
from aiogram.types import Message, ContentTypes
from aiogram.dispatcher import Dispatcher
from aiogram.utils.executor import start_webhook

BOT_TOKEN = "5292723007:AAE-APVbUkZgOZ6CBGM_KfV7CtE5dgLmw"

# WEBHOOK SETTING
WEBHOOK_DOMAIN = "https://68dc-211-23-21-139.jp.ngrok.io"
WEBHOOK_PATH="/api"
WEBHOOK_URI=f"{WEBHOOK_DOMAIN}{WEBHOOK_PATH}"

# WEBHOST SETTING
WEB_HOST = "0.0.0.0" # or ip
WEB_HOST_PORT = 8000

bot = Bot(BOT_TOKEN)
dp = Dispatcher(bot)

# Process start command
@dp.message_handler(commands=['start'])
async def on_start_command():  
    print("on start command")

# Process all messages except start command
@dp.message_handler(content_types=ContentTypes.ANY)
async def on_message(message: Message):
    await message.reply(message.from_user.id)


async def on_startup(dispatcher: Dispatcher):
    print("startup")
    await bot.set_webhook(WEBHOOK_URI)


async def on_shutdown(dispatcher: Dispatcher):
    print("shutdown")
    await bot.delete_webhook()


if __name__ == "__main__":
    start_webhook(dispatcher=dp, 
                webhook_path=WEBHOOK_PATH,
                on_startup=on_startup,
                on_shutdown=on_shutdown,
                skip_updates=True,
                host=WEB_HOST, 
                port=WEB_HOST_PORT)
```

Webhook 方式是在啟動時通知 Telegram 伺服器將新訊息傳輸至對應的 URL，透過 HTTP 接口來接收資訊的方式。

大多數結構與使用 Polling 時相同，因此這邊僅列舉差異的地方。
- `bot.set_webook` 用於通知 Telegram 伺服器，將訊息傳輸到註冊的 URL。
- `bot.delete_webhook` 用於關閉時通知 Telegram 伺服器停止輸送訊息至註冊的 URL
- `start_webhook` 用於啟動一個小型的 HTTP Server 監聽 webhook_path 參數指定的路徑。host、port 用於配置啟動的 host 與 port。

> - 較為推薦使用 **Webhook** 方式接收 Update 訊息，可以節省頻繁發送封包的流量及不斷輪詢計算損耗的電腦資源。
> - 不過要以此作為接收訊息方式，至少會需要一個支援 HTTPS 的網域。因此還是依據手邊的資源決定。

## 如何在本地端進行測試？

如果使用 Polling 接收資訊的話倒還好，如果使用 Webhook 的話，最先遇上的問題大概就是怎麼進行測試，總不能每次都先發布到遠端伺服器，又或是根本沒有遠端伺服器，這時怎麼辦呢？可以考慮使用反向代理工具。

### Ngrok

> **Ngrok** <br/>
> https://ngrok.com/

Ngrok 是一款有提供免費方案的反向代理工具，並且也支援 HTTPS 轉發，可以用於本地端的 WEBHOOK 測試，並且完全滿足這次的需求，使用前需要先在官網註冊帳號取得 AUTH_TOKEN 並下載對應作業系統的檔案。輸入以下指令設定 {AUTH_TOKEN}

```sh
ngrok config add-authtoken {AUTH_TOKEN}
```

設定完成後，再來只需要輸入以下指令即可將自己的 API PORT 綁定到 ngrok 提供的 domain 上。
```sh
ngrok http 8000
```


## 如果不使用包裝器的話？

在 Telegram Bot API 中所有的操作，不論是 **[接收資訊]** 還是 **[發送訊息]** 都是透過 HTTP API 來進行。`結構如下：

```text
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME}
```

- `BOT_TOKEN` -> 從 BotFather 取得的 Token String 
- `METHOD_NAME` -> 對應的方法名稱，如：getMe、getUpdates

支援 GET 與 POST 的操作，意味著對於簡單的訊息可以直接使用瀏覽器輸入 Url QueryParams。
```text
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME}?url={API_URL}
```
針對複雜的操作可以透過 POST 並夾帶於 Body 中。支援的 Content-Type：

- `application/x-www-form-urlencoded`
- `application/json (except for uploading files)`
- `multipart/form-data (use to upload files)`


## 注意事項

- Telegram 超過 500人的群組有可能收不到 Join Message 
- 機器人之間會互相打架。 