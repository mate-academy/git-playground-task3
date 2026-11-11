const test = require("node:test");
const assert = require("node:assert");

const fs = require("node:fs");
const path = require("node:path");

const { matches, count } = require("../lib/store");

const NOTES_FILE = path.join(__dirname, "..", "notes.json");

const notes = [
  { id: 1, text: "buy milk" },
  { id: 2, text: "call the bank" },
  { id: 3, text: "milk the almonds" },
];

test("search finds every note that contains the term", () => {
  const result = matches(notes, "milk");
  assert.strictEqual(result.length, 2);
});

test("search finds a single containing note", () => {
  const result = matches(notes, "bank");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
});

test("search returns nothing when no note contains the term", () => {
  const result = matches(notes, "xyz");
  assert.strictEqual(result.length, 0);
});

test.describe("count", () => {
  let original;

  test.beforeEach(() => {
    original = fs.existsSync(NOTES_FILE) ? fs.readFileSync(NOTES_FILE, "utf8") : null;
  });

  test.afterEach(() => {
    if (original === null) {
      fs.rmSync(NOTES_FILE, { force: true });
    } else {
      fs.writeFileSync(NOTES_FILE, original);
    }
  });

  test("returns 0 when there is no notes file", () => {
    fs.rmSync(NOTES_FILE, { force: true });
    assert.strictEqual(count(), 0);
  });

  test("returns 0 when the notes list is empty", () => {
    fs.writeFileSync(NOTES_FILE, JSON.stringify({ nextId: 1, notes: [] }));
    assert.strictEqual(count(), 0);
  });

  test("returns the number of stored notes", () => {
    fs.writeFileSync(NOTES_FILE, JSON.stringify({ nextId: 4, notes }));
    assert.strictEqual(count(), 3);
  });
});
