import { postService } from '../../services/post-call-api.service';
import { Component, EventEmitter, Output } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm, ReactiveFormsModule,  FormControl,
    FormGroupDirective,
    Validators} from "@angular/forms";
import { postData } from "../../models/post-data";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import { NgIf } from '@angular/common';

@Component({
    selector: 'post-create-component',
    standalone: true,
    imports: [NgIf, FormsModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule],
    templateUrl: './post-create.component.html',
    styleUrl: './post-create.component.scss'
})

export class PostCreateComponent {
    postText : string = '';
    title: string = '';
    // @Output() singlePost = new EventEmitter<postData>();
    constructor(public postService: postService){}
    savePost(postForm:NgForm) {
        let  singlePost : postData = {};
        singlePost.id = null;
        singlePost.post = postForm.value.post;
        singlePost.title = postForm.value.title;
        // this.singlePost.emit(singlePost);
        this.postService.addPost(singlePost);
    }

}