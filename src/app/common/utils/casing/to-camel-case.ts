function snakeToCamel(str: string): string {
  return str.replace(/_([a-z])/g, (_, letter) => letter.toUpperCase());
}

export function toCamelCase<T>(obj: T): T {
  if (Array.isArray(obj)) {
    return obj.map((item) => toCamelCase(item)) as T;
  } else if (obj !== null && typeof obj === 'object') {
    return Object.keys(obj).reduce((acc, key) => {
      const newKey = snakeToCamel(key);
      (acc as any)[newKey] = toCamelCase((obj as any)[key]);
      return acc;
    }, {} as T);
  }
  return obj;
}
