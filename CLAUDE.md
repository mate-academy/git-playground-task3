# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A tiny CLI notes tool used as a practice repo for a Git lesson on branches and pull requests (Unit 4, Lesson 3). The point of most sessions here is not the app itself but exercising the branch → commit → PR workflow through Claude.

## Commands

- `npm test` — run the test suite (Node's built-in test runner, `node --test`)
- `node notes.js add <text>` — add a note
- `node notes.js list` — list all notes
- `node notes.js search <term>` — list notes containing a term
- `node notes.js delete <id>` — delete a note

To run a single test file directly: `node --test tests/notes.test.js`.

## Architecture

- `notes.js` — CLI entry point; parses `process.argv` and dispatches on the first argument (`add`/`list`/`search`/`delete`) to functions in `lib/store.js`.
- `lib/store.js` — all data access. Notes persist to `notes.json` in the repo root (gitignored), loaded/saved as a whole `{ nextId, notes }` object on every operation — there's no in-memory caching between calls. `matches(notes, term)` is exported separately from `search` specifically so tests can check filtering logic without touching the filesystem.
- `lib/config.js` — static settings (currently just `SESSION_TIMEOUT_MINUTES`, which is display-only and not enforced anywhere in the code).
- `tests/notes.test.js` — tests `matches()` against an in-memory fixture array, not the CLI or the JSON file.

## CI

`.github/workflows/ci.yml` runs `npm test` on every pull request via GitHub Actions (Node 22). A PR should not be opened with a failing test suite.

## Workflow expectations

Per the lesson's intended flow: keep `main` clean, do work on a new branch, and open PRs against `mate-academy/git-playground-task3` (not the user's fork) using `gh`. PR descriptions should reflect what actually changed and why, based on the actual commits — not boilerplate.
