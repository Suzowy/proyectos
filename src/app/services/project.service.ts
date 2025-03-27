import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Project } from './../models/project';
import { Global } from "./global";

@Injectable(
  {providedIn: 'root'}
)
export class ProjectService {
  public url: string;

  constructor(public _http: HttpClient) {
    this.url = Global.url;
  }

  testService() {
    return 'probando el servicio de angular'
  }

  saveProject(project: Project): Observable<any> {
    let params = JSON.stringify(project);
    let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.post(`${this.url}/save-project`, params, { headers: headers });
  }

  getProjects(): Observable<any> {
    const timestamp = new Date().getTime();
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this._http.get(`${this.url}/projects?nocache=${timestamp}`, { headers: headers });
  }


  getProject(id: any): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.get(`${this.url}/project/${id}`, { headers: headers });
	}

  deleteProject(id: string): Observable<any>{
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.delete(`${this.url}/project/${id}`, { headers: headers });
	}

	updateProject(project: { _id: string; }): Observable<any>{
		let params = JSON.stringify(project);
		let headers = new HttpHeaders().set('Content-Type', 'application/json');

    return this._http.put(`${this.url}/project/${project._id}`, params, { headers: headers });
	}
}
