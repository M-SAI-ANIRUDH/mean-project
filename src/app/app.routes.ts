import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';

import { PostListComponent } from './posts/post-list/post-list.component';
import { PostCreateComponent } from './posts/posts-create/post-create.component';

export const routes: Routes = [
    {
        path: '',
        component: PostListComponent
    },
    {
        path: 'create',
        component: PostCreateComponent
    }
];

// @NgModule({
//     imports: [RouterModule.forChild(routes)],
//     exports: [RouterModule]
// })
// export class AppRoutingModule {}