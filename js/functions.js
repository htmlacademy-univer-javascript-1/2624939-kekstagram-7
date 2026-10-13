
export const checkStringLength = (string, maxLength) => string.length <= maxLength;

export const isPalindrome = (string) => {
  const normalizedString = string.toLowerCase().replaceAll(' ', '');
  let reversedString = '';

  for (let i = normalizedString.length - 1; i >= 0; i--) {
    reversedString += normalizedString[i];
  }

  return normalizedString === reversedString;
};
