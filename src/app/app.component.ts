import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private _router: Router, private route: ActivatedRoute) {

  }
  ngOnInit() {
    this.isDesktop();
  }

  isDesktop() {
    const isDesktop = window.innerWidth > 768;
    if (!isDesktop) {
      this._router.navigate(['mobile']);
    }
    return isDesktop;
  }
}
