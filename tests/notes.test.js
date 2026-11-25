const test = require("node:test");
const assert = require("node:assert");

const { matches } = require("../lib/store");

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

// --- count command ---------------------------------------------------------
// The store writes notes.json next to the code, so run the CLI from a temp
// copy of the project to avoid touching the user's real notes.
const fs = require("node:fs");
const os = require("node:os");
const path = require("node:path");
const { execFileSync } = require("node:child_process");

function makeSandbox() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), "notes-count-"));
  const root = path.join(__dirname, "..");
  fs.copyFileSync(path.join(root, "notes.js"), path.join(dir, "notes.js"));
  fs.cpSync(path.join(root, "lib"), path.join(dir, "lib"), { recursive: true });
  const run = (...args) =>
    execFileSync("node", [path.join(dir, "notes.js"), ...args], { encoding: "utf8" }).trim();
  return { dir, run };
}

test("count reports zero notes when the store is empty", () => {
  const { dir, run } = makeSandbox();
  try {
    assert.strictEqual(run("count"), "You have 0 notes.");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("count uses the singular for exactly one note", () => {
  const { dir, run } = makeSandbox();
  try {
    run("add", "buy milk");
    assert.strictEqual(run("count"), "You have 1 note.");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});

test("count reports the number of notes and tracks deletes", () => {
  const { dir, run } = makeSandbox();
  try {
    run("add", "one");
    run("add", "two");
    run("add", "three");
    assert.strictEqual(run("count"), "You have 3 notes.");
    run("delete", "2");
    assert.strictEqual(run("count"), "You have 2 notes.");
  } finally {
    fs.rmSync(dir, { recursive: true, force: true });
  }
});
