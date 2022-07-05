import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  constructor(private http: HttpClient) { }

  addDocument(document: any): Observable<any> {
    let jwt = localStorage.getItem('jwt');;
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    return this.http.post<any>("http://localhost:8080/document/add", document, { headers: httpHeaders });
  }

  public getDocuments(): Observable<any[]> {
    let jwt = localStorage.getItem('jwt');
    let tokenStr = 'Bearer ' + jwt;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization', tokenStr)
    return this.http.get<any[]>("http://localhost:8080/document/all", { headers, responseType: 'json' });
  }
  public deleteDocument(id: number): Observable<any> {
    let jwt = localStorage.getItem('jwt');
    let tokenStr = 'Bearer ' + jwt;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization', tokenStr)
    return this.http.delete<any>(`http://localhost:8080/document/delete/${id}`, { headers, responseType: 'json' });
  }

  /**
   * updtaeDocFile
   */
  public updtaeDocFile(id: number, file: File): Observable<any> {
    let jwt = localStorage.getItem('jwt');
    jwt = "Bearer " + jwt;
    let httpHeaders = new HttpHeaders({ "Authorization": jwt })
    const formData: FormData = new FormData();
    formData.append('doc', file);
    formData.append('doc_id', id.toString());
    return this.http.put<any>(`http://localhost:8080/document/updateDoc`, formData, { headers: httpHeaders });

  }

  /**
   * getDocumentById
   */
  public getDocumentById( id : Number) {
    let jwt = localStorage.getItem('jwt');
    let tokenStr = 'Bearer ' + jwt;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization', tokenStr)
    return this.http.get<any>(`http://localhost:8080/document/find/${id}`, { headers, responseType: 'json' });
  }

  /**
   * updateDocument
   */
  public updateDocument(doc : any , id : Number) {
    
    let jwt = localStorage.getItem('jwt');
    let tokenStr = 'Bearer ' + jwt;
    console.log("token : " + jwt);
    let headers = new HttpHeaders().set('Authorization', tokenStr)
    return this.http.put<any>(`http://localhost:8080/document/update/${id}`,doc , { headers, responseType: 'json' });
  }
}
