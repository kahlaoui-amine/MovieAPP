import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LocalService {
  constructor() {}

  private storageSub = new Subject<String>();

  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  public saveData(key: string, value: string) {
    localStorage.setItem(key, value);
    this.storageSub.next('changed');
  }

  public getData(key: string) {
    return localStorage.getItem(key);
  }
  public removeData(key: string) {
    localStorage.removeItem(key);
    this.storageSub.next('changed');
  }

  public clearData() {
    localStorage.clear();
    this.storageSub.next('changed');
  }
}
