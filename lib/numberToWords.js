const ONES = [
  "zero", "one", "two", "three", "four", "five", "six", "seven", "eight", "nine", "ten",
  "eleven", "twelve", "thirteen", "fourteen", "fifteen", "sixteen", "seventeen", "eighteen", "nineteen",
];
const TENS = ["", "", "twenty", "thirty", "forty", "fifty", "sixty", "seventy", "eighty", "ninety"];

function numberToWords(n) {
  if (n < 20) return ONES[n];
  if (n < 100) {
    const tens = TENS[Math.floor(n / 10)];
    const rest = n % 10;
    return rest ? `${tens}-${ONES[rest]}` : tens;
  }
  if (n < 1000) {
    const hundreds = Math.floor(n / 100);
    const rest = n % 100;
    return rest ? `${ONES[hundreds]} hundred ${numberToWords(rest)}` : `${ONES[hundreds]} hundred`;
  }
  const thousands = Math.floor(n / 1000);
  const rest = n % 1000;
  return rest ? `${numberToWords(thousands)} thousand ${numberToWords(rest)}` : `${numberToWords(thousands)} thousand`;
}

module.exports = numberToWords;
