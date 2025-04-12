import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
//import {ToastData, ToastOptions, ToastyService} from 'ng2-toasty';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class MostrarNotificacionService {

  constructor(public toastyService: ToastrService, private translate: TranslateService) {
  }

  showSuccess(message, title) {
    this.translate.get(message).subscribe((translatedMessage: string) => {
        this.translate.get(title).subscribe((translatedTitle: string) => {
          this.toastyService.success(translatedMessage, translatedTitle);
        });
      }
    );
  }

  showError(message, title) {
    this.translate.get(message).subscribe((translatedMessage: string) => {
        this.translate.get(title).subscribe((translatedTitle: string) => {
          this.toastyService.error(translatedMessage, translatedTitle);
        });
      }
    );
  }

  showInfo(message, title) {
    this.translate.get(message).subscribe((translatedMessage: string) => {
      this.translate.get(title).subscribe((translatedTitle: string) => {
        this.toastyService.info(translatedMessage, translatedTitle);
      });
    }
  );
  }

  showWarning(message, title) {
    this.translate.get(message).subscribe((translatedMessage: string) => {
      this.translate.get(title).subscribe((translatedTitle: string) => {
        this.toastyService.warning(translatedMessage, translatedTitle);
      });
    }
  );
  }

  vacio(message): string {
    let dev: string = "";
    this.translate.get(message).subscribe((translatedMessage: string) => {
      dev = translatedMessage ;
      });
  return dev;
  }
}
