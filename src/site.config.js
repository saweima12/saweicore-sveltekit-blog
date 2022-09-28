import { headingClassName, customALink } from './marked/index.js';

const config = {
	classifier: [
		{ id: 'post', params: { path: '/_posts/' }, type: 'directory' },
		{ id: 'tag', params: { keys: ['tag', 'tags'] }, type: 'frontmatter' }
	],
	marked: {
		options: {},
		extensions: [headingClassName('heading-item'), customALink()]
	}
};

export default config;
