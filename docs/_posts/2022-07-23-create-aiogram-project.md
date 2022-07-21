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


## AIOGram 是什麼？

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
    Bot.
    await message.reply(message.from_user.id)

async def on_startup(dispatcher: Dispatcher):
    print("startup")

async def on_shutdown(dispatcher: Dispatcher):
    print("shutdown")


if __name__ == "__main__":
    start_polling(dp, on_startup=on_startup, on_shutdown=on_shutdown)
```

幾項要點：
- `Bot` 類負責與 Bot API 溝通，包含 `send_message`、`deleted_message` 等主動操作的 method.
- `Dispatcher` 類負責接收 API 的 Update 訊息（不論是透過 Polling 還是 Webhook 接收的）依據特徵分發給各 message handler
- `dp.message_handler()` 可以將他底下的 function 註冊為處理



## Ngrok

> **Ngrok** <br/>
> https://ngrok.com/

反向代理工具，用於在本機開發時測試 HTTPS WEBHOOK。在官網下載並註冊後取得 authToken，輸入以下指令完成設定。

```sh
ngrok config add-authtoken {AUTH_TOKEN}
```
* `AUTH_TOKEN` 為註冊後，在後台取得的字串。

只需要輸入指令即可將自己的 API PORT 綁定到 ngrok 提供的 domain 上。

```sh
ngrok http 8000
```

## 如果不使用包裝器的話？

在 Telegram Bot API 中所有的操作，不論是 **[接收資訊]** 還是 **[發送訊息]** 都是透過 HTTP API 來進行。結構如下：

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