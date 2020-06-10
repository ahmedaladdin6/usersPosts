import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './moduels/home/home.component';


const routes: Routes = [
  { 
    path:'',redirectTo:'home',pathMatch:'full'
  },
  { 
    path:'home',component:HomeComponent
  },
  {
    path: 'users', loadChildren: () =>
      import('./moduels/users/users.module').then((m) =>m.UsersModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
