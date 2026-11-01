function countMessage(n) {
  if (n === 0) return "You have no notes left.";
  if (n === 1) return "You have 1 note left.";
  return `You have ${n} notes left.`;
}

module.exports = { countMessage };
