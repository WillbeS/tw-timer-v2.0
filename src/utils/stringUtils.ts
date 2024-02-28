export const generateId = (pre: string) => {
  return `${pre}_${new Date().getTime()}_${genRandomString(6)}`;
};

export const genRandomString = (length: number) => {
  var chars = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  var charLength = chars.length;
  var result = '';

  for (var i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * charLength));
  }

  return result;
};

export const truncate = (str: string, maxLength = 16) => {
  return str.length > maxLength ? str.slice(0, maxLength - 1) + '...' : str;
};

export function numberWithSeparator(num: number): string {
  let x = num.toString();
  var pattern = /(-?\d+)(\d{3})/;
  while (pattern.test(x)) x = x.replace(pattern, '$1.$2');

  return x;
}

// Merge 2 arrays of objects with generic types without duplicats (Chat GPT code)
type KeyOfType<T> = keyof T;

export function mergeArrays<T extends Record<string, any>>(
  arr1: T[],
  arr2: T[],
  key: KeyOfType<T>,
): T[] {
  const mergedMap = new Map(arr1.map((item) => [item[key], item]));

  for (const item of arr2) {
    if (!mergedMap.has(item[key])) {
      mergedMap.set(item[key], item);
    }
  }

  return Array.from(mergedMap.values());
}
