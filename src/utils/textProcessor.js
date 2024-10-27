export async function processText(text, averageFrequency) {
  const words = text.split(/\s+/);
  const processedWords = new Array(words.length);
  const eligibleIndices = words
    .map((word, index) => ({ word, index }))
    .filter(({ word }) => word.length > 2)
    .map(({ index }) => index);

  const totalReplacements = Math.floor(words.length / averageFrequency);
  const replacedIndices = new Set();

  // Shuffle the eligible indices to add randomness
  for (let i = eligibleIndices.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [eligibleIndices[i], eligibleIndices[j]] = [eligibleIndices[j], eligibleIndices[i]];
  }

  // Replace words randomly
  for (let i = 0; i < Math.min(totalReplacements, eligibleIndices.length); i++) {
    const index = eligibleIndices[i];
    processedWords[index] = `[${words[index]}]`;
    replacedIndices.add(index);
  }

  // Fill in the rest of the words
  words.forEach((word, index) => {
    if (!replacedIndices.has(index)) {
      processedWords[index] = word;
    }
  });

  return processedWords.join(' ');
}
