# jasmine-automock

This package allows you to automock the methods on a class instance. Mostly useful when using dependency injection, but can come in useful when mocking the return of a factory too. Works perfectly with Angular testing.

## Usage

Import using:

```typescript
import { autoMock } from 'jasmine-automock';
```

Create a mock using:

```typescript
let mockClass: jasmine.spyObj<ClassConstructor> = autoMock(ClassConstructor);
```

This will create a jasmine spy object using the instance methods on the class that you pass in, allowing you to check that those methods have been called, as well as mocking what they should return.

If using TypeScript, the `autoMock` function returns a `jasmine.spyObj<T>` type, with `T` being the class that you passed in. This allows you to access all of the class methods, as well as the mocking methods that appear on a mocked function.

For a more detailed example (using Angular), see below:

## Example

```typescript
import { autoMock } from 'jasmine-automock';

/* Consumer of default angular http client - class that we are testing */
@Injectable()
class TodoHttpService {
  constructor(private httpClient: HttpClient) {}

  public getAllTodos() {
    return this.httpClient.get('api-url/todos');
  }
}

/* Test suite */
describe('TodoHttpService', () => {
  let service: TodoHttpService, mockHttpClient: jasmine.spyObj<HttpClient>;

  beforeEach(() => {
    /* We can mock angular services too! */
    mockHttpClient = autoMock(HttpClient);

    TestBed.configureTestingModule({
      providers: [{ provide: HttpClient, useValue: mockHttpClient }]
    });

    service = TestBed.inject(HttpService);
  });

  describe('getAllTodos', () => {
    let result;

    beforeEach(() => {
      mockHttpClient.get.and.returnValue('todos');
      result = service.getAllTodos();
    });

    it('should fetch the todos', () => {
      expect(mockHttpClient.get).toHaveBeenCalledWith('api-url/todos');
    });

    it('should return the todos', () => {
      expect(result).toBe('todos');
    });
  });
});
```
