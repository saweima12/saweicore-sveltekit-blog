---
title: 踏入區塊鏈與探索去中心化應用 — 加密貨幣入門大小事（二）
tags:
 - 幣圈
 - 區塊鏈
 - 加密貨幣
excerpt: 投入了加密貨幣後，想要進一步探索區塊鍊上的生態，卻又不知道該怎麼做嘛？這篇文章概略的介紹了一些區塊鏈的生態與操作步驟，或許能夠提供一些小幫助。
---

午安，旅人。看到這段文字的你，或許打算更進一步的探索加密貨幣與區塊鏈的領域。如果是的話，這篇文章或許能帶給你一些幫助，在此會簡單的介紹如何把資金送到區塊鍊進行應用以及簡單說明什麼是區塊鏈。

> 如果是誤入此地的旅人，對於踏入加密貨幣領域有點興趣卻又不知道從何開始的話可以參考這篇文章，做好初步的準備。<br/>
> 連結：[**如何取得加密貨幣 — 加密貨幣入門大小事**](/posts/2022/05/crypto-getting-start)

## 這篇文章希望能帶你
- 建立自己的鏈上錢包
- 嘗試使用去中心化應用 (DApp)
- 初步理解區塊鏈為何存在
- 簡單理解加密貨幣種類

## 建立鏈上錢包

目前常見的公鏈有：ETH、CARDANO(ADA) 、AVAX 及 SOLANA。不論最終選擇哪個，想要**進入區塊鏈領域第一件事情便是建立一個鏈上錢包地址**，並將資金轉到鏈上。

在開始之前有以下幾點需要注意：
- **做好事前調查**：請確保對自己所選擇的公鏈有一定程度的了解，並且確認其足以信任。
- **永遠為自己的行為負責**：絕對不要過度投入，確保能夠承擔多少風險，沒人能夠替你負責。
- **要有防範意識**：在加密貨幣市場中，大多人是不太理性的，即便是市值前五名的公鏈都有可能一夕蒸發，務必做好風險控管。

> 由於現今區塊鏈數量眾多，每條鏈的特性及功能雖然略有不同，但終端使用者操作步驟都大同小異。因此這邊會以我自己最熟悉的 Cardano(ADA) 區塊鏈為例。

### 選擇使用的錢包

在 Cardano 中有多種錢包可以選擇，其中大多數都以瀏覽器插件的形式存在，這邊推薦使用 [Eternl Wallet](https://eternl.io/) 。
- 目前使用最順手的錢包，雖然畫面有點小複雜但是功能齊全。
- 由於目前只支援 Chromium 系列瀏覽器，因此推薦搭配 [Brave瀏覽器](https://brave.com/zh/download/) 使用。
- 建議與平時使用的瀏覽器分開，避免遇上釣魚網站或是遇到瀏覽器漏洞被駭入的問題。
- 有支援 Android 手機板。
- 接下來也會以此錢包作為示範

### 透過錢包創建自己的錢包地址

<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-01.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
1. 點擊 「Add Wallet」 進入選單
</p>
<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-02.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
2. 點擊 「Create Wallet」 創建自己的錢包地址 / 若已經有了其他的錢包，可以選擇 「Restore Wallet」 透過助記詞登入。
</p>
<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-03.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
3. 輸入自訂的錢包名稱及錢包密碼（此名稱與密碼僅適用於該裝置，用於避免有他人盜用裝置付款。）
</p>

<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-04.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
4. 最後會顯示由 24 個單字組成的助記詞，請務必保存好並且不要洩漏出去，若失去助記詞等同於失去錢包。會有資金損失的風險。
</p>


### 目前使用鏈上錢包的好處

- 可以透過鍊上錢包使用 DApp、質押和參與鏈上事務。
- Not your key, not your money，將公鏈幣提領至對應公鏈幣的錢包，可以避免交易所倒掉時資產消失的窘境。(與區塊鍊共存亡)

### 其他的錢包

另外也有以下幾種錢包可以選擇：
- Typhon Wallet - https://typhonwallet.io/
- Gero Wallet - https://gerowallet.io/
- Nami Wallet - https://namiwallet.io/
- Flint Wallet - https://flint-wallet.com/

不需要擔心更換錢包會很麻煩。在 Cardano 中錢包就只是方便的操作介面而已，實際的金額都會儲存在區塊鏈的記錄中，只要記得自己建立錢包地址時取得的助記詞，在新的錢包恢復(Restroe) 即可。

## 區塊鏈與質押

在區塊鏈中 **質押 (Stake)** 是用來表示「將自己所持有的代幣進行鎖定，用來投票 / 提供流動性來協助維護區塊鏈網路」的簡稱。 

在 PoS (權益證明) 基礎的區塊鏈中質押尤為重要，透過**持有者們質押代幣進行投票來決定哪一些節點更有驗證交易的優先權**。作為回報，會返還交易手續費或是獎勵池中的額度來鼓勵人們進行質押。

透過 Eternl 錢包質押賺取額外的代幣非常簡單，操作如下：


<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-05.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
切換到 Staking 介面，挑選喜歡的質押池。 按下 Delegate 即可（推薦挑選 Fees 為 0% 、 ROS > 4% 並且 Situ的池子進行質押）
</p>


在 Cardano 生態中，質押與其他區塊鏈有些許不同。
- 質押不需要鎖定，改為每個 epoch 建立一次帳戶餘額快照（記錄帳戶內有多少 ADA）。
- 建立的快照將會作為**下下次**的質押依據。
- 在 Cardano 一個 epoch 為五天，每個區塊鏈可能設定不相同。
- 因此初次質押後需要最多21天才能得到第一筆獎勵。

## 使用去中心化應用程式 (DApp)

在區塊鏈的領域中人們嘗試著透過區塊鏈去中心化的特性及智能合約功能，建構出了不需要使用私人資料庫便能做資料交換的 DApp(去中心化應用程式)。 只需連接上錢包就能在各 DApp 之間自由切換，而不需要繁瑣的轉帳步驟。

> 目前各大公鏈的 DApp 生態都還在發展中，以小圖片 NFT 及各式各樣的 De-Fi（去中心化金融）為主。 


### 連接錢包到 DApp

<img src="https://media.saweicore.com/blog/blockchain-dapp-start/eternl-06.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
先在錢包頁面中點擊插頭圖案，允許 DApp 連接。
</p>
<img src="https://media.saweicore.com/blog/blockchain-dapp-start/cnft-01.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
點擊右上角的 Link Wallet 選擇自己當前檢測到的錢包插件，點擊後會跳出視窗，讓錢包插件進行確認。
</p>
<img src="https://media.saweicore.com/blog/blockchain-dapp-start/cnft-02.jpg" style="max-height:720px" loading="lazy" class="lightbox">
<p class="text-center">
經過錢包插件確認後，即可看到連接完成。
</p>

連接 DApp 的操作步驟都大同小異，部份 DApp 甚至不需要進行錢包連接。下面會介紹些目前較為有用的 DApp 。

### 去中心化交易所 (DEX)

目前為止使用的國內交易所 Ace 、國際交易所 Binance 都屬於「中心化交易所 (CEX)」， 在區塊鏈中有著與之相對的透過區塊鏈的去中心化基礎與智能合約創造的「去中心化交易所（DEX）」。

作為區塊鍊上代幣交易的集中地。目前 DEX 的方便性與交易量還無法媲美 CEX ，但相信未來非常具有成長潛力。

- [MinSwap](https://minswap.org/) 是 Cardano 社群中較為活躍的 DEX 之一，採用 Auto Market Maker 模型（AMM)，讓流動性提供者可透過鎻倉代幣提供流動性賺取額外收入，交易者依據需要從流動池中兌換代幣，可在此將 ADA 更換為其他 Cardano 生態上的代幣。

- [MuesliSwap](https://muesliswap.com/markets) 是另外一個在 Cardano 社群中活躍的 DEX 之一，採用傳統的訂單簿模型 (OrderBook)撮合需求者與供給者雙方進行交易。

### 消費性質產品與 NFT

在 Cardano 中目前具有消費性質的產品還不夠多，大多是音樂、繪畫、動畫等相關作品。

- [Jpg.store](https://www.jpg.store/) 是 Cardano 社群中 NFT 小圖片的交易集散地。在這邊可以進行大多數的 NFT 販售與購買，與拍賣網站類似。

- [ADAHandle](https://adahandle.com/) 在區塊鍊中的錢包地址總是很長，AdaHandle 可以透過 NFT 應用進行地址 Mapping 。縮短到像是: $handle.it 


## 區塊鏈到底是什麼？為什麼要去中心化？

假設以下情況：
- 我承諾三天後要轉帳 10 萬美金給旅人作為貨款，並取走了貨物。
- 過了四天，旅人發現那 10 萬美金一直都沒有到帳，跑來反應。
- 但是我卻表明已經付款過了，因此之後將不會在作給付。

這時便產生了問題：
1. **要找誰來證明我是否真的有支付這筆款項？**
2. **如果我其實沒支付，但是找來的第三方說我已經支付了怎麼辦？**
3. **如果旅人找來的第三方調查的人證明我沒支付，但因為是旅人找來的，所以我表示你們聯合造假怎麼辦？**

要解決上述的問題，需要存在一個**雙方都能信任的公正第三方驗證者及記錄者**。

區塊鏈是一套為此創造的解決方案，有以下特性：
- **去中心化驗證** - 若一個人驗證可能產生造假嫌疑，那就隨機多找幾個人驗證，透過多個節點的共識機制驗證交易，確保正確性。
- **去中心化存儲** - 帳本存放於單一地點時有被竄改的可能性，因此驗證後的資料將隨機分散至多個節點進行存放，降低被竄改的可能性。
- **密碼學湊雜** - 存放於區塊鍊上的交易資料根據內容計算出不重複的唯一 ID ，確保資料並無被竄改。

透過以上三個特性，創造出記錄不易被竄改並且具備公正性的第三方驗證者。

## 加密貨幣又是什麼？

加密貨幣(Cryptocurrency)又稱數位貨幣、虛擬貨幣。 是在區塊鍊上發行的數位代幣，依據用途不同而有不同的分類。

依據用途與性質可分為：
- **穩定幣** - 價格波動較為穩定的幣種， 價值通常與法幣掛勾。目前在跨境交易上，常被用作法幣的替代品如：USDC、USDT，被用作替代美元。
- **公鏈幣** - 區塊鏈自己發行的幣種，作為協助維護自身區塊鏈的獎勵代幣。如： ETH、ADA、SOL。 
- **平台幣** - 由特定組織、團隊替自己的產品/平台發行。如：FTT、MIN、RAY...等，作為平台的獎勵 token。
- **Meme幣** - 基於戲謔或是各種理由發行的代幣，這類代幣通常會極大量發行讓價值變的極低，如： SHIB、DOGE、HOUSKY .. 等。

以上分類不需要硬性區分，某些幣種可能會有複數性質。其中有些公鍊幣與平台幣又與股票類似，持有就相當於支持該區塊鍊/平台並參與網路運作。

## TL;DR
- 不論選擇哪條區塊鏈，要踏入區塊鏈生態的第一步都是先建立該鏈的錢包地址。
- 錢包地址可以透過公鍊提供的錢包軟體建立。
- 錢包的助記詞必須保存好且避免洩漏，預防有資金損失的風險。
- 在 PoS 基礎的區塊鍊中，透過在區塊鏈上質押代幣，可以協助區塊鍊網路運作並賺取質押獎勵。
- 去中心化應用程式 (DApp) 是建立在區塊鍊之上不需私人資料庫的應用程式。
- 目前 DApp 的生態還在發展中，能做的事情還不多。
- 透過使用鏈上錢包連接 (Connect) 使用「去中心化應用程式(DApp)  」。
- 區塊鏈被設計用來成為交易時的公正第三方及記錄者。
- 加密貨幣是在區塊鏈之上發行的數位代幣，有各式各樣的用途。