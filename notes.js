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
      console.log(`\n(${notes.length} note${notes.length === 1 ? "" : "s"} total)`);
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
    default: {
      const icons = {
        add:    "\u{2795}",   // ➕
        list:   "\u{1F4DD}",  // 📝
        search: "\u{1F50D}",  // 🔍
        delete: "\u{1F5D1}"   // 🗑️
      };
      console.log(`Commands: ${icons.add} add <text> | ${icons.list} list | ${icons.search} search <term> | ${icons.delete} delete <id>`);
      console.log(`(Session locks after ${config.SESSION_TIMEOUT_MINUTES} minutes of inactivity.)`);
    }
  }
}

main();
