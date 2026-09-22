const test = require("node:test");
const assert = require("node:assert");

const { matches, length } = require("../lib/store");

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

test("count returns the total number of notes", () => {
  const result = length(notes);
  assert.strictEqual(result, 3);
});

test("count returns zero for empty notes", () => {
  const result = length([]);
  assert.strictEqual(result, 0);
});

test("count returns one for a single note", () => {
  const result = length([{ id: 1, text: "test note" }]);
  assert.strictEqual(result, 1);
});
