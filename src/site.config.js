const config = {
  title: "Saweicore Stu",
  description: "幣圈新知 | 程式開發 | 網站架設 | 各項知識集散地",

  text: {
    more: "更多內容",
  },

  pagination: {
    maxPerPage: 10
  },

	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
		{ id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' }
	],
	marked: {
		options: {},
		extensions: {}
	}
};

export default config;
