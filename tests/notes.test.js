const test = require("node:test");
const assert = require("node:assert");

const { matches, countMessage } = require("../lib/store");

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

test("count message uses plural form for multiple notes", () => {
  assert.strictEqual(countMessage(3), "you have 3 notes");
});

test("count message uses singular form for one note", () => {
  assert.strictEqual(countMessage(1), "you have 1 note");
});

test("count message uses plural form for zero notes", () => {
  assert.strictEqual(countMessage(0), "you have 0 notes");
});
