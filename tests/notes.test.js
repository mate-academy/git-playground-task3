const test = require("node:test");
const assert = require("node:assert");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

const { matches, all } = require("../lib/store");

const CLI = path.join(__dirname, "..", "notes.js");

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

test("count reports how many notes are stored", () => {
  const expected = all().length;
  const output = execFileSync(process.execPath, [CLI, "count"], { encoding: "utf8" });
  assert.strictEqual(output.trim(), `You have ${expected} notes.`);
});
