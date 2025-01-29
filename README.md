# Angular Interceptor Demo Project Documentation

---

## Overview
This Angular project demonstrates the use of HTTP interceptors to modify requests and responses. It includes:
1. Two interceptors that modify request URLs
2. A component that makes both original and intercepted HTTP calls
3. Clear separation of concerns between direct and intercepted requests

---

## Key Features
1. **Interceptors**:
   - `AcInterceptor`: Appends "ac" to request URLs
   - `DcInterceptor`: Appends "-dc" to request URLs
2. **Dual HTTP Calls**:
   - Direct call (bypasses interceptors)
   - Intercepted call (uses interceptors)
3. **Error Handling**:
   - Console logging for debugging
   - UI feedback for intercepted call results

---

## Code Structure

### 1. Interceptors
#### AcInterceptor
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const modifiedReq = req.clone({ url: req.url + 'ac' });
  console.log('AcInterceptor modified URL:', modifiedReq.url);
  return next.handle(modifiedReq);
}
```
- Appends "ac" to URL
- Logs modified URL

#### DcInterceptor
```typescript
intercept(req: HttpRequest<any>, next: HttpHandler) {
  const modifiedReq = req.clone({ url: req.url + '-dc' });
  console.log('DcInterceptor modified URL:', modifiedReq.url);
  return next.handle(modifiedReq);
}
```
- Appends "-dc" to URL
- Logs modified URL

---

### 2. AppComponent
#### Initialization
```typescript
private directHttp: HttpClient;

constructor(private http: HttpClient, private handler: HttpBackend) {
  this.directHttp = new HttpClient(handler);
}
```
- Creates direct HTTP client that bypasses interceptors

#### Original Call (ngOnInit)
```typescript
ngOnInit() {
  this.directHttp.get('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe({
      next: (res) => console.log('Original response:', res),
      error: (err) => console.log('Original call error:', err.message)
    });
}
```
- Makes direct HTTP GET request
- Logs response/error to console

#### Intercepted Call (Button Click)
```typescript
makeRequest() {
  this.http.get('https://jsonplaceholder.typicode.com/todos/1')
    .subscribe({
      next: (res) => this.response = res,
      error: (err) => this.error = err.message
    });
}
```
- Makes HTTP GET request through interceptors
- Updates UI with response/error

---

### 3. AppModule Configuration
```typescript
providers: [
  { provide: HTTP_INTERCEPTORS, useClass: AcInterceptor, multi: true },
  { provide: HTTP_INTERCEPTORS, useClass: DcInterceptor, multi: true }
]
```
- Registers interceptors with `multi: true`
- Ensures proper interceptor chaining

---

## Key Concepts

### 1. Interceptor Chain
- Request flows through interceptors in registration order
- Each interceptor can modify request/response
- Must call `next.handle()` to continue chain

### 2. Multi Providers
- `multi: true` allows multiple interceptors
- Required for HTTP_INTERCEPTORS token
- Without it, only last registered interceptor works

### 3. HttpBackend
- Bypasses interceptors
- Useful for direct API calls
- Accessed via dependency injection

---

## Usage

1. **Page Load**:
   - Makes direct API call
   - Logs original response to console

2. **Button Click**:
   - Makes intercepted API call
   - Shows result in UI
   - Logs modified URLs in console

---

## Error Handling

1. **Direct Call**:
   - Errors logged to console
   - Doesn't affect UI

2. **Intercepted Call**:
   - Errors shown in UI
   - Useful for user feedback

---

## Best Practices Demonstrated

1. **Separation of Concerns**:
   - Direct vs intercepted calls
   - Console vs UI feedback

2. **Interceptor Design**:
   - Immutable request modification
   - Proper chaining with next.handle()

3. **Error Handling**:
   - Different strategies for different contexts
   - Clear user feedback

---

## Expected Output

### Console
```bash
Original response: { ... }  # From direct call
AcInterceptor modified URL: .../todos/1ac
DcInterceptor modified URL: .../todos/1ac-dc
```

### UI
- Button to trigger intercepted call
- Displays:
  - Success: Response status
  - Error: Error message

---

This documentation provides a comprehensive overview of the project's architecture, implementation details, and key Angular concepts demonstrated. It serves as both a technical reference and KT material.
