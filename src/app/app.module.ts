import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material';
import { LayoutModule } from '@angular/cdk/layout';
import { QuizModule } from './modules/quiz/quiz.module';
import { DialogService } from './services/dialog/dialog.service';
import { SnackbarService } from './services/snackbar/snackbar.service';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    LayoutModule,
    QuizModule
  ],
  providers: [
    DialogService,
    SnackbarService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
