import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CameraPreview, CameraPreviewPictureOptions } from '@ionic-native/camera-preview/ngx';
import { Platform } from '@ionic/angular';
import { Media, MediaObject } from '@ionic-native/media/ngx';
import { MediaCapture, MediaFile, CaptureError, CaptureImageOptions, CaptureVideoOptions, CaptureAudioOptions } from '@ionic-native/media-capture/ngx';
import { File, FileEntry } from '@ionic-native/file/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';
import { NativeStorage } from '@ionic-native/native-storage/ngx';
import { AndroidPermissions } from '@ionic-native/android-permissions/ngx';
import { Base64ToGallery, Base64ToGalleryOptions } from '@ionic-native/base64-to-gallery/ngx';
import { PhotoViewer } from '@ionic-native/photo-viewer/ngx';
import { ActivatedRoute, Router } from '@angular/router';

// import Wavesurfer from 'videojs-wavesurfer/dist/videojs.wavesurfer.js';
// import WaveSurfer from 'wavesurfer.js';
// import videojs from 'video.js';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})

export class HomePage implements OnInit {

  smallPreview: boolean;
  IMAGE_PATH: any;
  previewFile: any[];
  videoPath1: any = "/assets/audio/blue.mp4";
  colorEffect = 'none';
  setZoom = 1;
  flashMode = 'off';
  isToBack = false;
  // file: File;
  videoHasData = false;
  file: MediaObject;
  tracks: any;
  playing: boolean = true;




  constructor(
    private cameraPreview: CameraPreview,
    public platform: Platform,
    private media: Media,
    private mediaCapture: MediaCapture,
    private filePath: FilePath,
    private storage: NativeStorage,
    private androidPermissions: AndroidPermissions,
    private base64ToGallery: Base64ToGallery,
    private photoViewer: PhotoViewer,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    // private file: File,
  ) {

    this.tracks = [
      { title: 'test1', src: 'assets/audio/test1.mp3' },
      { title: 'test2', src: 'assets/audio/test2.mp3' },
      { title: 'test3', src: 'assets/audio/test3.mp3' },

    ]
  }




  ngOnInit() {

  }
  zoomImage(data) {
    // image.data = 'data:image/png;base64,iVBORw0K...';
    // let todecode = atob(data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    // let todecode = btoa(data.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    // var item_image = data.replace(/^data:image\/(png|jpg);base64,/, "") 
    console.log("zoomImage", data)
    this.photoViewer.show(data,'', { share: this.platform.is('android') });
  }
  zoomImage1(data) {
    this.photoViewer.show(data,'', { share: this.platform.is('android') });
    console.log(data)
  }
  allVideo() {
    this.router.navigate(['/all-video'])
  }

  doRefresh(event) {
    this.previewFile=null 
    console.log("Refresh event", event)
    console.log('Begin async operation');

    setTimeout(() => {
      console.log('Async operation has ended');
      event.target.complete();
    }, 2000);
  }

  public CValue: String;
  onChange(CValue) {
    console.log(CValue);
  }

  startCamera() {
    let options = {
      x: 0,
      y: 35,
      width: 400,
      height: 300,
      camera: this.cameraPreview.CAMERA_DIRECTION.BACK,
      toBack: false,
      tapPhoto: true,
      tapFocus: false,
      previewDrag: true,
      storeToFile: false,
      disableExifHeaderStripping: false

    };
    this.cameraPreview.startCamera(options);
  }

  stopCamera() {
    console.log('Stop camera is working')
    this.cameraPreview.stopCamera();
  }

  takePicture() {
    //   const options = {
    //     x: 0,
    //     y: 0,
    //     width: window.screen.width,
    //     height: window.screen.height,
    //     camera: this.cameraPreview.CAMERA_DIRECTION.FRONT, //or BACK
    //     toBack: true,
    //     tapPhoto: false,
    //     tapFocus: false,
    //     previewDrag: false,
    //     disableExifHeaderStripping: true
    // };

    // this.cameraPreview.startCamera(options);

    // let base64option : Base64ToGalleryOptions = {
    //     prefix: 'img',
    //     mediaScanner: false
    // };

    // this.cameraPreview.takePicture(options).then((base64PictureData) =>
    // {
    // let todecode = atob(base64PictureData);

    // this.base64ToGallery.base64ToGallery(btoa(todecode), base64option).then(
    //         res => alert('Saved image to gallery '+ JSON.stringify(res)),
    //         err => alert('Error saving image to gallery ' + JSON.stringify(err))
    //       );
    // }, error =>{
    //     alert(JSON.stringify(error));
    // });


    const pictureOpts: CameraPreviewPictureOptions = {
      width: 1280,
      height: 1280,
      quality: 85
    }

    // take a picture
    this.cameraPreview.takePicture(pictureOpts).then((imageData) => {
      this.IMAGE_PATH = 'data:image/jpeg;base64,' + imageData;
      this.base64ToGallery.base64ToGallery(imageData).then(
        res => console.log('Saved image to gallery ', res),
        err => console.log(err + '  ' + imageData)
      );
      //this.showAlert(this.picture)


    }, (err) => {
      console.log(err);
      // this.picture = 'assets/img/test.jpg';
    });


    // from this 

    //     let base64option : Base64ToGalleryOptions = {
    //       prefix: 'img',
    //       mediaScanner: true
    //   };

    //     this.cameraPreview.takePicture({
    //       width: 800,
    //       height: 800,
    //       quality: 85
    //     }).then((imageData) => {
    //       console.log("imageData", imageData)
    //       this.IMAGE_PATH = 'data:image/png;base64,' + imageData;
    //       let todecode = atob(imageData.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    //       // this.IMAGE_PATH = btoa(imageData);
    //       this.base64ToGallery.base64ToGallery(btoa(todecode), base64option).then(
    //         res => console.log('Saved image to gallery '+ JSON.stringify(res)),
    //         err => console.log('Error saving image to gallery ' + JSON.stringify(err))
    //       );
    // }, error =>{
    //     console.log(JSON.stringify(error));
    // });

    // to this

    //   this.IMAGE_PATH = 'data:image/png;base64,' + imageData;

    //   let base64option : Base64ToGalleryOptions = {
    //     prefix: 'img',
    //     mediaScanner: false
    // };
    //   let todecode = atob(this.IMAGE_PATH);

    //   this.base64ToGallery.base64ToGallery(btoa(todecode),base64option).then(
    //     res => console.log('Saved image to gallery ',res),
    //     err => console.log("base64ToGallery error",err)
    //   );
    // }, (err) => {
    //   console.log("error=", err);

    // });

    // this.base64ToGallery.base64ToGallery( this.IMAGE_PATH,{prefix:"_img",mediaScanner:true}).then(
    //   res => console.log('Saved image to gallery ', res),
    //   err => console.log('Error saving image to gallery ', err)
    // );
    this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
      result => console.log("Permissions granted", result.hasPermission),
      error => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE)
    );
    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.WRITE_EXTERNAL_STORAGE]);




  }

  switchCamera() {
    console.log('switch camera is working')
    this.cameraPreview.switchCamera();
  }

  changeFlashMode() {
    this.cameraPreview.setFlashMode(this.flashMode);
  }

  startRecord() {

    var opts = {
      CAMERA_DIRECTION: this.cameraPreview.CAMERA_DIRECTION.BACK,
      width: 300,
      height: 300,
      quality: 60,
      withFlash: false
    }

    console.log("start video recording")
    this.cameraPreview.startRecordVideo(opts).then((videoData) => {
      console.log("videoData", videoData)
      // this.videoPath = 'data:image/jpeg;base64,' + videoData;
    }, (err) => {
      console.log("error=", err);

    });
    // this.startCamera();

  }

  stopRecord() {
    console.log("stop video recording")
    this.cameraPreview.stopRecordVideo().then((videoData) => {
      console.log("videoData", videoData)
      if (this.platform.is('android')) {
        this.previewFile = (<any>window).Ionic.WebView.convertFileSrc('file://' + videoData);
        console.log("previewFile", this.previewFile)
        this.videoHasData = true;

      }
    }, (err) => {

      console.log('backgroundVideoStop err: ', err);

    });

  }
  deleteVideo() {
    console.log("deletevideo")
    if (this.previewFile) {
      this.previewFile = null;
      console.log("deletevideo worked")

    }


  }

  playAudio(filepath) {
    console.log("paly audio is working")
    console.log("filepath src", filepath)
    //  filepath = 'assets/audio/test1.mp3'


    if (this.platform.is('android')) {
      filepath = 'file:///android_asset/www/' + filepath;
    }
    console.log("filepath", filepath)
    this.file = this.media.create(filepath);
    this.file.onStatusUpdate.subscribe(status => console.log(status));
    console.log("file is=", this.file)

    this.file.onSuccess.subscribe(() => console.log('Action is successful'));


    this.file.onError.subscribe(error => console.log('some error!', error));

    this.file.play();
  }
  stopAudio() {
    console.log("stop music working")
    this.file.pause();
  }



  saveVideo() {
    this.storage.setItem('video', { property: this.previewFile })
      .then(
        () => {
          console.log('Stored video!');
        },
        error => {
          console.error('Error video', error);
        }
      );
    this.storage.getItem('video')
      .then(
        data => console.log(data),
        error => console.error(error)
      );

  }

  saveImage() {
    this.storage.setItem('image', { property: this.IMAGE_PATH })
      .then(
        () => {
          console.log('Stored image!');
        },
        error => {
          console.error('Error guardando la imagen', error);
        }
      );
    this.storage.getItem('image')
      .then(
        data => console.log(data),
        error => console.error(error)
      );

    // this.androidPermissions.checkPermission(this.androidPermissions.PERMISSION.CAMERA).then(
    //   result => console.log('Has permission?',result.hasPermission),
    //   err => this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.CAMERA)
    // );

    // this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.CAMERA, this.androidPermissions.PERMISSION.GET_ACCOUNTS]);

    this.androidPermissions
      .checkPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)
      .then(err =>

        this.androidPermissions.requestPermission(this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE)

      );

    this.androidPermissions.requestPermissions([this.androidPermissions.PERMISSION.READ_EXTERNAL_STORAGE]);
    console.log("permission checked")
  }



}


