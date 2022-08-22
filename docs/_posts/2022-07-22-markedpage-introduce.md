---
title: MarkedPage — SvelteKit 靜態網站的內容管理方案
tags:
- svelte
- markdown
- nodejs
- programing
excerpt: 想試著做個靜態網站卻又對現成的生成器感到不滿意？不妨試試看 SvelteKit 與這個專門為靜態網站而生的 Markdown 內容索引工具吧，相信能夠帶來些不一樣的使用體驗。
---

<!-- more -->
午安旅人，MarkedPage 是搭建這個部落格時一起製作的工具包，用意在解決 SvelteKit 使用 Markdown 及建立索引時缺乏相關工具的問題，希望能帶給你不錯的體驗。

## 這能夠做些什麼？
- 使用 .md 檔案作為資料來源，不需要額外的內容管理系統(CMS)。
- 內建 `FrontMatter`、`<!--more--> 標籤`、`headings 抽取` 功能。
- 內置[簡易分類器](#classifier)，可依據 **資料夾路徑** 或是 **FrontMatter 欄位** 進行分類，省去撰寫繁雜的分類邏輯。
- 支援[自定義分類器](#customclassifier)，依照自己需求客製化分類方式。
- 具備 draft (草稿)輔助功能，當一個文章被標記為 draft 時，在 dev 環境將照常顯示可用做畫面預覽，但在正式編譯時將不會被列入清單。

## 事前準備

Makredpage 雖然可單獨使用，但主要用於配合 SvelteKit 專案。因此以下範例皆以 SvelteKit 的使用情境為主。


### 安裝

```bash
npm install markedpage
# yarn add markedpage
# pnpm install markedpage
```

### 目錄結構

創建基本資料夾結構及檔案：
```txt
/
├─ docs
│   └─ _posts
│         ├─ 2021-09-16-directorypost1.md
│         └─ 2021-09-17-note.md
├─ src
│    ├─ app.html
│    └─ site.config.js
└ package.json
```

在目錄配置方面，遵循約定大於配置原則。
- /docs
  - 所有 .md 檔案必須放置於此路徑下。
  - 分類器會以此路徑為基準進行解析。
  - 檔案名稱支援 yyyy-mm-dd-slug.md 及 slug.md 兩種解析模式

- /src/site.config.js
  - MarkedPage 主要的配置檔案，用於配置 Classifier 及 Marked 擴展。

### 配置 site.config.js

```js
const config = {
	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
	],
	marked: {
		options: {},
		extensions: []
	},
};

export default config;
```
- `classifier` 欄位型別為 Array 用於配置分類器，每個分類器由三個欄位組成。
  - id	=>  分類器 id - 型別為 string
  - params	=> 傳入分類器的參數 - 型別為 Object 
  - type	=>  選用的分類器類型

關於分類器的詳情可參考 [**#Classifier**](#classifier) 節

- `marked` 欄位用於配置 marked  的設定及擴展功能。詳情可參閱 [**#Marked**](#marked) 節。


除以上用途外也可用於配置網站的自定義內容，如： title 、description ...等，可自行運用。範例如下：
```js
const config = {
	title: 'MarkedPage Test Project',
	description: 'Test project description',
	author: {
		name: "saweima"
	},
	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
		{ id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' },
		{ id: 'category', params: { keys: ['category', 'categories'] }, type: 'frontmatter' },
		{ id: 'custom', params: { path: '/_posts/' }, type: CustomClassifierHandle },
	],
	marked: {
		options: {},
		extensions: {}
	},
};

```

### 配置 vite.config.js

```js
import { sveltekit } from '@sveltejs/kit/vite';
import { markedpageVitePlugin } from 'markedpage';

import siteConfig from './src/site.config.js';

/** @type {import('vite').UserConfig} */
const config = {
	plugins: [sveltekit(), markedpageVitePlugin(siteConfig)]
};

export default config;
```

透過導入 **markedpageVitePlugin** 及 **site.config.js** 可支援 markdown 檔案及 site.config.js 的熱更新（檔案更新後不需要重啟，會自動刷新）。


## 如何使用？

MarkedPage 提供 3 個主要 Function 及 1 個 HMR 輔助 Hook。
- siteConfig()
- getPage(slug)
- classifiedSet(id)
- onContentUpdate(callback)


### siteConfig() 

取得 /src/site.config.js 中的內容。
```js
// 取得 config data
const config = await siteConfig();

// 回傳結果
{
  title: 'MarkedPage Test Project',
  classifier: [
    { id: 'post', params: [Object], type: 'directory' },
    { id: 'tag', params: [Object], type: 'frontmatter' },
    { id: 'category', params: [Object], type: 'frontmatter' },
    {
      id: 'custom',
      params: [Object],
      type: [AsyncFunction: CustomClassifierHandle]
    }
  ],
  marked: { options: {}, extensions: [ [Object] ] }
}
```

### getPage(slug)

根據 slug 取得對應的頁面資料。

```js
const page = await getPage("marked-test");

// 回傳結果
{
  frontMatter: {
    title: 'MarkedPage Test Page',
    tags: [ 'test' ],
    category: [ 'default' ],
    excerpt: 'TestPage Excerpt.',
    created: 2022-05-18T00:00:00.000Z
  },
  sourcePath: 'docs/_posts/2022-05-18-marked-test.md',
  indexPath: 'docs/_posts/2022-05-18-marked-test',
  headings: [
    { depth: 2, text: 'H2', raw: '## H2\n\n', id: 'h2' },
    { depth: 3, text: 'H3', raw: '### H3\n\n', id: 'h3' },
  ],
  render: [Function: render],
  raw: [Function: raw],
  slugKey: 'marked-test'
}
```

### classifiedSet(id)

依據 site.config.js 中配置的 分類器 id 取得對應的資料。 

```js
const pageSet = await classifiedSet("post");

// 回傳結果
{
  pages: [
    {
      frontMatter: [Object],
      sourcePath: 'docs/_posts/2022-05-18-marked-test.md',
      indexPath: 'docs/_posts/2022-05-18-marked-test',
      headings: [Array],
      render: [Function: render],
      raw: [Function: raw],
      slugKey: 'marked-test'
    }
  ]
}
```

### onContentUpdate(callback)

```js
  // src/routes/__layout.svelte
  import { invalidate } from '$app/navigation';
  import { page } from '$app/stores';
  import { onContentUpdate } from 'markedpage/helper';

  onContentUpdate((payload: Record<string, any>) => {
      let slug = $page.params.slug;
      // update endpoint data.
      invalidate(`/api/posts.json`);
      invalidate(`/api/posts/${slug}.json`);
  });
```

用於實作 HMR 更新：
 - 透過 `onContentUpdate` 監聽 markdown 檔案是否有變動。
 - 使用 `invalidate` 通知 SvelteKit 刷新 Endpoint 並自動更新 Client 端。

## Classifier

MarkedPage 提供了兩個簡易的分類器及客製化的選項。依據使用的分類器不同會有不同的回傳結果。

### DirectoryClassifier

對應 `type: 'directory'` ，以路由為基礎的分類器，會以 /docs 為根目錄依據 params.path 配置的路徑進行分類。

```js
// 範例配置
{ id: 'post', params: { path: '/_posts/' }, type: 'directory' }

// 回傳結果
{
  pages: [
    {
      frontMatter: [Object],
      sourcePath: 'docs/_posts/2022-05-18-marked-test.md',
      indexPath: 'docs/_posts/2022-05-18-marked-test',
      headings: [Array],
      render: [Function: render],
      raw: [Function: raw],
      slugKey: 'marked-test'
    }
  ]
}
```


### FrontMatterClassifier

對應 `type: 'frontmatter'` ，以 frontmatter 欄位為基礎的分類器，遍歷所有 page 的 frontmatter 並根據註冊的欄位的值進行分類。

```js
// 範例配置
{ id: 'tag', params: { keys: ['tags'] }, type: 'frontmatter' }

// 範例 frontmatter
---
title: MarkedPage Test Page Second
tags:
 - test
 - test2
---

// 回傳結果
{
  test: [
    {
      frontMatter: [Object],
      sourcePath: 'docs/_posts/2022-05-18-marked-test-second.md',
      indexPath: 'docs/_posts/2022-05-18-marked-test-second',
      headings: [Array],
      render: [Function: render],
      raw: [Function: raw],
      slugKey: 'marked-test-second'
    },
  ],
  test2: [
    {
      frontMatter: [Object],
      sourcePath: 'docs/_posts/2022-05-18-marked-test-second.md',
      indexPath: 'docs/_posts/2022-05-18-marked-test-second',
      headings: [Array],
      render: [Function: render],
      raw: [Function: raw],
      slugKey: 'marked-test-second'
    }
  ]
}
```

### CustomClassifier

若前兩者都不符合需求，則可以選擇自定義分類器 Function。

```js 
// 自定義 Classifier
export const CustomClassifierHandle = async ({options, pages}) => {
    let _classifiedPages = [];
    let { id, params } = options;
  
    console.log(`::: Run CustomClassifierHandle -  ${id} :::`);
    pages.map((page) => {
      const { sourcePath } = page;
      if (!sourcePath.includes(params.path)) return;
  
      _classifiedPages.push(page);
    });
  
    return { pages: _classifiedPages };
};

// 範例配置
{ id: 'custom', params: { path: '/_posts/' }, type: CustomClassifierHandle },

// 回傳結果 (範例中與 DirectoryClassifier 一致)
```

接收的兩個參數：
- options -> site.config.js 中配置的 分類器 Object
- pages   -> 位於 /docs 下所有的  page Array

## 額外功能

除了基本的 Markdown 支援外，另有實作以下幾項內部功能。

### FrontMatter 

透過 front-matter 套件，解析在 .md 檔案中頂部的 yaml 區域，並導出至 frontMatter 欄位。

```md
---
title: MarkedPage Test Page
tags:
 - test
category:
 - default
---

由 --- 夾著的內容為 yaml 格式。會被導出為 page.frontMatter
```

### Excerpt

透過 Regex 解析內容，會將**第一個**搜索到的 `<!-- more -->` (有無空白皆可) 以上的內容抽出為 excerpt。

```md
---
title: MarkedPage test.
---

這段句子會被導出為 page.frontMatter.excerpt(不含 HTML 及Markdown tag)。
<!--more-->
這段句子不會發生任何事情。
<!-- more -->
```

### Draft

此為 FrontMatter 的延伸功能，當 FrontMatter 內容包含 `_draft: true` 時，該篇文章在 `NODE_ENV="production"` 狀態（也就是使用 svelte-kit build ) 下不會被列入有效檔案中。

```md
---
title: MarkedPage test.
_draft: true
---

這篇文章在 Production 模式下不會被列入有效文章中，無法檢索。
```

## 擴展功能

最後，考量到自定義的需求，在 site.config.js 中提供了兩個擴展選項：

### Marked

用以自定義解析 markdown 內容時的處理。像是幫自定義 heading 的id、幫標籤加上統一的 class、自定義 Block ...等。

```js
marked: {
  options: {},
  extensions: []
},
```
- options 類型為 Object 其內容會被傳入 marked.setOptions() 作為預設值
  - 配置可參考： [Marked Document - Options](https://marked.js.org/using_advanced#options)
- extension  類型為 Array 其內容會依序被傳入 marked.use()
  - 用以兼容 Marked 的 extension 套件，如： [marked-custom-heading-id](https://www.npmjs.com/package/marked-custom-heading-id)
  - 也可自定義擴展，編寫方式可參考： [Marked Document - Use](https://marked.js.org/using_pro#use)

### extendPageData(page)

當 Markdown page 做完基本處理（抽出 heading、導出 excerpt 及 frontmatter）後執行，用以自定義擴展欄位。

```js
import { marked } from "marked";
export const extendPageData = async (page) => {
    const raw = await page.raw();
    page.test = marked.parse(raw);
}
```

## 應用範例

最後，附上應用範例。範例中包含 Endpoint 端及 Page 端的實作。

> **MarkedPage Example Repo**<br/> 
> 網址: [點我進入](https://github.com/saweima12/markedpage-example)


## TL;DR

- MarkedPage 是為了輔助 SvelteKit Static Site 而製作的工具。
- 目的在簡化 Markdown 資料的讀取及建立索引的繁雜過程。
- site.config.js 除了配置以外還能用來填入網站的基本參數作後續使用。
- classifer 可選擇基於`資料夾路徑`與`frontmatter`兩種簡易分類器。
- 由於使用 marked 作為轉譯器，可使用 extension 功能修改 parse 結果 (可參考 [Document](https://marked.js.org/using_pro))
  
