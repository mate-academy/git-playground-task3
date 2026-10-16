# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

`notes-cli` — a tiny command-line notes tool. It is the practice repo for "Unit 4, Lesson 3" (a lesson about branches and pull requests), so the workflow expectation is: small change → branch → PR with a meaningful description → green CI. No build step, no dependencies.

## Commands

```bash
npm test                                   # run the full suite (node --test, discovers tests/)
node --test tests/notes.test.js            # run a single test file
node --test --test-name-pattern="search"   # run tests whose name matches a pattern
npm start                                   # == node notes.js (prints usage)

node notes.js add <text>      # add a note
node notes.js list            # list all notes
node notes.js search <term>   # list notes whose text contains <term>
node notes.js delete <id>     # delete a note by id
```

Requires Node 22 (the version CI runs). CI (`.github/workflows/ci.yml`) runs `npm test` on every pull request only — not on push.

## Architecture

Three layers, each a CommonJS module:

- `notes.js` — entry point. Parses `argv` into `command` + `rest`, dispatches via a `switch`, and owns all `console.log` output and usage strings. **A new subcommand means a new `case` here plus a function in the store.**
- `lib/store.js` — persistence and queries. **Stateless by design:** every operation calls `load()` (read+parse the JSON file) and `save()` (stringify+write) — there is no in-memory cache, so each command re-reads the whole file. `load()` swallows read/parse errors and returns `{ nextId: 1, notes: [] }`, so a missing or corrupt data file silently resets to empty.
- `lib/config.js` — plain settings object (currently just `SESSION_TIMEOUT_MINUTES`).

Data lives in `notes.json` at the repo root, created lazily on first write. It is gitignored — do not commit it, and don't assume it exists when reasoning about tests.

## Testing convention

Tests import and exercise `matches(notes, term)` — the one **pure** function in `store.js` (filters an in-memory array, touches no filesystem). The file-touching functions (`add`/`remove`/`search`/`all`) are deliberately thin wrappers around `load`/`save`/`matches`. When you add logic that needs a test, factor the pure part out the same way (like `search` → `matches`) so the test never reads or writes `notes.json`.
