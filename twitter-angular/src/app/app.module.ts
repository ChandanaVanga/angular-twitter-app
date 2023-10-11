import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from './auth.service';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TweetComponent } from './tweet/tweet.component';
import { AuthInterceptor } from './interceptors/auth-interceptor';
import { DateFormatPipe } from './date-format.pipe';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; // Import your interceptor
import { MatButtonModule } from '@angular/material/button';
import { TweetUpdateComponent } from './tweet-update/tweet-update.component';
import { TweetCreateComponent } from './tweet-create/tweet-create.component';
import { MatDialogModule } from '@angular/material/dialog';

const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  {path: 'tweet', component: TweetComponent},
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    TweetComponent,
    DateFormatPipe,
    TweetUpdateComponent,
    TweetCreateComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    {
      provide: AuthService
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor, // Add your interceptor class here
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
