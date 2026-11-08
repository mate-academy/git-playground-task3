const test = require("node:test");
const assert = require("node:assert");

const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const { matches } = require("../lib/store");

function runCli(file, ...args) {
  return execFileSync(
    process.execPath,
    [path.join(__dirname, "..", "notes.js"), ...args],
    { env: { ...process.env, NOTES_FILE: file }, encoding: "utf8" }
  ).trim();
}

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

test("count reports how many notes exist", () => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "notes-test-"));
  const file = path.join(dir, "notes.json");
  try {
    assert.strictEqual(runCli(file, "count"), "You have 0 notes");
    runCli(file, "add", "buy milk");
    assert.strictEqual(runCli(file, "count"), "You have 1 note");
    runCli(file, "add", "call the bank");
    assert.strictEqual(runCli(file, "count"), "You have 2 notes");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
