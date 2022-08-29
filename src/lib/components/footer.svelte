<script lang="ts">
	import siteConfig  from '$lib/site';

</script>
<footer class="w-full pt-20 pb-5 site-footer">
	<div class="flex justify-center items-center px-10 h-full footer-container">
		<div class="copyright">Copyright © 2020 - {new Date().getFullYear()} {siteConfig.title} All Rights Reserved.</div>
	</div>
</footer>

<style>
	.site-footer {
		color: var(--text);
	}
</style>