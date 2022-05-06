<script lang="ts">
	export let maxPage: number;
	export let currentPage: number;
</script>

<a href="/">1</a>

<a href={`/page/${maxPage}`}>a</a>

{currentPage}
