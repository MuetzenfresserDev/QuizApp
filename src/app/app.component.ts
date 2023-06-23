import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'quizApp';

  muted:boolean = true;

  ngOnInit(): void {
    //sessionStorage.clear();
  }

}
