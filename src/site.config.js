import nav from './config/nav.js';
import textlang from './config/textlang.js';

const config = {
	title: 'Saweicore Stu',
	description: ' 程式開發 | 網站架設 | 幣圈科普 | 各項知識集散地',
	author: {
		name: 'Saweima',
    summary: '邊緣工作者',
		description: '邊緣工作者 | 幣圈新人 | 記錄自己所見所聞 ',
		avatar: 'https://avatars.githubusercontent.com/u/62002212'
	},
	pagination: {
		maxPerPage: 8
	},
	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
		{ id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' }
	],
	marked: {
		options: {},
		extensions: {}
	},
  search: {
    appKey: Buffer.from("BHODY4NQKK").toString('base64'),
    apiKey: Buffer.from("5f4c05344cf6d1cbe581c20e049a7c14").toString('base64'),
    index: "SaweicoreStu"
  },
	nav: nav,
	textlang: textlang
};

export default config;
