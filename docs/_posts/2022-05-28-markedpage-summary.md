---
title: 為 SvelteKit Blog 而生的工具 — MarkedPage
tags:
- svelte
- marked
- programing
excerpt: >
---

<!-- more -->
## Features

- 讀取 Markdown 作為資料源。
- 使用 Marked 作為解析器。
- 簡易分類器，可依據 `路徑` 或是 `FrontMatter` 欄位進行分類。
- 自定義分類器，可依照自己的需求客製化分類方式。
- 支援 Yaml FrontMatter  。
- 支援 Heading 抽出。
- 支援 `<!-- more -->`  標記，自動抽取 excerpt 至 metadata。

## 事前準備

### 安裝

```bash
pnpm install markedpage
```

### 目錄結構

創建基本資料夾結構及檔案：
```js
/
├─ docs
│   └─ _posts
│         ├─ 2021-09-16-directorypost1.md
│         └─ 2021-09-17-note.md
└─ src 
    └─ site.config.js
```

- 建立 /docs 資料夾，所有 .md 檔案必須放在該資料夾下。
	- markdown 檔案的名稱支援 yyyy-mm-dd-slug 及 slug 兩種格式，若使用前者則會在讀取時自動將日期作為 created 欄位注入 frontmatter，否則預設為檔案的建立日期。
- 於 /src 中建立 site.config.js，內容如下：

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

```sh
- id	=>  分類器 id - 型別為 string
- params	=> 傳入分類器的參數 - 型別為 Object 
- type	=>  選用的分類器 
```
關於分類器的詳情可參考 [**Classifier**](#classifier) 節

- `marked` 欄位用於配置 marked  的設置以及使用擴展功能。
	- options 為 Object 其內容會被傳入 marked.setOptions()
	- extension  為 Array 其內容會依序被傳入 marked.use()

`site.config.js` 除以上用途外也可用於配置網站的自定義內容，如： title 、description ...等，可自行運用。範例如下：
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

## 使用 

MarkedPage 提供 3 個主要 Method：

### siteConfig() 
用於取得 site.config.js 中的內容。
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

用於取得頁面內容。
```js
// 取得 page data.
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
用於取得配置的對應 id 分類器所傳回的結果。
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


## Classifier

MarkedPage 提供了兩個簡易的分類器及客製化的選項。依據使用的分類器不同會有不同的回傳結果。

### DirectoryClassifier

對應 type 為 'directory' ，以路由為基礎的分類器，會以 /docs 為根目錄依據 params.path 配置的路徑進行分類。

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

對應 type 為 'frontmatter' ，以 frontmatter 欄位為基礎的分類器，遍歷所有 page 的 frontmatter 並根據註冊的欄位的值進行分類。

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

若前兩者都不符合需求，則可以選擇自定義分類器。接收的兩個參數：
```sh
- options => site.config.js 中配置的 分類器 Object
- pages => 位於 /docs 下所有的  page Array
```
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

## 應用範例

範例中包含 Endpoint 端及 Page 端的實作。

> **MarkedPage Example Repo**<br/> 
> 網址: [點我進入](https://github.com/saweima12/markedpage-example)


## TL;DR

- MarkedPage 是為了輔助 SvelteKit Static Blog 而製作的工具。
- 目的在簡化 Markdown 資料的讀取及建立索引的繁雜過程。
- site.config.js 可以用來填入網站的基本資料方便後續使用。
- classifer 可選擇基於`路徑`與`frontmatter`兩種簡易分類器或是客製化分類器。
- 使用 Marked 作為轉譯器，可使用 extension 功能修改 parse 結果 (可參考 [Document](https://marked.js.org/using_pro))
