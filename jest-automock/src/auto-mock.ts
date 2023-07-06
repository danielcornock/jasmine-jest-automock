import { Type } from "./interfaces/type";

export function autoMock<T>(ref: Type<T>): jest.Mocked<T> {
  let next: Object = ref.prototype;
  const properties = [];

  do {
    const propertyNames = Object.getOwnPropertyNames(next);
    properties.push(...propertyNames);
    next = Object.getPrototypeOf(next);
    /* Loop until you've reached the last level of objects */
  } while (!Object.getOwnPropertyNames(next).includes("hasOwnProperty"));

  return properties.reduce((mockObj, propertyName) => {
    // @ts-ignore
    mockObj[propertyName] = jest.fn();

    return mockObj;
  }, {} as jest.Mocked<T>);
}
