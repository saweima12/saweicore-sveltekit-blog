<script lang="ts">
	import { viewStack, viewId } from '$lib/store';
	import SearchIcon from '$lib/icons/search.svelte';

	const clickHandle = () => {
		viewStack.push(viewId.searchView);
	};
</script>

<div class="w-full cursor-pointer search-widget" on:click={clickHandle}>
	<div class="flex flex-row h-full justify-center items-center label">
		<div class="flex self-center mr-2 w-4 label-icon"><SearchIcon /></div>
		<div class="label-text mr-2">Search</div>
		<div class="flex label-container items-center label-keys">
			<div class="label-key">Ctrl</div>
			<div class="label-key">/</div>
		</div>
	</div>
</div>

<style>
	.search-widget {
		border: 1px solid var(--border);
		border-radius: 1.6rem;
		height: 2.5rem;
	}

	.search-widget .label {
		font-size: 12px;
		color: var(--text);
	}

	.label-key {
		background: var(--tagitem-bg);
		border-radius: 0.2rem;

		padding: 0.1rem 0.5rem;
		margin-right: 0.5rem;
	}
</style>
