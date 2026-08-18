# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

A tiny command-line notes tool, used as the practice repo for a Git lesson on branches and pull requests (see README.md). The point of the exercise is the workflow — make a small change, put it on a branch, open a PR with a description that reflects what changed — not the app itself.

## Commands

```sh
node notes.js add <text>       # add a note
node notes.js list             # list all notes
node notes.js search <term>    # list notes whose text contains term
node notes.js delete <id>      # delete a note by id
npm test                       # run the test suite (node --test)
```

No build or lint step — plain Node.js, no dependencies. `npm test` runs `node --test`, which auto-discovers `tests/*.test.js`; run a single file directly with `node --test tests/notes.test.js`.

CI (`.github/workflows/ci.yml`) runs `npm test` on every pull request against Node 22 — a PR isn't green until that passes.

## Architecture

- **`notes.js`** — CLI entry point. Parses `process.argv`, dispatches on the first argument (`add`/`list`/`search`/`delete`) to the matching `lib/store.js` function, and formats output. Unrecognized commands fall through to a usage message that also prints `config.SESSION_TIMEOUT_MINUTES` — the only place `lib/config.js` is currently read.
- **`lib/store.js`** — all persistence and querying. Notes are stored as `{ nextId, notes: [] }` in `notes.json` (gitignored, created on first write) next to the repo root, loaded/saved as a whole on every call — there's no in-memory cache between CLI invocations, since each `node notes.js ...` is a fresh process. `matches(notes, term)` is a pure filter exported separately from `search` specifically so tests can exercise the search logic without touching the filesystem (see `tests/notes.test.js`).
- **`lib/config.js`** — static settings module (currently just `SESSION_TIMEOUT_MINUTES`), not read from env or a file.
