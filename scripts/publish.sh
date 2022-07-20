#!/bin/bash

set -e
yarn build
TMP_QUIZES=$(mktemp)
TMP_CONFIG=$(mktemp)
tar cf "$TMP_QUIZES" src/quizes/*
mv src/quiz_config_ts "$TMP_CONFIG"

git checkout gh-pages
tar xf "$TMP_QUIZES"
mv "$TMP_CONFIG" quiz_config_ts

git add -A
git commit -m "Update pages: $(date -u +"%Y-%m-%d_%H:%M")"
git push origin gh-pages
git checkout master

rm "$TMP_QUIZES" "$TMP_CONFIG"
set -x
