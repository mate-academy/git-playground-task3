const test = require("node:test");
const assert = require("node:assert");

const { matches } = require("../lib/store");

const notes = [
  { id: 1, text: "buy milk" },
  { id: 2, text: "call the bank" },
  { id: 3, text: "milk the almonds" },
];

// test cases for the search and matches function
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

test("search returns all notes when searching for an empty string", () => {
  const result = matches(notes, "");
  assert.strictEqual(result.length, notes.length);
});

test("search is case-sensitive", () => {
  const result = matches(notes, "Milk");
  assert.strictEqual(result.length, 0);
});

test("search finds notes with the term in the middle of the text", () => {
  const result = matches(notes, "the");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
});

test("search finds notes with the term at the start of the text", () => {
  const result = matches(notes, "buy");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 1);
}
);
test("search finds notes with the term at the end of the text", () => {
  const result = matches(notes, "almonds");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 3);
}); 
test("search finds notes with the term as a substring of a word", () => {
  const result = matches(notes, "mil");
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].id, 1);
  assert.strictEqual(result[1].id, 3);
}
);
test("search finds notes with the term as a substring of multiple words", () => {
  const result = matches(notes, "the");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
}
);
test("search finds notes with the term as a substring of a word in multiple notes", () => {
  const result = matches(notes, "mil");
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].id, 1);
  assert.strictEqual(result[1].id, 3);
});
test("search finds notes with the term as a substring of multiple words in multiple notes", () => {
  const result = matches(notes, "the");
  assert.strictEqual(result.length, 1);
  assert.strictEqual(result[0].id, 2);
});
test("search finds notes with the term as a substring of a word in multiple notes", () => {
  const result = matches(notes, "mil");
  assert.strictEqual(result.length, 2);
  assert.strictEqual(result[0].id, 1);
  assert.strictEqual(result[1].id, 3);
});
// tests for add function 
test("add adds a new note with the next available id", () => {
  const store = require("../lib/store");
  const initialNotes = store.all();
  const newNote = store.add("new note");
  const updatedNotes = store.all();
  assert.strictEqual(updatedNotes.length, initialNotes.length + 1);
  assert.strictEqual(newNote.id, initialNotes.length + 1);
  assert.strictEqual(newNote.text, "new note");
});

test("add adds a new note with the correct text", () => {
  const store = require("../lib/store");
  const newNote = store.add("another note");
  assert.strictEqual(newNote.text, "another note");
});

test("add adds a new note with a unique id", () => {
  const store = require("../lib/store");
  const newNote1 = store.add("note 1");
  const newNote2 = store.add("note 2");
  assert.notStrictEqual(newNote1.id, newNote2.id);
});

test("add adds a new note with an id that increments correctly", () => {
  const store = require("../lib/store");
  const initialNotes = store.all();
  const newNote1 = store.add("note 1");
  const newNote2 = store.add("note 2");
  assert.strictEqual(newNote1.id, initialNotes.length + 1);
  assert.strictEqual(newNote2.id, initialNotes.length + 2);
});

test("add adds a new note with the correct text and id", () => {
  const store = require("../lib/store");
  const initialNotes = store.all();
  const newNote = store.add("test note");
  assert.strictEqual(newNote.text, "test note");
  assert.strictEqual(newNote.id, initialNotes.length + 1);
}
);

// tests for remove function
test("remove removes a note by id", () => {
  const store = require("../lib/store");
  const newNote = store.add("note to remove");
  const removed = store.remove(newNote.id);
  assert.strictEqual(removed, true);
  const notes = store.all();
  assert.strictEqual(notes.find((n) => n.id === newNote.id), undefined);
}
);

test("remove returns false when trying to remove a non-existent note", () => {
  const store = require("../lib/store");
  const removed = store.remove(9999);
  assert.strictEqual(removed, false);
});

test("remove does not affect other notes", () => {
  const store = require("../lib/store");
  const note1 = store.add("note 1");
  const note2 = store.add("note 2");
  const removed = store.remove(note1.id);
  assert.strictEqual(removed, true);
  const notes = store.all();
  assert.strictEqual(notes.find((n) => n.id === note1.id), undefined);
  assert.notStrictEqual(notes.find((n) => n.id === note2.id), undefined);
});

test("remove does not change the nextId counter", () => {
  const store = require("../lib/store");
  const initialNextId = store.all().length + 1;
  const newNote = store.add("note to remove");
  const removed = store.remove(newNote.id);
  assert.strictEqual(removed, true);
  const notes = store.all();
  assert.strictEqual(notes.length + 1, initialNextId);
});

// tests for list function
test("list returns all notes", () => {
  const store = require("../lib/store");
  const initialNotes = store.all();
  const newNote1 = store.add("note 1");
  const newNote2 = store.add("note 2");
  const notes = store.all();
  assert.strictEqual(notes.length, initialNotes.length + 2);
  assert.notStrictEqual(notes.find((n) => n.id === newNote1.id), undefined);
  assert.notStrictEqual(notes.find((n) => n.id === newNote2.id), undefined);
});

test("list returns an empty array when there are no notes", () => {
  const store = require("../lib/store");
  // Remove all existing notes
  const existingNotes = store.all();
  for (const note of existingNotes) {
    store.remove(note.id);
  }
  const notes = store.all();
  assert.strictEqual(notes.length, 0);
});

// tests for renumber function
test("renumber updates note ids to be sequential starting from 1", () => {
  const store = require("../lib/store");
  // Add some notes
  const note1 = store.add("note 1");
  const note2 = store.add("note 2");
  const note3 = store.add("note 3");
  // Remove the second note to create a gap in ids
  store.remove(note2.id);
  // Renumber the notes
  store.renumber();
  const notes = store.all();
  assert.strictEqual(notes[0].id, 1);
  assert.strictEqual(notes[1].id, 2);
  assert.strictEqual(notes.length, 2);
});
