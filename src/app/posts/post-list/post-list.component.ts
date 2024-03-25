import { Component, Input, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgIf, NgFor} from '@angular/common';
import { postData } from './../../models/post-data'
import { postService } from '../../services/post-call-api.service';
import { HttpClientModule } from '@angular/common/http';
import { MatButton } from '@angular/material/button';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import {MatProgressBarModule} from '@angular/material/progress-bar';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, NgFor, NgIf, HttpClientModule, MatButton, RouterLink, MatProgressBarModule],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  panelOpenState = false;
  posts : postData[] = [];
  postsFetched : boolean = false;

  constructor(public postService : postService, public router : ActivatedRoute){}
  ngOnInit(): void {
    this.postService.getPosts();
    this.postService.getPostsSubject()
      .subscribe((res)=>{
        this.posts = res;
        this.postsFetched = true;
      })
  }

  deletePost(id : string) {
    this.postService.deletePost(id);
  }

  updatePost(id : string) {
  }
}
