// Builds the message printed by `notes count`.
function countMessage(n) {
  if (n === 0) return "You have no notes.";
  return `You have ${n} ${n === 1 ? "note" : "notes"}.`;
}

module.exports = { countMessage };
