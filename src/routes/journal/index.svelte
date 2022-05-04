<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import type { JournalResult, GroupListPair } from '$lib/types';
    import { dataAPI } from '$lib/client';

    export const load: Load = async ({fetch}) => {
        const api = dataAPI.getJournalData();
        const response = await fetch(api);
        const { groups } : JournalResult = await response.json();

        return {
            props: {
                groups
            }
        }
    };
</script>

<script lang="ts">
import type { SourcePage } from 'markedpage';
import { siteConfig } from '$lib/store';
import { getMMDD, pageRoute, getTitleStr } from '$lib/client';

const textlang: Record<string, any> = $siteConfig.textlang.journal;

export let groups: Array<GroupListPair<SourcePage>>;
</script>

<svelte:head>
    <title>{textlang.title} | {getTitleStr($siteConfig)}</title>
</svelte:head>

<div class="mt-8 wrapper journal-page">
    <div class="journel-container pt-2">
        <ol class="flex flex-col journel-list">
            {#each groups as group}
                <li class="mb-8 group">
                    <h1 class="text-2xl letter-title-font group-name">{group.name}</h1>
                    <ul class="flex flex-col mt-2 page-list">
                        {#each group.list as page}
                            <li class="flex flex-row my-2 page-item">
                                <time class="flex self-center page-date">
                                    {getMMDD(page.frontMatter.created)}
                                </time>
                                <div class="ml-4 post-title">
                                    <a href={pageRoute.getPostPath(page)}>
                                        {page.frontMatter.title}
                                    </a>
                                </div>
                            </li>
                        {/each}
                    </ul>
                </li>
            {/each}
        </ol>
    </div>    
</div>