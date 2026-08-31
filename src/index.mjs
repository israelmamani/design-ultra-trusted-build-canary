import isNumber from 'is-number';

// Deliberately simple, deterministic, pure computation - no I/O, no
// environment reads, no timing dependence - so its output is identical on
// every run and every host.
export function classify(value) {
  return isNumber(value) ? 'number' : 'not-a-number';
}

export function sumIfNumbers(values) {
  return values
    .filter((value) => isNumber(value))
    .reduce((total, value) => total + Number(value), 0);
}
