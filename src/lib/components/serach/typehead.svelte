<script lang="ts">
	import { goto } from '$app/navigation';
	import { findMatchFull } from '$lib/client/search';
	import type { MatchItem, SerarchItem } from '$lib/types';

	export let list: Array<SerarchItem>;
	// parameter
	let selectIndex: number = -1;
	let contianer: HTMLElement;

	$: {
		if (list.length > 0) selectIndex = 0;
	}

	$: matchList = list.map((item) => {
		return {
			title: item.title,
			excerpt: item.excerpt,
			...findMatchFull(item)
		};
	});

	const keyMap: Record<string, Function> = {
		Enter: (e: KeyboardEvent) => {
			e.preventDefault();
			select();
		},
		ArrowDown: (e: KeyboardEvent) => {
			e.preventDefault();
			movePointer(1);
		},
		ArrowUp: (e: KeyboardEvent) => {
			e.preventDefault();
			movePointer(-1);
		},
		Escape: (e: KeyboardEvent) => {
			e.preventDefault();
		}
	};

	const movePointer = (pointer: number) => {
		selectIndex += pointer;

		if (selectIndex < 0) selectIndex = list.length - 1;

		if (selectIndex > list.length - 1) selectIndex = 0;

		moveScroll();
	};

	const moveScroll = () => {
		// get element
		let element = document.getElementById(`hit-item-${selectIndex}`) as HTMLElement;
		let bottomOffset = contianer.clientHeight + contianer.scrollTop;

		let offset = Math.ceil(element.offsetTop - element.clientHeight);
		offset = offset > 0 ? offset : 0;

		if (offset <= contianer.scrollTop) {
			contianer.scrollTo({ top: offset });
		}

		if (element.offsetTop >= contianer.scrollTop + contianer.clientHeight) {
			contianer.scrollTo({ top: offset });
		}
		// console.log(contianer)
		// if (contianerHeight - )
	};

	const select = () => {
		let selectItem: MatchItem = matchList[selectIndex];
		let link = selectItem.link as string;
		// process permalink
		if (link) {
			// go to target
			goto(link);
		}
	};

	const onKeydown = (e: KeyboardEvent) => {
		if (list.length === 0) return;

		if (keyMap.hasOwnProperty(e.key)) {
			keyMap[e.key](e);
		}
	};
</script>

<svelte:window on:keydown={onKeydown} />
{#if list.length > 0}
	<ul id="hit-list" class="hit-list" bind:this={contianer}>
		{#each matchList as match, i}
			<li
				id={`hit-item-${i}`}
				role="option"
				class="hit-list-item"
				href={match.link}
				class:selected={selectIndex == i}
				aria-selected={selectIndex == i}
				on:click={() => {
					selectIndex = i;
					select();
				}}
			>
				<div class="title">
					{match.title}
				</div>
				<div class="match">
					#
					{#if match.field == 'tags'}
						{#each match.value as tag}
							{@const matchWords = match.attach.matchedWords}
							<div
								class="match-tag"
								class:tag-matched={Array.from(matchWords).some((item) => tag.includes(item))}
							>
								{tag}
							</div>
						{/each}
					{:else}
						{@html match.value}
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{/if}

<style>
	.hit-list {
		background: #fff;
		max-height: 100vh;
		overflow-y: scroll;
	}

	.hit-list-item {
		width: 100%;
		background-color: #fafafa;
		padding: 1rem;
	}

	.hit-list-item:hover {
		background-color: #bbb;
	}

	.hit-list-item:hover .tag-matched {
		background-color: #ccc;
	}

	.title {
		font-weight: 700;
		margin-bottom: 0.5rem;
	}

	.match-tag {
		display: inline-block;
		margin: 0 0.3rem;
		padding: 0.1rem 0.4rem;
	}

	.tag-matched {
		background-color: #bbb;
	}

	.selected,
	.selected:hover {
		background-color: #676778;
		color: #fff;
	}
</style>
