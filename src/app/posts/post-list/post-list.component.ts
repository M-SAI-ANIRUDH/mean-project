import { Component, Input, OnInit } from '@angular/core';
import {MatExpansionModule} from '@angular/material/expansion';
import {NgIf, NgFor} from '@angular/common';
import { postData } from './../../models/post-data'
import { postService } from '../../services/post-call-api-service';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [MatExpansionModule, NgFor, NgIf],
  templateUrl: './post-list.component.html',
  styleUrl: './post-list.component.css'
})
export class PostListComponent implements OnInit{
  panelOpenState = false;

  posts : postData[] = [];

  constructor(public postService : postService){}
  ngOnInit(): void {
    this.postService.getPosts()
      .subscribe((res)=>{
        this.posts = res
      })
  }
}
