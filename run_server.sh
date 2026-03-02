#!/usr/bin/env bash
set -euo pipefail

# Fix for Ruby 3 + pathutil 0.16.2 (used by Jekyll 3.x / github-pages).
export RUBYOPT="${RUBYOPT:-} -r./patches/pathutil_kwfix"

# Use bundler version from Gemfile.lock to avoid version conflicts
bundle _2.2.19_ install

port_in_use() {
	local port="$1"
	ss -ltn 2>/dev/null | awk '{print $4}' | grep -qE ":${port}$"
}

pick_free_port() {
	local start="$1"
	local end="$2"
	local p
	for p in $(seq "$start" "$end"); do
		if ! port_in_use "$p"; then
			echo "$p"
			return 0
		fi
	done
	return 1
}

JEKYLL_PORT="${JEKYLL_PORT:-}"
LIVERELOAD_PORT="${LIVERELOAD_PORT:-}"

if [[ -z "$JEKYLL_PORT" ]]; then
	JEKYLL_PORT="$(pick_free_port 4000 4010)"
fi

if [[ -z "$LIVERELOAD_PORT" ]]; then
	LIVERELOAD_PORT="$(pick_free_port 35729 35749)"
fi

bundle _2.2.19_ exec jekyll serve --livereload --port "$JEKYLL_PORT" --livereload-port "$LIVERELOAD_PORT"