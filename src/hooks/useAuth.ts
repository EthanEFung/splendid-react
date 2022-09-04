
class MockAuthenticationService {
  public id: number | undefined;
  constructor() {
    this.id = 1;
  }
  get authenticated() {
    return false
  }
  get authorized() {
    return typeof this.id === 'number'
  }
  static of() {
    return new MockAuthenticationService()
  }
}

function useAuth(fetcher: () => Promise<unknown>) {
  return MockAuthenticationService.of()
}

export default useAuth;