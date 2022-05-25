---
title: 為 SvelteKit Blog 而生的工具 — MarkedPage
tags:
- svelte
- marked
- programing
---

## Features

- 讀取 Markdown 作為資料源。
- 使用 Marked 作為解析器，支援相關功能擴展。
- 內置簡易分類器，可依據 `路徑` 或是 `FrontMatter` 欄位進行分類。
- 自定義分類器，可依照自己的需求自定義分類。
- 支援 Yaml FrontMatter  。
- 支援 Heading 抽出。
- 支援 ```<!--more->``` 標記，自動抽取 excerpt 至 metadata。

## 事前準備

### 安裝

```bash
pnpm install markedpage
```

### 目錄結構

此部份基於約定優於配置原則創建基本資料夾結構及檔案：
```sh
/
├─ docs
│   └─ _posts
│         ├─ 2021-09-16-directorypost1.md
│         └─ 2021-09-17-note.md
└─ src 
    └─ site.config.js
```

- 建立 /docs 資料夾，所有 .md 檔案必須放在該資料夾下。
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

欄位說明：
- `classifier` 欄位型別為 Array 用於配置分類器，每個分類器由三個欄位組成。詳細內容接下來再說明。
```sh
 id     =>  分類器 id 
 params	=>  傳入分類器的參數
 type	=>  選用的分類器，後面會介紹到。
```
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


## Usage 



```


```



##  Classifier 分類器




## 應用範例

> MarkedPage Repo<br/> 
> 網址: [點我進入](https://github.com/saweima12/markedpage-example)
