import { Component, Input, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgIf, NgFor} from '@angular/common';
import { postData } from './../../models/post-data'
import { postService } from '../../services/post-call-api.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, NgFor, NgIf, HttpClientModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  panelOpenState = false;
  posts : postData[] = [];

  constructor(public postService : postService){}
  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.getPostsSubject()
      .subscribe((res)=>{
        this.posts = res
      })
  }

  deletePost(id : string) {
    this.postService.deletePost(id);
  }
}
