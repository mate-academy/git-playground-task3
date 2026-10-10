const test = require("node:test");
const assert = require("node:assert");

const { formatCount } = require("../lib/format");

test("count uses the plural for zero notes", () => {
  assert.strictEqual(formatCount(0), "You have 0 notes.");
});

test("count uses the singular for one note", () => {
  assert.strictEqual(formatCount(1), "You have 1 note.");
});

test("count uses the plural for several notes", () => {
  assert.strictEqual(formatCount(3), "You have 3 notes.");
});
