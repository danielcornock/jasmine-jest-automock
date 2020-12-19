import { Type } from './interfaces/type';

export function autoMock<T>(ref: Type<T>): jasmine.SpyObj<T> {
  return jasmine.createSpyObj(
    ref.name,
    Object.getOwnPropertyNames(ref.prototype)
  );
}
