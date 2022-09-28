---
title: 在 Svelte 使用 PrismJS 的簡單方案
tags:
  - svelte
  - prismjs
  - web
  - nodejs
  - programing
excerpt: 在 Svelte 上想使用程式碼高亮卻遇到了問題？試試看使用 PrismJS 搭配 AutoLoader 來解決擴展問題。
---

午安旅人，近期因為忙於工作整個把部落格給忘了，直到最近才有時間回來繼續施工。這次要解決的是 Code 筆記部落格一定需要的 Syntax Highlight 功能。

網路上較常見的方案是 PrismJS 及 HighlightJS 兩種，在經過反覆實驗幾次後，最後選擇採用 PrismJS 進行處理。

## PrismJs 是什麼

PrismJS 是一款熱門的 Syntax Highlighting (語法高亮) 工具，支援上百種語法及數十種自定義樣式，經常被用於各種技術部落格及程式碼分享網站。相較於 HighlightJS 有易於擴展、具備繼承性、檔案稍小等優點。

## 使用上遇到的問題

在傳統開發 MPA (Multiple Page Application) 網站時，只需要普通的使用 `<script>` 標籤透過 cdn 導入 `prism-core.js` 及 `prism-autoloader.js` 即可，沒什麼狀況。

但是在 Svelte 或是 Vue3 之類的 SPA 框架中卻遇到了些問題：

### 導入語言擴充的困難

由於 Prism 預設只支援 HTML、CSS、Javascript 其他的語言必須導入擴充語言組件才能夠支援，因此最先遇到的問題便是**該怎麼靈活的導入需要語言擴充組件**。

```html
<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/components/prism-python.min.js';
	import 'prism-themes/themes/prism-dracula.css';
</script>
```

最直接的方式，透過 import 將 Prism 及擴充組件導入，但這樣導致了兩個問題：

- **Bundle 體積增加**：透過 Import 導入 ，代碼將會在 build 時一併被打包導致總體大小增加。
- **缺少靈活性**：預設僅支援 JS 、CSS、 HTML，其他的語言需要預先導入擴充腳本才可以使用。 這在單一語言的網站下沒有什麼問題，但對於經常出現各種語言的技術部落格來說並不適合。

為了解決這些， PrismJS 官方也有提供 AutoLoader 插件，它會自動分析節點並載入對應的擴充組件，大大的增加了靈活性。但..使用上也遇到了一些問題...

### 無法使用 AutoLoader

嘗試使用 Import 導入或是透過 CDN 連接導入，效果都不盡理想。

**透過 NodeJS 導入 AutoLoader 的場合**

```html
<script lang="ts">
	/** @ts-ignore */
	import 'prismjs/components/prism-core.min.js';
	import 'prismjs/plugins/autoloader/prism-autoloader.min.js';
</script>
```

直接透過 Import 導入 AutoLoader，會因為路徑的解析問題直接收到錯誤訊息像是：

```txt
Not found: /posts/2022/08/components/prism-python.min.js
```

並且由於是直接 Import ，會錯過修改`languages_path` 的時機，因此錯誤無法避免。

**透過 CDN 連接的場合**

```html
<svelte:head>
	<script
		defer
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/prism-core.min.js"
	></script>
	<script
		defer
		src="https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/plugins/autoloader/prism-autoloader.min.js"
		傳統onload="Prism.plugins.autoloader.languages_path='https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/'"
	></script>
</svelte:head>
```

當 `prism-autoloader` 載入時會檢查 Element 自動導入對應的語言擴充腳本，但由於 SPA 網站的 CSR (Client Side Render) 與一般網頁的生命週期不同，會導致：

- 在進入頁面時無法確保 AutoLoader 一定會在 Prism 之後載入導致可能會註冊失敗
- 在已註冊成功的情況離開頁面（同一網站）時不會完全清空導入的腳本（但會重複執行），會發生重複註冊 hook 的情形。

## 狀況及問題分析

**到目前為止的狀況總結：**

- 在編寫部落格文章時大多的代碼範例來自於外部的 CMS 如 ( Ghost CMS、 Strapi )或是 Markdown，因此無法使用 Svelte 組件處理。
- 直接使用 `Import` 導入語言擴充可以正常使用，但隨著導入的語言擴充變多，會**增加 Bundle Size 大小**、並且每次遇到新的語言都得手動新增，**缺乏靈活性**。
- 由於 SPA 的 CSR 頁面載入與一般網頁載入時不同，透過 `<script>` 從 CDN 載入 AutoLoader 時有可能先於 Prism-Core 載入，導致 AutoLoader 載入失敗及重複載入的情況。

**理想的解決方案需要滿足以下需求：**

1. 由於大多數的文章內容來自不特定的外部資源（CMS 或是 Markdown），需要盡可能的泛用。(針對最後的 HTML 進行處理)
2. 依據文章內容中的代碼區塊，透過 CDN 載入對應的語言擴充組件。
3. 盡可能的避免在不需要的場合載入不需要的部份（會影響 Google 評分）。

## 解決方案

> **svelte-prism-autoloader**<br/>
> NPM: [點我進入](https://www.npmjs.com/package/svelte-prism-autoloader)<br/>
> Github: [點我進入](https://github.com/saweima12/svelte-prism-autoloader/blob/master/src/lib/autoloader.svelte)

將 AutoLoader 移植為 Svelte Component，可在導入組件時就設置 `languages_path` 用以指定從哪個 CDN 載入擴充腳本，並且透過 reactivity expression，確保 AutoLoader 正確被載入。

### 使用方式

1. 透過 npm 安裝 package 及 prismjs

```bash
npm i svelte-prism-autoloader prismjs

# optional: install themes
npm i prism-themes
```

2. 導入 AutoLoader 組件及 Prismjs，並在 onMount 使用 `Prism.highlightAll()`。

```html
<script lang="ts">
	import Prism from 'prismjs';
	import 'prismjs/themes/prism-coy.min.css';
	import { AutoLoader } from 'svelte-prism-autoloader';

	import { onMount } from 'svelte';

	onMount(() => {
		Prism.highlightAll();
	});
</script>

{@html code}

<AutoLoader />
```

**當頁面被載入時**：

- AutoLoader 組件會自動檢測 PrismJS 是否已經載入，當載入時會將自己註冊進入 `Prism.plugins` 及監聽 [Complete hook](https://gordonlesti.com/prism-hooks-list/)。

- 當 `Prism.highlightAll()` 被呼叫時，監聽的 [Complete hook](https://gordonlesti.com/prism-hooks-list/) 被觸發，自動從 languages_path 載入語言擴充組件並依此修改 DOM。

## 詳細說明

PrismJS 官方已經提供了 AutoLoader Plugin 用以解決自動載入使用語言的部份，只是所有的功能都被包裝在 `function(){}` 區塊中無法導出，導致外部缺乏介入空間。

> 參考代碼： [官方 Github - Prism-Autoloader](https://github.com/PrismJS/prism/blob/master/plugins/autoloader/prism-autoloader.js)

因此要解決問題只需要滿足以下兩個條件即可：

- 確保 AutoLoader 載入順利（不會發生使用 CDN 讀取時因為順序不同而載入失敗）
- 與 Svelte 的 lifeCycle 掛勾，確保頁面載入時觸發 `Prism.highlightAll()`

**主要實作部份**

- 透過 Reactivity Expression (`$:{}` 包住的段落) 檢測是否為瀏覽器環境 (包含 window 及 document 變數) 並嘗試將自己註冊進 Prism.plguins。

```html
<script lang="ts">
	let Prism: any = undefined;

	$: {
		if (typeof window !== 'undefined' && typeof document !== 'undefined') {
			// @ts-ignore
			Prism = window.Prism;
			if (Prism) registerPlugin();
		}
	}
</script>
```

- 將 Plugin 註冊進 PrismJS 並添加 Complete Hook，當檢測到 PrismJS 載入時會呼叫一次，進行註冊。

```ts
const registerPlugin = () => {
	// add to prism.plugins
	if (!Prism) return;

	Prism.plugins.autoloader = {
		languages_path: languagesPath,
		loadLanguages: loadLanguages,
		use_minified: useMinified
	};

	Prism.hooks.add('complete', (env: any) => {
		let element = env.element;
		let language = env.language;

		if (!element || !language) {
			return;
		}

		var deps = getDependencies(element);
		if (/^diff-./i.test(language)) {
			// the "diff-xxxx" format is used by the Diff Highlight plugin
			deps.push('diff');
			deps.push(language.substring('diff-'.length));
		} else {
			deps.push(language);
		}

		if (!deps.every(isLoaded)) {
			// the language or some dependencies aren't loaded
			loadLanguages(deps, function () {
				Prism.highlightElement(element);
			});
		}
	});
};
```

- 最後添加 AutoLoader 可配置參數，並預設透過 Cloudflare CDN 取得擴充腳本。

```ts
// export parameter.
export let languagesPath: string =
	'https://cdnjs.cloudflare.com/ajax/libs/prism/1.29.0/components/';
export let useMinified: boolean = true;
export let autoHighlightAll: boolean = false;
```

較為主要的變更就只有這些，剩餘載入組件的部份通通可以直接從 [prism-autoloader.js](https://github.com/PrismJS/prism/blob/master/plugins/autoloader/prism-autoloader.js) 移植過來。

## TL;DR

- PrismJS 是一款熱門的程式碼高亮插件，支援上百種語言及數十種自定義風格。
- PrismJS 官方有提供 AutoLoader 插件，用於動態載入需要的擴充組件。但因為所有內容都被封裝在執行函數中而不好介入。
- 透過將 AutoLoader 改寫為 Svelte Component 並使用 Reactivity Expression 確保於 Prism 載入之後才進行加載，可以確保 AutoLoader 被正確執行。
