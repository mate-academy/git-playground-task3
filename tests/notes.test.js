const test = require("node:test");
const assert = require("node:assert");

const { matches, describeCount } = require("../lib/store");

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

test("describeCount uses the singular form for exactly one note", () => {
  assert.strictEqual(describeCount(1), "You have 1 note.");
});

test("describeCount uses the plural form for zero or many notes", () => {
  assert.strictEqual(describeCount(0), "You have 0 notes.");
  assert.strictEqual(describeCount(3), "You have 3 notes.");
});
