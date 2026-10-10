const test = require("node:test");
const assert = require("node:assert");

const { parse } = require("../lib/store");

test("parse reads a valid notes file", () => {
  const data = parse('{"nextId": 2, "notes": [{"id": 1, "text": "buy milk"}]}');
  assert.strictEqual(data.nextId, 2);
  assert.strictEqual(data.notes.length, 1);
});

test("parse rejects invalid JSON instead of returning an empty store", () => {
  assert.throws(() => parse('{"nextId": 2, "notes": ['), /not valid JSON/);
});

test("parse rejects JSON without a notes list", () => {
  assert.throws(() => parse("{}"), /not a notes file/);
  assert.throws(() => parse("[]"), /not a notes file/);
  assert.throws(() => parse("null"), /not a notes file/);
});
