---
title: 用 AIOGram 建立機器人專案 — Telegram Bot 開發雜談（一）
tags:
 - bot
 - python
 - programing
_draft: true
---

午安旅人，這裡是一個月沒有更新文章的 Saweima。不知道旅人有沒有在 Telegram 公開群組遇到過惡意騷擾人士呢？時不時的開新帳號跑進群組貼一些會讓人感到噁心的圖片，踢完過一陣子又再次故技重施，猶如蟑螂一般，殺也殺不完。

考量到管理員不可能時時刻刻都在且刪除圖片時管理員自身也不可避免的會受到精-攻擊，人工處理顯然不是一種好辦法，必須要由機器人來處理。由於需求的急迫性花了幾週專心研究，以下是一些相關紀錄。

## 註冊 Telegram Bot 

透過 Telegram Bot Father 註冊新的 bot



保存好取得的 BotToken 字串，未來所有操作都會需要用到。

## 如何操作 Bot ?

在 Telegram Bot 中所有的操作，不論是 **[接收資訊]** 還是 **[發送訊息]** 都是透過 HTTP API 來進行。結構如下：

```text
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME}
```

- `BOT_TOKEN` -> 入從 BotFather 取得的 Token String. 如：5292723007:AAE-APVbUkZgOZ6CVb4GM_KfV7CtE5dgLmw
- `METHOD_NAME` -> 對應的方法名稱，如：getMe、getUpdates

支援 GET 與 POST 的操作，意味著對於簡單的訊息可以直接使用瀏覽器輸入 Url QueryParams。
```text
https://api.telegram.org/bot{BOT_TOKEN}/{METHOD_NAME}?url={API_URL}
```
針對複雜的操作可以透過 POST 並夾帶於 Body 中。支援的 Content-Type：

- `application/x-www-form-urlencoded`
- `application/json (except for uploading files)`
- `multipart/form-data (use to upload files)`

雖然透過 HTTP request 就能夠發送指令，但在代碼中混用 URL 字串並不直觀，為解決這問題，社群也有提供各語言的 API 包裝器。

### API 的包裝器

以下是官方提供的 API 包裝器的範例列表，包含 C#、Python、Golang 等常見語言。

**官方整理列表：** https://core.telegram.org/bots/samples

透過 API 包裝器將 HTTP Request 包裝為程式語句，避免每次都需要使用 Url 字串的麻煩。

## 開發環境建立

### AIOGram

> **AIOGram** <br/>
> Github: [點我進入](https://github.com/aiogram/aiogram)

這次對於 API 包裝器有兩項需求： 
 - 支援 Asynchronous (非同步調用)
 - 可以與 Web Framework 進行整合

在測試了幾個官方列表中較為成熟的方案後，最後採用 AIOGram，支援異步調用並且兼容各大常用的 Python Web Framework，最符合這次的需求。

**支援非同步調用的重要性：**由於 Bot 大多數操作都是透過 HTTP Request 進行，每一次的操作間隔會受到網路速度影響，在我自己的環境下經常會長達 300ms。若不使用非同步調用，容易因為等待 response 而導致執行緒阻塞，這在批次刪除訊息時會更為明顯（每一次的訊息刪除將會有明顯的間隔）

### Ngrok

> **Ngrok** <br/>
> https://ngrok.com/

反向代理工具，用於在本機開發時測試 HTTPS WEBHOOK。在官網下載並註冊後取得 authToken，輸入以下指令完成設定。

```sh
ngrok config add-authtoken {AUTH_TOKEN}
```
* `AUTH_TOKEN` 為註冊後，在後台取得的字串。

只需要輸入指令即可將自己的 API PORT 綁定到 ngrok 提供的 domain 上。 如：

```sh
ngrok http 8000
```

## 注意事項

- Telegram 超過 500人的群組有可能收不到 Join Message 
- 機器人之間會互相打架。 