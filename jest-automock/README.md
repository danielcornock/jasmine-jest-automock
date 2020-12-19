# jest-automock

This package allows you to automock the methods on a class instance. Mostly useful when using dependency injection, but can come in useful when mocking the return of a factory too.

## Usage

Import using:

```typescript
import { autoMock } from 'jest-automock';
```

Create a mock using:

```typescript
let mockClass = autoMock(ClassConstructor);
```

This will replace all of the instance methods on the class provided with jest mocks, allowing you to check that those methods have been called, as well as mocking what they should return.

For a more detailed example, see below:

```typescript
import { autoMock } from 'jest-automock';

class HttpClient {
  get(url) {
    // Real implementation here
  }
}

class TodoHttpService {
  constructor(private httpClient: HttpClient) {}

  public getAllTodos() {
    return this.httpClient.get('api-url/todos');
  }
}

describe('TodoHttpService', () => {
  let service: TodoHttpService, mockHttpClient: jest.Mocked<HttpClient>;

  beforeEach(() => {
    mockHttpClient = autoMock(HttpClient);
    mockHttpClient.get.mockReturnValue('todos');
    service = new TodoHttpService(mockHttpClient);
  });

  describe('getAllTodos', () => {
    let result;

    beforeEach(() => {
      service.getAllTodos();
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
