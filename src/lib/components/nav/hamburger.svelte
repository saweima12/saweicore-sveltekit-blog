<script lang="ts">
	import { viewStack, viewId } from '$lib/store';

	const uniqueId = viewId.navMenu;
	$: toggle = $viewStack.includes(uniqueId);

	const toggleHandle = () => {
		if (!toggle) viewStack.push(uniqueId);
		else viewStack.remove(uniqueId);
	};
</script>

<div class="menu-button-wrapper" class:toggle on:click={toggleHandle}>
	<div class="menu-button-container">
		<div class="menu-button" />
	</div>
</div>
