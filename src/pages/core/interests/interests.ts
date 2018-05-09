import { Component, ViewChild } from '@angular/core';
import { NavController, NavParams, Slides } from 'ionic-angular';

import { TabsPage } from '@pages/core/tabs/tabs';
import { ProfilePage } from '@pages/core/profile/profile';

import { User } from '@models/user.model';
import { Interest } from '@models/interest.model';

import { UserService } from '@services/user.service';

/**
 * Generated class for the InterestsPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@Component({
  selector: 'page-interests',
  templateUrl: 'interests.html',
})
export class InterestsPage {

  @ViewChild(Slides) slides: Slides;

  public userDetails: User = new User();
  public selectedInterests: Interest[] = [];

  public slideIndex = 0;

  public editMode: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserService) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad InterestsPage');
    this.slides.onlyExternal = true;
    let user: User = this.navParams.get('user');
    if (user != null) {
      this.userDetails = user;
      this.selectedInterests = user.interests;
      this.editMode = true;
    }
  }

  goToSlide(index: number) {
    this.slides.slideTo(index, 500);
    this.slideIndex = index;
  }

  onInterestsChanged(selectedInterests: Interest[]) {
    this.selectedInterests = selectedInterests;
  }

  submitInterests() {
    this.userDetails.interests = this.selectedInterests;
    this.userService.updateUserDetails(this.userDetails).subscribe(
      () => {
        console.log("User details updated successfully");
        this.navCtrl.setRoot(TabsPage, null, {animate: true, direction: 'forward'});
        if (this.editMode) {
          this.navCtrl.push(ProfilePage, {user: this.userDetails});
        }
      },
      () => {
        console.log("User details couldn't be updated");
      }
    );
  }

}
