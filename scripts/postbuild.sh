if [ -z "$ALGOLIA_APPID" ]; then
    node ./scripts/commitAgolia.js
fi

pnpm exec svelte-sitemap --domain https://saweicore.com/ -c daily