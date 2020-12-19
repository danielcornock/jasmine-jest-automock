import { Type } from './interfaces/type';

export function autoMock<T>(ref: Type<T>): jest.Mocked<T> {
  return Object.getOwnPropertyNames(ref.prototype).reduce(
    (mockObj, propertyName) => {
      // @ts-ignore
      mockObj[propertyName] = jest.fn();

      return mockObj;
    },
    {} as jest.Mocked<T>
  );
}
