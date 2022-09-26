<script lang="ts">
	import siteConfig  from '$lib/site';
    import { themeMode } from '$lib/store';
    import Giscus from '@giscus/svelte'

	const comment: Record<string, any> = siteConfig.giscus;
	// handle comment-theme
	$: theme = $themeMode == "light" ? comment.light : comment.dark;
</script>

<Giscus 
	id="giscus-comment"
	repo="saweima12/blog-comment" 
	repoId="R_kgDOH3CNpA"
	category="General"
	categoryId="DIC_kwDOH3CNpM4CRoh4"
	mapping="pathname"
	strict="0"
	reactionsEnabled="1"
	emitMetadata="0"
	inputPosition="top"
	theme={theme}
	loading="lazy"
	lang="zh-TW"
/>