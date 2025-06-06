import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConstQuestions } from 'src/app/constQuestions';

@Injectable({
  providedIn: 'root',
})
export class RequestDataService {
  private apiUrl = 'https://www.whiteboard.team/api/v1/boards';

  constructor(private http: HttpClient) {}

  getBoards(key: string) {
    const headers = new HttpHeaders({
      'Api-Key': key,
    });

    return this.http.get(this.apiUrl, { headers });
  }

  getBoard(key: string){
    const headers = new HttpHeaders({
      'Api-Key': key,
    });

    return this.http.get("https://www.whiteboard.team/api/v2/boards/345345345349", { headers });
  }

  //"345345345345"

  deleteBoardtest(apiKey: string){
    const url = 'https://www.whiteboard.team/api/v2/boards/345345345345';

    const headers = new HttpHeaders({
      'Api-Key': apiKey
    });

    this.http.delete(url, { headers: headers })
  .subscribe(
    response => {
      console.log('Erfolgreicher DELETE-Request:', response);
      // Hier können Sie den Response weiterverarbeiten
    },
    error => {
      console.error('Fehler beim DELETE-Request:', error);
      // Hier können Sie den Fehler behandeln
    }
  );

  }

  createBoardtest(apiKey: string) {
    const url = 'https://www.whiteboard.team/api/v2/boards';
    const newBoardId = '345345345349';

    // Definieren Sie den Header mit der API-Key und dem Content-Type
    const headers = new HttpHeaders({
      'Api-Key': apiKey,
      'Content-Type': 'application/json',
    });

    // Definieren Sie die Daten für den POST-Request
    const postData = {
      newId: newBoardId,
    };

    // Senden Sie den POST-Request mit HttpClient
    this.http.post<any>(url, postData, { headers: headers }).subscribe(
      (response) => {
        console.log('Erfolgreicher POST-Request:', response);
        // Hier können Sie den Response weiterverarbeiten
      },
      (error) => {
        console.error('Fehler beim POST-Request:', error);
        // Hier können Sie den Fehler behandeln
      }
    );
  }

  public patchData(url: string, body: any): Observable<any> {

    const headers = new HttpHeaders({
      'Client-ID': ConstQuestions.twitchAuth.clientId!, 
      'Authorization': `Bearer ${ConstQuestions.twitchAuth.oauthToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.patch(url,body,{headers})

  }

  public getData(url: string): Observable<any> {

    const headers = new HttpHeaders({
      'Client-ID': ConstQuestions.twitchAuth.clientId!, 
      'Authorization': `Bearer ${ConstQuestions.twitchAuth.oauthToken}`,
      'Content-Type': 'application/json',
    });

    const options = { headers };

    return this.http.get(url, options);
  }

  public postData(url: string, body: any): Observable<any> {

    const headers = new HttpHeaders({
      'Client-ID': ConstQuestions.twitchAuth.clientId!, 
      'Authorization': `Bearer ${ConstQuestions.twitchAuth.oauthToken}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(url,body,{headers});
  }


  public keepAlive(): Observable<any> {
    return this.http.get('https://geoguess.onrender.com/keepalive')
  }

  public keepAlive2(): Observable<any> {
    return this.http.get('https://buzzer-68tm.onrender.com/keepalive')
  }

}
