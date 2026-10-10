// Builds the message printed by `notes count`.
function formatCount(n) {
  return `You have ${n} ${n === 1 ? "note" : "notes"}.`;
}

module.exports = { formatCount };
