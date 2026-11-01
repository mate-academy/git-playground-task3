const test = require("node:test");
const assert = require("node:assert");

const { matches } = require("../lib/store");
const { countMessage } = require("../notes");

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

test("countMessage uses the plural for zero notes", () => {
  assert.strictEqual(countMessage(0), "You have 0 notes.");
});

test("countMessage uses the singular for one note", () => {
  assert.strictEqual(countMessage(1), "You have 1 note.");
});

test("countMessage uses the plural for several notes", () => {
  assert.strictEqual(countMessage(5), "You have 5 notes.");
});
