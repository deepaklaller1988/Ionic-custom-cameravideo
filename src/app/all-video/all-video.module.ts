import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AllVideoPageRoutingModule } from './all-video-routing.module';

import { AllVideoPage } from './all-video.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AllVideoPageRoutingModule
  ],
  declarations: [AllVideoPage]
})
export class AllVideoPageModule {}
