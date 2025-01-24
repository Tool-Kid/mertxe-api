type ClassProperties<T> = {
  [K in keyof T as T[K] extends Function ? never : K]: T[K];
};

export function toDto<Class>(
  toClass: new () => Class,
  props: ClassProperties<Class>
) {
  return props;
}
