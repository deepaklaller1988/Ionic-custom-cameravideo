import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { CameraPreview } from '@ionic-native/camera-preview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { File } from '@ionic-native/file/ngx';
import { MediaCapture } from '@ionic-native/media-capture/ngx';
import { Media } from '@ionic-native/media/ngx';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
// import { IonicStorageModule } from '@ionic/storage-angular';
// import { IonicStorageModule } from '@ionic/storage';
import { Base64ToGallery } from '@ionic-native/base64-to-gallery/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,
    // IonicStorageModule.forRoot()
  ],
  providers: [CameraPreview,
    Media,
    MediaCapture,
    File, 
    FilePath,
    NativeStorage,
    AndroidPermissions,
    Base64ToGallery,
    PhotoViewer,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy }],
  bootstrap: [AppComponent],
})
export class AppModule {}
