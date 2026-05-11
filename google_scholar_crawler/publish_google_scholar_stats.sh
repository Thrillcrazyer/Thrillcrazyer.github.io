#!/usr/bin/env bash
set -euo pipefail

SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
REPO_ROOT="$(cd "${SCRIPT_DIR}/.." && pwd)"
RESULTS_DIR="${SCRIPT_DIR}/results"
JSON_FILES=("gs_data.json" "gs_data_shieldsio.json")
PYTHON_BIN="${PYTHON_BIN:-python3}"
TARGET_BRANCH="${TARGET_BRANCH:-google-scholar-stats}"
COMMIT_MESSAGE="${COMMIT_MESSAGE:-Update Google Scholar stats}"
GIT_USER_NAME="${GIT_USER_NAME:-${GITHUB_ACTOR:-$(id -un)}}"
GIT_USER_EMAIL="${GIT_USER_EMAIL:-${GITHUB_ACTOR:-$(id -un)}@users.noreply.github.com}"
TMP_WORKTREE=""
TMP_BRANCH="publish-google-scholar-stats-$$"

cleanup() {
  set +e

  if [[ -n "${TMP_WORKTREE}" && -d "${TMP_WORKTREE}" ]]; then
    git -C "${REPO_ROOT}" worktree remove --force "${TMP_WORKTREE}" >/dev/null 2>&1
  fi

  git -C "${REPO_ROOT}" branch -D "${TMP_BRANCH}" >/dev/null 2>&1 || true
}

trap cleanup EXIT

cd "${SCRIPT_DIR}"
"${PYTHON_BIN}" main.py

for json_file in "${JSON_FILES[@]}"; do
  if [[ ! -f "${RESULTS_DIR}/${json_file}" ]]; then
    echo "Missing output file: ${RESULTS_DIR}/${json_file}" >&2
    exit 1
  fi
done

if git -C "${REPO_ROOT}" ls-remote --exit-code --heads origin "${TARGET_BRANCH}" >/dev/null 2>&1; then
  git -C "${REPO_ROOT}" fetch origin "${TARGET_BRANCH}"
  TMP_WORKTREE="$(mktemp -d)"
  git -C "${REPO_ROOT}" worktree add -B "${TMP_BRANCH}" "${TMP_WORKTREE}" "origin/${TARGET_BRANCH}"
else
  TMP_WORKTREE="$(mktemp -d)"
  git -C "${REPO_ROOT}" worktree add -b "${TMP_BRANCH}" "${TMP_WORKTREE}"
  git -C "${TMP_WORKTREE}" rm -rf . >/dev/null 2>&1 || true
fi

find "${TMP_WORKTREE}" -mindepth 1 -maxdepth 1 \
  ! -name .git \
  ! -name .gitignore \
  -exec rm -rf {} +

cp "${RESULTS_DIR}/gs_data.json" "${TMP_WORKTREE}/gs_data.json"
cp "${RESULTS_DIR}/gs_data_shieldsio.json" "${TMP_WORKTREE}/gs_data_shieldsio.json"

git -C "${TMP_WORKTREE}" config user.name "${GIT_USER_NAME}"
git -C "${TMP_WORKTREE}" config user.email "${GIT_USER_EMAIL}"
git -C "${TMP_WORKTREE}" add -A

if ! git -C "${TMP_WORKTREE}" diff --cached --quiet; then
  git -C "${TMP_WORKTREE}" commit -m "${COMMIT_MESSAGE}"
fi

git -C "${TMP_WORKTREE}" push origin HEAD:"${TARGET_BRANCH}" --force

rm -rf "${RESULTS_DIR}"

echo "Published gs_data.json and gs_data_shieldsio.json to ${TARGET_BRANCH}."