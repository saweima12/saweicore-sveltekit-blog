<script lang="ts">
    import { siteConfig, themeMode } from '$lib/store';
    import Utterances from '$lib/vendor/utterances.svelte';

	const comment: Record<string, any> = $siteConfig.utterances;
	// handle comment-theme
	$: theme = $themeMode == "light" ? comment.light : comment.dark;

</script>

<Utterances reponame="{$siteConfig.utterances.repo}" issueTerm="og:title" {theme} />
