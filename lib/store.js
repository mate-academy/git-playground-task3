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
  const note = { id: data.nextId, text, createdAt: new Date().toISOString() };
  data.notes.push(note);
  data.nextId += 1;
  save(data);
  return note;
}

// Notes created before `createdAt` existed fall back to epoch 0, so they
// always sort as older than any timestamped note (and ties, including
// between two such legacy notes, break on id — which is itself creation-order).
function createdAtMillis(note) {
  const parsed = note.createdAt ? Date.parse(note.createdAt) : NaN;
  return Number.isNaN(parsed) ? 0 : parsed;
}

function sortNotes(notes, order = "created") {
  return [...notes].sort((first, second) => {
    if (order === "alphabetical") {
      return first.text.localeCompare(second.text);
    }

    return createdAtMillis(first) - createdAtMillis(second) || first.id - second.id;
  });
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

module.exports = { all, add, remove, search, matches, sortNotes };
