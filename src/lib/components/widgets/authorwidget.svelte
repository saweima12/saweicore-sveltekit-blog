<script lang="ts">
	import siteConfig from '$lib/site';
	const author: Record<string, any> = siteConfig.author;
</script>

<div class="author-widget">
	<div class="w-32 h-32">
		<img
			class="avatar"
			src={author.avatar}
			alt={author.name}
			loading="lazy"
			width="128"
			height="128"
		/>
	</div>
	<div class="mt-3 name">
		<h2>{author.name}</h2>
	</div>
	{#if author.description}
		<div class="mr-3 letter-content-font description">
			<p>{author.description}</p>
		</div>
	{/if}
</div>

<style>
	.avatar {
		border: 1px solid #000;
		border-radius: 5rem;
	}

	.name {
		color: var(--text);
		font-weight: 600;
		font-size: 18px;
	}

	.description {
		font-size: 16px;
		color: #757575;
	}
</style>
