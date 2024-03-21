import { Injectable } from '@angular/core';
import { postData } from './../models/post-data';
import { Subject } from 'rxjs';

@Injectable({providedIn:'root'})
export class postService {
    private posts : postData[] = [];
    private postsSubject = new Subject<postData[]>();
    getPosts() {
        // return [...this.posts];
        return this.postsSubject.asObservable();
    }

    addPost(singlePost : postData) {
        this.posts.push(singlePost);
        this.postsSubject.next(this.posts);
    }
}