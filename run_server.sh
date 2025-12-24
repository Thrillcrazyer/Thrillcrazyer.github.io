#!/usr/bin/env bash
set -euo pipefail

# Fix for Ruby 3 + pathutil 0.16.2 (used by Jekyll 3.x / github-pages).
export RUBYOPT="${RUBYOPT:-} -r./patches/pathutil_kwfix"

bundle install
bundle exec jekyll serve --livereload