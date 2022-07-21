#!/bin/bash

set -e

yarn build
TMP_QUIZES=$(mktemp)
TMP_CONFIG=$(mktemp)
cd src
tar cf "$TMP_QUIZES" quizes/*
cd ..
cp src/quiz_config.ts "$TMP_CONFIG"

git checkout gh-pages

tar xf "$TMP_QUIZES"
test -f assets && rm -r assets
yes | cp -r dist/* .
cp "$TMP_CONFIG" quiz_config.ts

git add -A
git diff --cached --exit-code && git commit -m "Update pages: $(date -u +"%Y-%m-%d_%H:%M")" \
    && git push origin gh-pages && echo "Successfully updated your github site!" \
    2> /dev/null
git checkout master
tar xf "$TMP_QUIZES"
rm -r src/quizes
mv quizes src
cp "$TMP_CONFIG"  src/quiz_config.ts

rm "$TMP_QUIZES" "$TMP_CONFIG"
set -x
