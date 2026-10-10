const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "notes.json");

// Parses the contents of notes.json. Throws instead of returning an empty
// store, so a damaged file is never silently overwritten by the next save.
function parse(text) {
  let data;
  try {
    data = JSON.parse(text);
  } catch {
    throw new Error(`${FILE} is not valid JSON. Fix or remove it to continue.`);
  }
  if (!data || !Array.isArray(data.notes) || !Number.isInteger(data.nextId)) {
    throw new Error(`${FILE} is not a notes file (expected "nextId" and a "notes" list).`);
  }
  return data;
}

function load() {
  let text;
  try {
    text = fs.readFileSync(FILE, "utf8");
  } catch (err) {
    if (err.code === "ENOENT") return { nextId: 1, notes: [] };
    throw err;
  }
  return parse(text);
}

function save(data) {
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
}

function all() {
  return load().notes;
}

function add(text) {
  const data = load();
  const note = { id: data.nextId, text };
  data.notes.push(note);
  data.nextId += 1;
  save(data);
  return note;
}

function remove(id) {
  const data = load();
  const before = data.notes.length;
  data.notes = data.notes.filter((n) => n.id !== id);
  save(data);
  return data.notes.length < before;
}

// Returns the notes whose text contains `term`.
function matches(notes, term) {
  return notes.filter((note) => note.text.includes(term));
}

function search(term) {
  return matches(load().notes, term);
}

module.exports = { all, add, remove, search, matches, parse };
