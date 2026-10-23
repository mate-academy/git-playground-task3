const test = require("node:test");
const assert = require("node:assert");

const { countMessage } = require("../lib/format");

test("count message for several notes", () => {
  assert.strictEqual(countMessage(3), "You have 3 notes.");
});

test("count message uses singular for one note", () => {
  assert.strictEqual(countMessage(1), "You have 1 note.");
});

test("count message when there are no notes", () => {
  assert.strictEqual(countMessage(0), "You have no notes.");
});
