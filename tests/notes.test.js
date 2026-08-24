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

test("count describes several notes in the plural", () => {
  assert.strictEqual(describeCount(notes), "You have 3 notes.");
});

test("count describes a single note in the singular", () => {
  assert.strictEqual(describeCount([notes[0]]), "You have 1 note.");
});

test("count describes an empty list", () => {
  assert.strictEqual(describeCount([]), "You have 0 notes.");
});
