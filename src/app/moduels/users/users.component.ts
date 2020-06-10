import { Component, OnInit, OnDestroy } from '@angular/core';
import { UserService } from 'src/app/core/shared/services/user.service';
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit ,OnDestroy{
  posts :any = [];
  users:any =[];
  subscription: any;
  loadData: boolean =false;
  badRequest =false;
  constructor(
    private userServices : UserService) { }

  ngOnInit() {
    this.getAllUsers();
  }
 
   // functions to call end points
   getAllUsers(){
    this.loadData =true;
    this.subscription =this.userServices.getAllUsers().subscribe(result=>{
      this.users =result;
      this.loadData =false;
    },(err)=>{
      console.log('err',err);
      this.loadData =false;
      this.badRequest =true;
      this.reloadPage();
    },()=>{
      this.subscription.unsubscribe();
      this.loadData =false;
    })
  }

  reloadPage(){
    setTimeout(()=>{
      window.location.reload();
    },2000)
  }
 
  ngOnDestroy(){
    this.subscription.unsubscribe();
  }
}
