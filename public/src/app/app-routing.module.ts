import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';



const routes: Routes = [
    {path: 'home', component: HomeComponent},
    {path: 'create', component: CreateComponent},
    {path: 'edit/:id', component: EditComponent},
    {path: '', pathMatch: 'full', redirectTo: "/home"}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
