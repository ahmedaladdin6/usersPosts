import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/shared/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-display-post',
  templateUrl: './display-post.component.html',
  styleUrls: ['./display-post.component.scss']
})
export class DisplayPostComponent implements OnInit {
  title: string;
  body: string;
  postId: string;
  userName: string;
  userId;
  loadData = false;
  badRequest = false;
  subscription: Subscription
  UserName: string;
  userID: string;
  constructor(
    private postService: PostService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.UserName = this.route.snapshot.paramMap.get('name');
    this.userID = this.route.snapshot.paramMap.get('userId');
    this.displayPost();
  }

  editPost() {
    this.router.navigateByUrl(`posts/userName/${this.UserName}/userId/${this.userID}/edit/postId/${this.postId}`)
  }


  // call end point
  displayPost() {
    this.loadData = true;
    this.subscription = this.postService.getPost(this.postId).subscribe((result: any) => {
      this.title = result.title;
      this.body = result.body;
    }, (err) => {
      console.log('err', err);
      this.loadData = false;
      this.badRequest = true;
      this.reloadPage();
    }, () => {
      this.subscription.unsubscribe();
      this.loadData = false;
      this.badRequest = false;
    })
  }

  deletePost() {
    this.loadData = true;
    let subscription = this.postService.deletePost(this.postId).subscribe((result: any) => {
      console.log('delete', result);
    }, (err) => {
      console.log('err', err);
      this.loadData = false;
      this.badRequest = true;
      this.reloadPage();

    }, () => {
      subscription.unsubscribe();
      console.log('delete success');
      this.loadData = false;
      this.badRequest = false;
      this.router.navigateByUrl(`posts/userName/${this.UserName}/userId/${this.userID}`)
    })

  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  }


}
