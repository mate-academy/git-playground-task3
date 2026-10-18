const test = require("node:test");
const assert = require("node:assert");
const fs = require("fs");
const os = require("os");
const path = require("path");
const { execFileSync } = require("child_process");

// Runs the CLI in a throwaway copy of the app so the real notes.json is untouched.
function setup() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "notes-"));
  const root = path.join(__dirname, "..");
  fs.copyFileSync(path.join(root, "notes.js"), path.join(dir, "notes.js"));
  fs.cpSync(path.join(root, "lib"), path.join(dir, "lib"), { recursive: true });
  return (...args) =>
    execFileSync("node", [path.join(dir, "notes.js"), ...args], { encoding: "utf8" }).trim();
}

test("count says 0 notes when there are none", () => {
  const run = setup();
  assert.strictEqual(run("count"), "You have 0 notes.");
});

test("count uses the singular for one note", () => {
  const run = setup();
  run("add", "buy milk");
  assert.strictEqual(run("count"), "You have 1 note.");
});

test("count reflects added and deleted notes", () => {
  const run = setup();
  run("add", "buy milk");
  run("add", "call the bank");
  run("add", "milk the almonds");
  assert.strictEqual(run("count"), "You have 3 notes.");
  run("delete", "2");
  assert.strictEqual(run("count"), "You have 2 notes.");
});
