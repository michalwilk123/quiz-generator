#!/bin/bash

set -e

yarn build
TMP_QUIZES=$(mktemp)
TMP_CONFIG=$(mktemp)
tar cf "$TMP_QUIZES" src/quizes/*
cp src/quiz_config.ts "$TMP_CONFIG"

git checkout gh-pages
tar xf "$TMP_QUIZES"
mv "$TMP_CONFIG"  quiz_config.ts

cat "$TMP_QUIZES"
exit

git add -A
git commit -m "Update pages: $(date -u +"%Y-%m-%d_%H:%M")"
git push origin gh-pages
git checkout master

rm "$TMP_QUIZES"
set -x
