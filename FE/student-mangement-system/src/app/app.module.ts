import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatTableModule} from "@angular/material/table";
import { StudentGridComponent } from './student-grid/student-grid.component';
import {MatPaginatorModule} from "@angular/material/paginator";
import {MatFormFieldModule} from "@angular/material/form-field";
import {StudentAddEditDialogComponent} from "./student-add-edit-dialog/student-add-edit-dialog.component";
import {MatDialog, MatDialogModule, MatDialogRef} from "@angular/material/dialog";
import { MatButtonModule } from '@angular/material/button';
import {ReactiveFormsModule} from "@angular/forms";
import {MatInputModule} from "@angular/material/input";
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import {ToastrModule} from "ngx-toastr";
import { LoginComponent } from './login/login.component';
import {MatCardModule} from "@angular/material/card";
import {TokenInterceptor} from "./public/token.interceptor";

@NgModule({
  declarations: [
    AppComponent,
    StudentGridComponent,
    StudentAddEditDialogComponent,
    ConfirmDialogComponent,
    LoginComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        MatTableModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        MatDialogModule,
        MatButtonModule,
        ReactiveFormsModule,
        ToastrModule.forRoot(),
        MatCardModule,
    ],
  providers: [MatDialog,{
    provide: HTTP_INTERCEPTORS,
    useClass: TokenInterceptor,
    multi: true,
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
