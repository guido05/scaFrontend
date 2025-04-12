import {Component, OnInit} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

import { delay } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private router: Router,
              public translate: TranslateService){
      var userLang = navigator.language
      translate.addLangs(['EN', 'ES', 'PR']);

    }

  ngOnInit() {
      this.router.events.subscribe((evt) => {
      if (!(evt instanceof NavigationEnd)) {
        return;
      }
      window.scrollTo(0, 0);
    });
  }
}
