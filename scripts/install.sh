#!/bin/bash

set -e

git checkout -b gh-pages
git checkout rm -r *
git checkout master

set -x
