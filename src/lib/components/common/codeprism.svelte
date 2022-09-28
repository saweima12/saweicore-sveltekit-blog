<script lang="ts">
	/** @ts-ignore */
	import 'prismjs/components/prism-core.min.js';
	import 'prismjs/plugins/toolbar/prism-toolbar.min.js';
	import 'prismjs/plugins/toolbar/prism-toolbar.min.css';

	import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard.min.js';

	import 'prism-themes/themes/prism-dracula.css';
	import { AutoLoader } from 'svelte-prism-autoloader';
</script>

<AutoLoader autoHighlightAll />
