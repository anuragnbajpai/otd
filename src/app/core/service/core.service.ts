import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { SnackbarService } from './snackbar.service';
import { ImageService } from './image.service';
import { DeviceHandler } from '../handler/device.handler';
import { PWAHandler } from '../handler/pwa.handler';
import { RouteHandler } from '../handler/route.handler';
import { WindowHandler } from '../handler/window.handler';
import { LoginService } from './login.service';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(public firestore: FirestoreService , public login: LoginService , public snackbar: SnackbarService,
              public image: ImageService, private device: DeviceHandler,
              private pwa: PWAHandler, public route: RouteHandler,
              private window: WindowHandler ) {
  }

}
