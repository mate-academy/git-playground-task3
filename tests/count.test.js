const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

const CLI = path.join(__dirname, "..", "notes.js");

function run(file, ...args) {
  return execFileSync("node", [CLI, ...args], {
    env: { ...process.env, NOTES_FILE: file },
    encoding: "utf8",
  }).trim();
}

function tmpFile() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
  return path.join(dir, "notes.json");
}

test("count prints 0 when there are no notes", () => {
  assert.strictEqual(run(tmpFile(), "count"), "You have 0 notes.");
});

test("count prints the number of saved notes", () => {
  const file = tmpFile();
  run(file, "add", "one");
  run(file, "add", "two");
  run(file, "add", "three");
  assert.strictEqual(run(file, "count"), "You have 3 notes.");
});

test("count decreases after delete", () => {
  const file = tmpFile();
  run(file, "add", "one");
  run(file, "add", "two");
  run(file, "delete", "1");
  assert.strictEqual(run(file, "count"), "You have 1 notes.");
});
