const test = require("node:test");
const assert = require("node:assert");

const { matches, sortNotes } = require("../lib/store");

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

test("sortNotes orders notes alphabetically without changing the input", () => {
  const result = sortNotes(notes, "alphabetical");

  assert.deepStrictEqual(result.map((note) => note.text), [
    "buy milk",
    "call the bank",
    "milk the almonds",
  ]);
  assert.strictEqual(notes[0].id, 1);
});

test("sortNotes orders notes by created date", () => {
  const datedNotes = [
    { id: 1, text: "new", createdAt: "2026-01-02T00:00:00.000Z" },
    { id: 2, text: "old", createdAt: "2026-01-01T00:00:00.000Z" },
  ];

  assert.deepStrictEqual(
    sortNotes(datedNotes).map((note) => note.text),
    ["old", "new"],
  );
});

test("sortNotes treats notes without createdAt as older than dated notes", () => {
  const mixed = [
    { id: 5, text: "dated", createdAt: "2026-01-01T00:00:00.000Z" },
    { id: 1, text: "legacy" },
  ];

  assert.deepStrictEqual(
    sortNotes(mixed).map((note) => note.text),
    ["legacy", "dated"],
  );
});
