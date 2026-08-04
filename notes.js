#!/usr/bin/env node
const store = require("./lib/store");
const config = require("./lib/config");

const [command, ...rest] = process.argv.slice(2);

function main() {
  switch (command) {
    case "add": {
      const text = rest.join(" ").trim();
      if (!text) {
        console.log("Usage: notes add <your note>");
        return;
      }
      const note = store.add(text);
      console.log(`Added note #${note.id}: ${note.text}`);
      break;
    }
    case "list": {
      const notes = store.all();
      if (notes.length === 0) {
        console.log("No notes yet. Add one with: notes add <text>");
        return;
      }
      for (const note of notes) {
        console.log(`#${note.id}  ${note.text}`);
      }
      break;
    }
    case "search": {
      const term = rest.join(" ").trim();
      const found = store.search(term);
      if (found.length === 0) {
        console.log(`No notes match "${term}"`);
        return;
      }
      for (const note of found) {
        console.log(`#${note.id}  ${note.text}`);
      }
      break;
    }
    case "delete": {
      const id = Number(rest[0]);
      const ok = store.remove(id);
      console.log(ok ? `Deleted note #${id}` : `No note #${id} found`);
      break;
    }
    case "renumber": {
      store.renumber();
      console.log("Renumbered notes.");
      break;
    }
    case "count": {
      const n = store.count();
      console.log(n === 1 ? "You have 1 note." : `You have ${n} notes.`);
      break;
    }
    case "edit": {
      const id = Number(rest[0]);
      const text = rest.slice(1).join(" ").trim();
      if (!rest[0] || !text) {
        console.log("Usage: notes edit <id> <new text>");
        return;
      }
      const note = store.edit(id, text);
      console.log(note ? `Updated note #${note.id}: ${note.text}` : `No note #${id} found`);
      break;
    }
    case "clear": {
      const removed = store.clear();
      console.log(removed === 0 ? "No notes to clear." : `Cleared ${removed} note${removed === 1 ? "" : "s"}.`);
      break;
    }
    default:
      console.log("Commands: add <text> | list | search <term> | delete <id> | renumber | count | edit <id> <new text> | clear");
      console.log(`(Session locks after ${config.SESSION_TIMEOUT_MINUTES} minutes of inactivity.)`);
  }
}

main();
