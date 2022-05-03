<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';

    export const load : Load = async ({ params, fetch }) => {
        const { year, month, slug } = params; 
        const apiUrl = dataAPI.getPostData(year, month, slug);
        const response = await fetch(apiUrl);
        const { metadata, content} = await response.json();
        return {
            props: {
                metadata: metadata,
                content: content
            }
        }
    }

</script>

<script lang="ts">
    export let metadata: Record<string, any>;
    export let content: string;
</script>

<div class="post-page wrapper">
    <div class="post-container">
        <header class="mx-6 mt-8 mb-4">
            <div class="font-bold letter-title-font post-title">
                {metadata.title}
            </div>
        </header>
    
        <article class="content">
            {@html content}
        </article>
    
    </div>    
</div>
