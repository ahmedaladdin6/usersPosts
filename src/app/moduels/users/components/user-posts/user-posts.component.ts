import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRouteSnapshot, ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/shared/services/post.service';
@Component({
  selector: 'app-user-posts',
  templateUrl: './user-posts.component.html',
  styleUrls: ['./user-posts.component.scss']
})
export class UserPostsComponent implements OnInit, OnDestroy {
  posts: any = [];
  userID: any;
  UserName: any;
  subscription: any;
  loadData: boolean = false;
  badRequest = false;
  constructor(
    private postServices: PostService,
    private route: ActivatedRoute,
    private router: Router) {


  }

  ngOnInit() {
    this.userID = this.route.snapshot.paramMap.get('UserId');
    this.UserName = this.route.snapshot.paramMap.get('name');
    this.getAllPostsOfUser();
  }
  viewPost(postId) {
    this.router.navigateByUrl(`posts/userName/${this.UserName}/userId/${this.userID}/postId/${postId}`)
  }

  //functions Call end points
  getAllPostsOfUser() {
    this.loadData = true;
    this.subscription = this.postServices.getAllposts(this.userID).subscribe(result => {
      this.posts = result;
      this.loadData = false;
    }, (err) => {
      console.log('err', err);
      this.loadData = false;
      this.badRequest = true;
      this.reloadPage();
    }, () => {
      this.subscription.unsubscribe();
      this.loadData = false;
    })
  }

  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
