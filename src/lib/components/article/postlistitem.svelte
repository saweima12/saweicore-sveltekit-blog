<script lang="ts">
    import type { SourcePage } from 'markedpage';
    export let post: SourcePage;
    export let tags: Array<string>;
    
    import { getYYYYMMDD, pageRoute } from '$lib/client';
    import CalenderIcon from '$lib/components/icon/calender.svelte';
    import MoreIcon from '$lib/components/icon/more.svelte';
</script>


<section class="mx-6 mt-5 post-list-item">
    <div class="list-item-container">
        <header class="mb-3 post-header">
            <div class="flex items-center created-date">
                <div class="icon-base w-4 h-4"><CalenderIcon /></div>
                <time class="flex self-center text-sm ml-1">{getYYYYMMDD(post.frontMatter.created)}</time>
            </div>
        </header>

        <main class="flex flex-row mb-2 post-content">
            <div class="flex-1 context">
                <div class="letter-title-font text-base font-bold post-title">
                    <a href={pageRoute.getPostPath(post)}>
                        {post.frontMatter.title}
                    </a>
                </div>
    
                <div class="hidden sm:inline-block summary">
                    <a href={pageRoute.getPostPath(post)}>
                        {#if post.frontMatter.excerpt}
                            <p>
                                {post.frontMatter.excerpt.length > 30 
                                    ? post.frontMatter.excerpt.slice(0, 60) + "..." 
                                    : post.frontMatter.excerpt
                                }
                            </p>
                        {/if}
                    </a>
                </div>
    
    
                <footer class="flex items-center my-3">
                    <div class="flex items-center">
                        <div class="flex tag-list">
                            {#if tags }
                                <div class="px-3 py-0.5 flex self-center mr-2 tag-list-item">
                                    <a href={pageRoute.getTagPath(tags[0])}>{tags[0]}</a>
                                </div>
                                {#each tags.slice(1, 4) as tag}
                                    <div class="hidden px-3 py-0.5 sm:flex self-center mr-2 tag-list-item">
                                        <a href={pageRoute.getTagPath(tag)}>{tag}</a>
                                    </div>
                                {/each}
                            {/if}
                        </div>
                    </div>
                    <div class="grow spacer"></div>
                    
                    {#if !post.frontMatter.thumbnail}
                    <div class="flex mr-2 self-center more">
                        <a href={pageRoute.getPostPath(post)}>
                            <div class="icon-base w-6 h-6">
                                <MoreIcon />
                            </div>
                        </a>
                    </div>
                    {/if}
                </footer>
            </div>
            {#if post.frontMatter.thumbnail}
            <div class="align-center w-20 ml-3 thumbnail">
                <a href={pageRoute.getPostPath(post)}>
                    <img src={post.frontMatter.thumbnail} class="object-cover w-16 h-16" alt="test"/>
                </a>
            </div>
            {/if}
        </main>
    </div>
</section>