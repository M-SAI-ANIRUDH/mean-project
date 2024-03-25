import { postService } from '../../services/post-call-api.service';
import { Component, EventEmitter, OnInit, Output } from "@angular/core";
import {MatProgressBarModule} from '@angular/material/progress-bar';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { FormsModule, NgForm, ReactiveFormsModule,  FormControl,
    FormGroupDirective,
    Validators,
    FormGroup} from "@angular/forms";
import { postData } from "../../models/post-data";
import {MatFormFieldModule} from '@angular/material/form-field';
import {ErrorStateMatcher} from '@angular/material/core';
import { NgIf } from '@angular/common';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
    selector: 'post-create-component',
    standalone: true,
    imports: [NgIf, FormsModule, HttpClientModule, MatInputModule, ReactiveFormsModule, MatButtonModule, MatCardModule, MatFormFieldModule, MatProgressBarModule],
    templateUrl: './post-create.component.html',
    styleUrl: './post-create.component.scss'
})

export class PostCreateComponent implements OnInit {
    postText : string = '';
    title: string = '';
    id: string = '';
    postForm : FormGroup;
    mode : string = 'create';
    editmodeFetched : boolean = false;
    imageURL: string;
    // @Output() singlePost = new EventEmitter<postData>();
    constructor(public postService: postService, public route : ActivatedRoute, public router : Router){}

    ngOnInit() {
        this.postForm = new FormGroup({
            id : new FormControl(''),
            title : new FormControl('', [Validators.required, Validators.minLength(3)]),
            content : new FormControl('', [Validators.required, Validators.minLength(5)]),
            image : new FormControl(null, [Validators.required])
        })
        this.route.paramMap.subscribe((params: ParamMap) => {
            if(params.has('id')) {
                this.mode = 'edit'
                const postId = params.get('id');
                // this.post.title = params.get('title') || '';
                // this.post.content = params.get('content') || '';
                this.postService.getPost(postId?.toString() || '')
                    .subscribe(res => {
                        this.editmodeFetched = true;
                        this.postForm.setControl('id', new FormControl(res.post._id));
                        this.postForm.setControl('title', new FormControl(res.post.title));
                        this.postForm.setControl('content', new FormControl(res.post.content));
                        console.log(this.postForm.value)
                    })
            }
            else {
                this.mode = 'create'
            }
        })
    }

    savePost() {
        let  singlePost : postData = {
            id : this.postForm.value.id,
            content : this.postForm.value.content,
            title : this.postForm.value.title
        };
        if(this.mode === 'create') {
            this.postService.sendPost(singlePost);
        } else {
            this.postService.updatePost(singlePost);
        }
    }

    filePicked(event : Event) {
        const file = (event.target as HTMLInputElement).files[0];
        this.postForm.patchValue({image : file});
        this.postForm.get('image').updateValueAndValidity();
        const reader = new FileReader();
        reader.onload = () => {
            this.imageURL = reader.result as string;
        }
        reader.readAsDataURL(file);
    }

}