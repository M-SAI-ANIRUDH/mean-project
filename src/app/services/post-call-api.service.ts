import { Injectable } from '@angular/core';
import { postData } from '../models/post-data';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({providedIn:'root'})
export class postService {
    private posts : postData[] = [];
    private postsSubject = new Subject<postData[]>();

    constructor(public http: HttpClient){}
    
    getPosts() {
        // return [...this.posts];
        this.http.get<{message:string, posts:postData[]}>('http://localhost:3000/api/posts')
            .subscribe((postData) => {
                this.posts = postData.posts;
                this.postsSubject.next([...this.posts]);
            }
        );
    }

    getPostsSubject() {
        return this.postsSubject.asObservable();
    }

    addPost(singlePost : postData) {
        this.posts.push(singlePost);
        this.postsSubject.next(this.posts);
    }
}