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

function search(term) {
  return matches(load().notes, term);
}

// Returns the count formatted with a random trailing message.
function count() {
  const n = load().notes.length;
  const msgs = [
    `You have ${n} notes, hurray!`,
    `You have ${n} notes — woohoo!`,
    `You have ${n} notes, celebrate!`,
    `You have ${n} notes. That's enough!`,
    `You have ${n} notes. Go team!`,
  ];
  return msgs[Math.floor(Math.random() * msgs.length)];
}

module.exports = { all, add, remove, search, matches, count };
