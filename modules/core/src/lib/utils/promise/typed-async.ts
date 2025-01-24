export async function typedAsync<Type>(promise: any): Promise<Type> {
  return await promise;
}
