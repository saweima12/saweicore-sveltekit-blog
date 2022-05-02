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
    export let tagName: string;
    export let postList: Array<Record<string, any>>;
</script>

{tagName}
{postList}
