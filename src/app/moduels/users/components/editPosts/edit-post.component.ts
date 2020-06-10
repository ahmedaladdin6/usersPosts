import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PostService } from 'src/app/core/shared/services/post.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {

  postId: string;
  update_supscription: Subscription;
  get_supscription: Subscription;
  userID: string;
  UserName: string;
  loadData: boolean = false;
  badRequest = false;
  
  userPostForm = new FormGroup({
    title: new FormControl(''),
    body: new FormControl('')
  })

  constructor(
    private route: ActivatedRoute,
    private postService: PostService,
    private router: Router) { }

  ngOnInit() {
    this.postId = this.route.snapshot.paramMap.get('postId');
    this.userID = this.route.snapshot.paramMap.get('userId');
    this.UserName = this.route.snapshot.paramMap.get('name');
    this.getPost();
  }

  // get title and body to use as shortcut in html 
  get title() { return this.userPostForm.get('title') }
  get body() { return this.userPostForm.get('body') }

  //call end point of post to get data which will be updated
  getPost() {
    this.loadData = true;
    this.get_supscription = this.postService.getPost(this.postId).subscribe((result: any) => {
      this.userPostForm.controls.title.setValue(result.title);
      this.userPostForm.controls.body.setValue(result.body);
    }, (err) => {
      console.log('err', err);
      this.loadData = false;
      this.badRequest = true;
      this.reloadPage();
    }, () => {
      this.get_supscription.unsubscribe()
      this.loadData = false;
    })
  }

  onSubmit() {
    this.loadData = true;
    this.update_supscription = this.postService.updatePost(this.postId, this.userPostForm.value).subscribe((result: any) => {
      console.log('updated');
      this.loadData = false;
    }, (err) => {
      console.log('err', err);
      this.loadData = false;
      this.badRequest = true;
      this.reloadPage()
    }, () => {
      this.update_supscription.unsubscribe();
      this.loadData = false;
      console.log('is updated');
      this.router.navigateByUrl(`posts/userName/${this.UserName}/userId/${this.userID}`)
    })
  }
  
  reloadPage() {
    setTimeout(() => {
      window.location.reload();
    }, 2000)
  }
}
