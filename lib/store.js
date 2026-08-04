const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "..", "notes.json");

function load() {
  try {
    return JSON.parse(fs.readFileSync(FILE, "utf8"));
  } catch {
    return { nextId: 1, notes: [] };
  }
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

// Runs through each id, finds where the id is not equal to the index + 1, and updates the id to be index + 1. Then saves the data.
function renumber() {
  const data = load();
  data.notes.forEach((note, index) => {
    note.id = index + 1;
  });
  data.nextId = data.notes.length + 1;
  save(data);
}

function search(term) {
  return matches(load().notes, term);
}

module.exports = { all, add, remove, search, matches, renumber };
