import { Injectable } from '@angular/core';
import { postData } from '../models/post-data';
import { Subject, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({providedIn:'root'})
export class postService {
    private posts : postData[] = [];
    private postsSubject = new Subject<postData[]>();

    constructor(public http: HttpClient, public router : Router){}
    
    getPost(postId : string) {
        return this.http.get<any>('http://localhost:3000/api/posts/'+postId);
    }

    getPosts() {
        // return [...this.posts];
        this.http.get<{message:string, posts:any}>('http://localhost:3000/api/posts')
            .pipe(map(postData => {
                return postData.posts.map((post: any) => {
                    return {
                        id : post._id,
                        title : post.title,
                        content : post.content
                    }
                })
            }))
            .subscribe((transformedPostData) => {
                this.posts = transformedPostData;
                this.postsSubject.next([...this.posts]);
            }
        );
    }

    deletePost(id : string) {
        this.http.delete('http://localhost:3000/api/posts'+id)
            .subscribe(res => {
                const updatedPosts = this.posts.filter(post => post.id != id);
                this.posts = updatedPosts;
                this.postsSubject.next(this.posts);
            }
        )
    }

    updatePost(post: postData) {
        this.http.put('http://localhost:3000/api/posts/'+post.id, post)
            .subscribe((res:any)=> {
                console.log(res.message);
                this.router.navigate([''])
            })
    }

    sendPost(postData : postData) {
        const post: postData = { id:'', title: postData.title, content: postData.content };
        this.http.post('http://localhost:3000/api/posts', post)
            .subscribe((res :any ) => {
                console.log(res);
                const updatedPost = {
                    id : res.postId,
                    title : post.title,
                    content : post.content
                }
                this.posts.push(updatedPost);
                this.postsSubject.next(this.posts);
                this.router.navigate([''])
            }
        )
    }

    getPostsSubject() {
        return this.postsSubject.asObservable();
    }
}