<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';

    export const load : Load = async ({ params, fetch }) => {
        const { slug } = params; 
        const apiUrl = dataAPI.getTagPageList(slug);
        const response = await fetch(apiUrl);
        const { tagName, postList } = await response.json();

        return {
            props: {
                tagName: tagName,
                postList: postList
            }
        }
    }

</script>
<script lang="ts">
    import type { SourcePage } from 'markedpage';
    import Postlist from '$lib/components/article/postlist.svelte';
    import TagIcon from '$lib/components/icon/tag.svelte';

    export let tagName: string;
    export let postList: Array<SourcePage>;
</script>

<div class="tag-page wrapper">
    <div class="tag-page-container">
        <header class="mt-8 mx-6 tag-header">
            <div class="flex items-center">
                <div class="w-5 h-5 mr-2 icon-base"><TagIcon /></div>
    
                <h1 class="flex self-center text-2xl font-bold letter-title-font tag-title">
                    {tagName}
                </h1>

            </div>
        </header>
        <Postlist posts={postList}/>    
    </div>
</div>
