import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RequestDataService {

  private apiUrl = 'https://www.whiteboard.team/api/v1/boards';

  constructor(private http: HttpClient) { }

  getBoards(key: string) {
    const headers = new HttpHeaders({
      'Api-Key': key
    });

    return this.http.get(this.apiUrl, { headers });
  }
}
