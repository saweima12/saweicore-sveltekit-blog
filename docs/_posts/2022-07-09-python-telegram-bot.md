---
title: 用 Python 開發 Telegram Bot 相關記錄
tags:
 - bot
 - sanic
 - python
_draft: true
---

午安旅人，這裡是將近一個月沒有更新文章的 Saweima。不知道旅人有沒有在 Telegram 公開群組遇到過惡意騷擾人士呢？時不時的開新帳號跑進群組貼一些會讓人感到噁心的圖片、影片，踢完過一陣子又再次故技重施，猶如蟑螂一般，j殺也殺不完。

考量到管理員不可能時時刻刻都在，並且刪除時管理員自身也會受到精神攻擊，人工處理顯然不是一種好辦法，必須要有自動化的解決方案，由於需求的急迫性，花了三週專心研究，以下是一些相關紀錄。

## Telegram？那是什麼

一個聊天社群軟體，與台灣常用的 Line 相比在功能性跟擴展性上有過之而無不及，美中不足是**非 VIP 會員**沒有辦法阻擋被不認識的人私訊，導致詐騙帳號猖獗，以及沒有更方便的權限設置，避免群組被人用垃圾訊息攻擊。

> Telegram <br/>
> 官方連結：[點我進入](https://telegram.org)


## Telegram 機器人

最後採用的辦法是透過群組機器人進行自動化處理，每當成員第一次發言時，就將其限制，暫時禁止使用非純文字訊息及轉傳訊息 (forward) 功能，並於進行一定程度交談後才開放權限，藉此措施創造緩衝區，避免新帳號的瘋狂垃圾訊息攻擊，也不會有機器學習辨認造成的誤判刪除問題，盡量避免對活躍成員造成影響。

在 Telegram 的 Bot API 是**不收費**的，相比 Line Chatbot 而言有著更低的入門門檻。從簡單的定期推送訊息、自動回覆對話，到複雜的檢查群組內容、自動刪除訊息、設置權限都能夠做到。

###  註冊 Telegram Bot 

透過 Telegram 加入 Bot Father 註冊新的 bot

最後保存好取得的 BotToken 字串，未來所有操作都會需要。

## 使用 Bot API 

所有操作包含接收資訊及發送訊息都是透過 HTTP API 來進行，基本結構如下：

```url
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME}
```

- BOT_TOKEN -> 填入從 BotFather 取得的 Token String.
- METHOD_NAME -> 填入對應的方法名稱，如：getMe

支援 GET 與 POST 的操作，對於簡單的訊息可以直接使用 Get 搭配 Query Params 如:

```text
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME?url={API_URL}
```

針對複雜的操作可以透過 POST 並夾帶於 Body 之中。支援 Content-Type：
```
- application/x-www-form-urlencoded
- application/json (except for uploading files)
- multipart/form-data (use to upload files)
```

**重點整理：**
- BOT_TOKEN 是從 BotFather 註冊時取得的亂數字串。
- 大多 Method 皆支援 GET 與 POST 的操作。
- application/json 適用於除上傳檔案以外的所有操作。
- multipart/form-data  適用於上傳檔案（如有必要），通常是圖片。


## 如何取得聊天訊息？

取得聊天訊息的方法有兩種：
- 主動 call getUpdates 透過 responses 取得 update message. 
- 啟動時 call setWebhook 登記用於接收的 API 網址，之後 Telegram 接收到訊息時會主動發送 message 至註冊的 API Endpoint.

**重要：** 推薦使用 Webhook 接收訊息的方法，避免定期 polling 造成的效能浪費。但使用 Webhook 需要有 HTTPS 的 domain 才可使用，需要依照環境做抉擇。

###  getUpdates

參考資料：https://core.telegram.org/bots/api#getupdates

**範例 URL**：
```text
https://api.telegram.org/bot{BOT_TOKEN}/getUpdates
```

**Response**:
```js
{
  "ok":true,
  "result":[
    {
      "update_id":136940592,
      "message":{
        "message_id":964,
        "from":{
          "id":549919258,
          "is_bot":false,
          "first_name":"Ch.",
          "last_name":"S",
          "username":"Saweima"
        },
        "chat":{
          "id":-1001756617092,
          "title":"T1 Group",
          "type":"supergroup"
        },
        "date":1657095304,
        "text":"test"
      }
    }
  ]
}
```

### setWebhook

參考資料：https://core.telegram.org/bots/api#setwebhook

**範例 URL ：**
```text
https://api.telegram.org/bot{BOT_TOKEN}/setWebhook?url=https://4bc4-211-23-21-139.jp.ngrok.io/api/hook
```

設置成功後， Telegram 收到訊息更新時會嘗試向登記的 url 發送 request。 

**Response：** 收到的資料與 getUpdates 取得的資料相同
```js
{
  "message_id":965,
  "from":{
    "id":549919258,
    "is_bot":false,
    "first_name":"Ch.",
    "last_name":"S",
    "username":"Saweima"
  },
  "chat":{
    "id":-1001756617092,
    "title":"T1 Group",
    "type":"supergroup"
  },
  "date":1657098304,
  "text":"test"
}
```

**補充：** 當 Telegram 呼叫 API 的 endpoint 時必須要返回成功的 http 狀態碼（可參考：https://developer.mozilla.org/zh-TW/docs/Web/HTTP/Status），收到錯誤訊息時 Telegram 會等待約 5~15 秒後再次重新發送。

## 如何發送操作

所有支援的操作可參考：https://core.telegram.org/bots/api#available-methods

```text
https://api.telegram.org/bot{BOT_TOKEN}/sendMessage?chat_id=-1001756617092&text=test訊息
```

與發送 getUpdates 相同，也是透過 HTTP request 進行。

上面的範例會在對應的聊天頻道中發送「test訊息」並取得以下 Response：
```js
{
  "ok":true,
  "result":{
    "message_id":966,
    "from":{
      "id":544257031,
      "is_bot":true,
      "first_name":"test_bot",
      "username":"testBot"
    },
    "chat":{
      "id":-1001756617092,
      "title":"T1 Group",
      "type":"supergroup"
    },
    "date":1657180651,
    "text":"test"
  }
}
```

### API 的包裝器

即便透過 HTTP request 就能夠發送指令，但在代碼中混用 URL 字串並不直觀，為解決這問題，社群也有提供各語言的 API 包裝器。

**官方整理列表：** https://core.telegram.org/bots/samples

## Python 開發環境

預期機器人專案規模不大，為了能夠靈活調整、增加功能及考量到語言熟悉程度，最後決定採用 Python 進行開發。選用的相關工具：
 
### AIOGram

> **AIOGram** <br/>
> Github: [點我進入](https://github.com/aiogram/aiogram)


對於 API 包裝器有兩項需求：
 - 支援 Asynchronous (非同步調用)
 - 能夠與 Web Framework 進行整合

在測試了幾個官方列表中較為成熟的方案後，採用 AIOGram，一款透過 asyncio 與 aiohttp 實作的 Telegram Bot API 包裝器，支援 asyncio 的異步調用並且兼容各大常用的 Python Web Framework 。

### Sanic

> **Sanic** <br/>
> 官方網站: [點我進入](https://sanic.dev/en/)

目前 Python Web Framework 生態中相對較新的非同步框架，專注於優化效率及擴展性。編寫起來也非常的簡潔。

**與 Golang Framework 的粗略比較：** [點我進入](https://yogesh-sharma.medium.com/python-sanic-vs-golang-mux-d9fc2e5eb723)

Tips:  處理效能到達一定程度後，處理瓶頸就會變成 IO 瓶頸及網路瓶頸，而 Sanic 正好達到了這條分水嶺。


## 一些配套工具

- ngrok
- tortoise ORM
- py-redis

## 注意事項

- Telegram 超過 500人的群組有可能收不到 Join Message 
- 機器人之間會互相打架。2