<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import { dataAPI } from '$lib/client';

    export const load : Load = async ({ params, fetch }) => {
        const { year, month, slug } = params; 
        const apiUrl = dataAPI.getPostData(year, month, slug);
        const response = await fetch(apiUrl);
        const data = await response.json();
        return {
            props: {
                metadata: data.metadata,
                context: data.context
            }
        }
    }

</script>

<script lang="ts">
    export let metadata: Record<string, any>;
    export let context: string;
</script>

{metadata.title}

{@html context}