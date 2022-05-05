import nav from './config/nav.js';
import textlang from './config/textlang.js';

const config = {
  title: "Saweicore Stu",
  description: "幣圈新知 | 程式開發 | 網站架設 | 各項知識集散地",
  author: {
    name: "Saweima",
    description: "邊緣工作者",
    avatar: "https://avatars.githubusercontent.com/u/62002212"
  },
  pagination: {
    maxPerPage: 8,
  },
	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
		{ id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' }
	],
	marked: {
		options: {},
		extensions: {}
	},
  nav: nav,
  textlang: textlang
};

export default config;
