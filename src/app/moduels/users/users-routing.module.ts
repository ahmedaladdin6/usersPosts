import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditPostComponent } from './components/editPosts/edit-post.component';
import { UsersComponent } from './users.component';
import { UserPostsComponent } from './components/user-posts/user-posts.component';
import { DisplayPostComponent } from './components/display-post/display-post.component';


const routes: Routes = [{
  path: '', component: UsersComponent,
},
{
  path: 'posts/userName/:name/userId/:UserId', component: UserPostsComponent
},
{
  path: 'posts/userName/:name/userId/:userId/postId/:postId', component: DisplayPostComponent
},
{
  path: 'posts/userName/:name/userId/:userId/edit/postId/:postId', component: EditPostComponent
},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
