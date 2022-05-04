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
import { getMMDD, pageRoute } from '$lib/client';

export let groups: Array<GroupListPair<SourcePage>>;
</script>

<div class="mt-8 wrapper journal-page">
    <div class="journel-container pt-2">
        <ol class="flex flex-col years-group">
            {#each groups as group}
                <li class="year-group">
                    <h1 class="text-2xl letter-title-font year">{group.name}</h1>
                    <ul class="flex flex-col journal-list">
                        {#each group.list as page}
                            <li class="flex flex-row mt-2 post-item">
                                <time class="flex self-center post-date">
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