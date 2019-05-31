import { Injectable } from '@angular/core';
import { FirestoreService } from './firestore.service';
import { ToastService } from './toast.service';
import { ImageService } from './image.service';
import { DeviceHandler } from '../handler/device.handler';
import { PWAHandler } from '../handler/pwa.handler';
import { RouteHandler } from '../handler/route.handler';
import { WindowHandler } from '../handler/window.handler';


@Injectable({
  providedIn: 'root'
})
export class CoreService {

  constructor(public firestore: FirestoreService , public toast: ToastService,
              public image: ImageService, private device: DeviceHandler,
              private pwa: PWAHandler, public route: RouteHandler,
              private window: WindowHandler ) {
  }

}
