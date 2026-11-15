## Add `count` command

Adds `node notes.js count`, which prints how many notes are stored, for example `You have 3 notes.`

### What changed
- `notes.js`: new `count` case that uses `store.all().length`, with the singular form for one note (`You have 1 note.`).
- The default help line now lists `count`.

### Why
Until now the only way to see how many notes exist was to run `list` and count the lines by hand. `count` gives the number in one command.

### How I checked it
- `npm test` passes (3 of 3).
- Ran `count` by hand with 0, 1 and 3 notes.

### For the reviewer
- There is no automated test for `count` yet: the existing tests cover `matches` only, and `count` just reads from `notes.json`, so a test would need a temporary file. Worth deciding whether that is worth adding.
- The change touches only `notes.js`; `lib/store.js` is unchanged.
