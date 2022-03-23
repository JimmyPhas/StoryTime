import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Story } from '../models/story/story.model';
import { Event } from '../models/event/event.model';
import { Action } from '../models/action/action.model';


const baseUrl = 'http://localhost:8080/api'

@Injectable({
  providedIn: 'root'
})
export class StoryService {

  constructor(private http: HttpClient) { }
  getAllStories(): Observable<Story[]> {
    return this.http.get<Story[]>(`${baseUrl}/storylist`);
  }
  findByTitle(title: any): Observable<Story[]> {
    return this.http.get<Story[]>(`${baseUrl}?title=${title}`);
  }
  getEventID(eventText: any): Observable<Event[]> {
    return this.http.get<Event[]>(`${baseUrl}/create?event_text=${eventText}`);
  }
  getAllEvents(): Observable<Event[]> {
    return this.http.get<Event[]>(baseUrl);
  }
  getAllActions(): Observable<Action[]> {
    return this.http.get<Action[]>(baseUrl);
  }

  get(id: any): Observable<Story> {
    return this.http.get(`${baseUrl}/details/${id}`);
  }
  
  createStory(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }
  createEvent(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }
  createAction(data: any): Observable<any> {
    return this.http.post(`${baseUrl}/create`, data);
  }

  update(id: any, data: any): Observable<any> {
    return this.http.put(`${baseUrl}/${id}`, data);
  }

  delete(id: any): Observable<any> {
    return this.http.delete(`${baseUrl}/${id}`);
  }
  deleteAll(): Observable<any> {
    return this.http.delete(baseUrl);
  }

}
