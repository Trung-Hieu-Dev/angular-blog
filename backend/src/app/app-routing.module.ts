import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// components
import { DashboardComponent } from './dashboard/dashboard.component';
import { CategoriesComponent } from './categories/categories.component';
import { AllPostComponent } from './posts/all-post/all-post.component';
import { NewPostComponent } from './posts/new-post/new-post.component';
import { LoginComponent } from './auth/login/login.component';
import { AuthGuardService } from './services/auth-guard.service';
import { SubscribersComponent } from './subcribers/subscribers.component';
import { ContactComponent } from './contact/contact.component';

const routes: Routes = [
  { path: '', component: DashboardComponent, canActivate: [AuthGuardService] },
  { path: 'login', component: LoginComponent },
  {
    path: 'categories',
    component: CategoriesComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'posts',
    component: AllPostComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'posts/new',
    component: NewPostComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'subscriber',
    component: SubscribersComponent,
    canActivate: [AuthGuardService],
  },
  {
    path: 'contact',
    component: ContactComponent,
    canActivate: [AuthGuardService],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
