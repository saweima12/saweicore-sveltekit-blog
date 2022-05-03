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
export let groups: Array<GroupListPair<SourcePage>>;
</script>


<ol class="flex flex-col">
    {#each groups as group}
        <li>
            <div class="year">{group.name}</div>
            <ul class="flex flex-col">
                {#each group.list as page}
                    <li>{page.frontMatter.title}</li>
                    
                {/each}
            </ul>
        </li>
    {/each}
</ol>