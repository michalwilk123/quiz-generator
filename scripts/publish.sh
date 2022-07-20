#!/bin/bash

yarn build
git checkout gh-pages
git add -A
git commit -m "Update pages: $(date -u +"%Y-%m-%d_%H:%M")"
git push origin gh-pages
git checkout master

