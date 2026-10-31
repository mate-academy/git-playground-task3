// Returns the message shown by the `count` command.
function countMessage(n) {
  return `You have ${n} ${n === 1 ? "note" : "notes"}.`;
}

module.exports = { countMessage };
