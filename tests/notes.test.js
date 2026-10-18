const test = require("node:test");
const assert = require("node:assert");

const { matches } = require("../lib/store");

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

const { countMessage } = require("../lib/store");

test("count message uses plural for many notes", () => {
  assert.strictEqual(countMessage(3), "You have 3 notes.");
});

test("count message uses singular for one note", () => {
  assert.strictEqual(countMessage(1), "You have 1 note.");
});

test("count message handles zero notes", () => {
  assert.strictEqual(countMessage(0), "You have 0 notes.");
});
