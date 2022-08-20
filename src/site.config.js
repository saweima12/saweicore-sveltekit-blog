import nav from './config/nav.js';
import { headingClassName, customALink } from './marked/index.js';

const config = {
	title: 'Saweicore Lab',
	summary: '程式開發 | 網站架設 | 幣圈雜談 | 各項雜燴集散地',
	description: 'SaweiCore Lab 是用於記錄與歸檔個人的研究心得的集散地，內容多以網站架設、程式開發、幣圈探索為主並以需求導向探討問題並記錄對應的解決方案，以便後續查閱。',
	url: "https://saweicore.com",
	ga: "G-KY269QECHX",
  author: {
    name: 'Saweima',
    email: 'saweima12@gmail.com',
    summary: '邊緣工作者',
    description: '雜項工程師 | 幣圈小白 | 想到再寫',
    avatar: 'https://avatars.githubusercontent.com/u/62002212?s=128&v=4'
  },
  pagination: {
    maxPerPage: 8
  },
  classifier: [
    { id: 'post', params: { path: '/_posts/' }, type: 'directory' },
    { id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' },
  ],
  marked: {
    options: {},
    extensions: [headingClassName("heading-item"), customALink()]
  },
	search: {
		appKey: "BHODY4NQKK",
		apiKey: "5f4c05344cf6d1cbe581c20e049a7c14",
		index: "SaweicoreLab"
	},
	nav: nav
};

export default config;
