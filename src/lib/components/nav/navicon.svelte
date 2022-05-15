<script lang="ts">
	import HomeIcon from '$lib/icons/home.svelte';
	import ArchiveIcon from '$lib/icons/archive.svelte';
	import BookIcon from '$lib/icons/book.svelte';
	import GithubIcon from '$lib/icons/github.svelte';
	import ThemModeIcon from '$lib/icons/thememode.svelte';

	const iconMap: Record<string, any> = {
		home: HomeIcon,
		journal: ArchiveIcon,
		about: BookIcon,
		github: GithubIcon,
		theme: ThemModeIcon
	};
	export let key: string;
</script>

<svelte:component this={iconMap[key]} />
