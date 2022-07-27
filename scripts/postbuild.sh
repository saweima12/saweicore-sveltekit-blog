if [ ! -z "$ALGOLIA_APPID" ]; then
    node ./scripts/commitAgolia.js
fi
