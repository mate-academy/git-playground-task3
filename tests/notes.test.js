const test = require("node:test");
const assert = require("node:assert");

const store = require("../lib/store");
const { matches } = store;

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

test("count reflects the number of stored notes", () => {
  const before = store.count();
  const note = store.add("temporary note for count test");
  assert.strictEqual(store.count(), before + 1);
  store.remove(note.id);
  assert.strictEqual(store.count(), before);
});
