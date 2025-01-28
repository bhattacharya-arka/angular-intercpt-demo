import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpBackend, HttpRequest } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: false,
  template: `
    <h1>Interceptor Demo</h1>
    <button (click)="makeRequest()">Make Intercepted Request</button>
    <p *ngIf="response">Intercepted Response status: {{ response.status }}</p>
    <p *ngIf="error">Intercepted Error: {{ error }}</p>
  `
})
export class AppComponent implements OnInit {
  response: any;
  error: any;
  private directHttp: HttpClient;

  constructor(
    private http: HttpClient,
    private handler: HttpBackend
  ) {
    // Create an HttpClient that bypasses interceptors
    this.directHttp = new HttpClient(handler);
  }

  ngOnInit() {
    // Original call without interceptors
    this.directHttp.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe({
        next: (res) => {
          console.log('Original response:', res);
        },
        error: (err) => {
          console.log('Original call error:', err.message);
        }
      });
  }

  makeRequest() {
    // Call with interceptors
    this.http.get('https://jsonplaceholder.typicode.com/todos/1')
      .subscribe({
        next: (res) => {
          this.response = res;
          this.error = null;
        },
        error: (err) => {
          this.error = err.message;
          this.response = null;
        }
      });
  }
}
