import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ErrorService {
  private error_list: string[] = [];

  get errors() {
    return this.error_list;
  }

  addError(message: string) {
    this.error_list.push(message);
  }

  clearError() {
    this.error_list = [];
  }
}
