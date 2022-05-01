const config = {
  title: "Saweicore Stu.",
  description: "",
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
