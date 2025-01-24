function camelToSnake(str: string): string {
  return str.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
}

export function toSnakeCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => toSnakeCase(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = camelToSnake(key);
      (acc as any)[newKey] = toSnakeCase((obj as any)[key]);
      return acc;
    }, {} as T);
  }
  return obj;
}
