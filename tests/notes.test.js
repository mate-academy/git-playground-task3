const test = require("node:test");
const assert = require("node:assert");

const { matches, countMatches } = require("../lib/store");

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

test("count returns the number of notes that contain the term", () => {
  const result = countMatches(notes, "milk");
  assert.strictEqual(result, 2);
});

test("count returns 1 when only a single note matches", () => {
  const result = countMatches(notes, "bank");
  assert.strictEqual(result, 1);
});

test("count returns 0 when no note contains the term", () => {
  const result = countMatches(notes, "xyz");
  assert.strictEqual(result, 0);
});
