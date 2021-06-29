import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-all-video',
  templateUrl: './all-video.page.html',
  styleUrls: ['./all-video.page.scss'],
})
export class AllVideoPage implements OnInit {
  recordedVideo:any;
  videoHasData = false;

  constructor( private router: Router,
    public route: ActivatedRoute, 
    // private router: Router,
    ) 
  { 
    this.route.queryParams.subscribe((params) => {
      if(params && params.url){
        this.recordedVideo = params.url
      }
      console.log("recordedVideo",this.recordedVideo)
      this.recordedVideo = params;
    });
    this.videoHasData = true;
  }

  ngOnInit() {
  }

}
