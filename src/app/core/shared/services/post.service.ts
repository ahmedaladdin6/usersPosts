import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  headers: {
    "Content-type": "application/json; charset=UTF-8"
  }

  constructor(private http:HttpClient) { }

  getAllposts(userID){
    return this.http.get(environment.BASE_URL+`posts?userId=${userID}`)
  }
  getPost(id){
    return this.http.get(environment.BASE_URL+`posts/${id}`)
  }
  deletePost(id){
    return this.http.delete(environment.BASE_URL+`posts/${id}`)
  }
  updatePost(id,payload){
    return this.http.patch(environment.BASE_URL+`posts/${id}`,payload,{headers:this.headers})
  }
}
