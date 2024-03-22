export function extractUUIDAndExtension(inputString: string): string {
  if (!inputString) {
    return '';
  }
  const parts = inputString.split('.');
  const extractedPart = `${parts[parts.length - 2]}.${parts[parts.length - 1]}`;
  return extractedPart;
}

// USAGE:
// const inputString = 'ops.printop.8e1e0c4c-7694-4d79-84cc-23db09868f16.pdf';
// const result = extractUUIDAndExtension(inputString);
// console.log(result); // Outputs: 8e1e0c4c-7694-4d79-84cc-23db09868f16.pdf
