const test = require("node:test");
const assert = require("node:assert");

const { countMessage } = require("../notes");

test("count uses the singular form for exactly one note", () => {
  assert.strictEqual(countMessage(1), "You have 1 note.");
});

test("count uses the plural form for multiple notes", () => {
  assert.strictEqual(countMessage(3), "You have 3 notes.");
});

test("count uses the plural form for zero notes", () => {
  assert.strictEqual(countMessage(0), "You have 0 notes.");
});
