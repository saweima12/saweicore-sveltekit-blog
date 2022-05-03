<script lang="ts" context="module">
    import type { Load } from '@sveltejs/kit';
    import type { PageResult } from '$lib/types';
    import { dataAPI } from '$lib/client';

    export const load: Load = async ({fetch}) => {
        const api = dataAPI.getAboutData();
        const response = await fetch(api);
        const { metadata, content } : PageResult = await response.json();

        return {
            props: {
                
            }
        }
    };

</script>


