import { Component, ChangeDetectionStrategy, ChangeDetectorRef, Inject, Input } from '@angular/core';
import { FeedbackService } from './feedback.service';
import { SlackUrlToken } from './ngx-slack.module';

import 'rxjs/add/operator/catch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngx-slack-feedback',
  template: `<ng-container *ngIf="slackUrlToken"><div class="main" [ngClass]="{'hidden': closed, 'visible': !closed}">
      <form #f="ngForm" (submit)="sendFeedback(f.value)" *ngIf="!sent">
          <div class="content results">
              <textarea ngModel name="feedback" required rows="6" class="search-form--input" [placeholder]="placeholder"></textarea>
          </div>
          <div class="content action">
              <button [disabled]="!f.valid || sending" class="btn"><ng-container *ngIf="!sending">{{buttonText}}</ng-container><ng-container *ngIf="sending">{{buttonTextSending}}</ng-container></button>
          </div>
      </form>
      <div class="content message" *ngIf="sent">
          <p>{{successMessage}}</p>
      </div>
  </div>

  <button (click)="toggle()" [ngClass]="{'closed': closed, 'open': !closed}" class="hs-beacon"></button>
  </ng-container>
  <ng-container *ngIf="!slackUrlToken">No Slack URL provided</ng-container>
  `,
  styles: [`.hs-beacon {
  border: 0;
  border-radius: 100%;
  bottom: 12px;
  display: block!important;
  cursor: pointer;
  height: 54px;
  opacity: 1;
  outline: 0;
  position: fixed;
  z-index: 12;
  left: 12px;
  text-indent: -9000px;
  transition: all .2s ease-out;
  width: 54px;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: 30px;
  box-shadow: 0 2px 5px 0 rgba(0,0,0,.26);
}

.closed {
  background-color: #ef494f;
  background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADwAAAA8CAMAAAANIilAAAAA3lBMVEUAAAD////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////ymXGKAAAASXRSTlMAAQIFBwoPEBIUFRscHR8jKCkqLC0/Q0RGSEpNUFFXYHFzeXp9gIKFjKCjpamwvL7Aw8bIy8zN0NLT1dja3ODk5ujq7PT19/3+6Nyy9QAAAklJREFUeAGl1/1W4jwQBvAHBapi0erLK7XsKmLxAyp+SBEVAUXluf8b2ibHnqUk0LT7+3+anJlpMoGe1Wh3B9MZOZsOuu2GBWN2q//NhO9+y4YJtzenxrznIs1xyJXCY6xTDfhj3Gl6jm1ZtuM1O2P+CKpY6eST0sh3kOD4I0qfJ9ArXVG6cwtQFNw7SlclaGzdU3ipY4X6C4X7LSh2n2VN/CJWKvqygs+7yroydlLDWrWJjF5auyT3PKwgRWUod17CIpmrhzJSlR9k1hI1kuuWYaAs116oWFXUd1KBkcpE1LuKWCDyXIOhmsh5gB/HjPgw5jMS93koeqMIY0XRLSEkl5E6Mqgz4kLoiX5G7PKLy74usUT0eQ8Rex5/RviPOodIcknObQAtkqNCtuDCiGQLQF+mOtu2ZcL7gCWq5uCvTWvZJhSO6AwLDZJjZDYm2UCbZAeZdUi20SXZRGZNkl0MSHrIzCM5wFTmKzOH5BQzkjbWlkpXMZvkDIxYgNIkKb1iMfJPwXm3vc2ImjC1w3SNdkDyPW+pXJJPeZvklGSQtz2vSV7k/THeSDaUX9LMPiM7usNALY7ijGSYdgwdQqvwSvJcPQCNgo8Y2VOPXqNt35C81R36m2pPaRf28l03eCQ53Mh30ZXkwrmu2Ph3VC9382BlrMgXrA405sHqKGUerA5x5sHq+GgebDy4/v/IBZlG5qMbJpgP6/tnr0z6MHkmbB+4p9dvXPbxO+sDZehZsYxPI956G/keZQzP95BGfQ7y/Sm4+LUDrT+vKBtiP2phEAAAAABJRU5ErkJggg==);
}

.open {
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADgAAAA4CAYAAACohjseAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAANBJREFUeNrs2zEKwkAQheHsFmltBO+W2tZL6Fls1INJtBCxS3B9IVNI+p3A8A882K2GL7sQmJBUSmkca6Mk5eXVMDvi9spDeSoHr6bJ8QTvys7WbzvNUMBloxTtiq5SAAECBAgQIECAAAECBAgQIECAAAFWAbbKWRmbebRXK8uq2Ws0UzvNRTvbRKwuB7+mecJdlKsyBIINZroxuuc1ARAgQIAAAQIECBAgQIAAAQIECBDgisD+b/2JCDw28zeDr3LyapqcfyvY2kPtvRr+BBgAr3dW/fZtoWAAAAAASUVORK5CYII=) center center no-repeat #9a9c9d;
  background-size: 30px;
  border-radius: 0 100% 100%;
  -webkit-transform: rotate(45deg);
  -moz-transform: rotate(45deg);
  -ms-transform: rotate(45deg);
  -o-transform: rotate(45deg);
}

.search-form--input {
  border: 0;
  outline: none;
  box-sizing: border-box;
  color: #333;
  font-size: 14px;
  font-weight: 400;
  line-height: 18px;
  padding: 10px 60px 0 25px;
  width: 100%;
  -webkit-appearance: none;
}

.main,
.searchbox {
  bottom: 60px;
  z-index: 11;
  outline: 0;
  opacity: 0;
  position: fixed;
  max-width: 450px;
  left: 10px;
  transition: opacity .2s ease-out,bottom .2s ease-out;
  visibility: visible!important;
  width: 92%;
}

.main.visible,
.searchbox.visible {
  bottom: 70px;
  opacity: 1;
}

.main.hidden,
.searchbox.hidden {
  display: none;
}

textarea {
  resize: none;
}

.main {
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 0 1px rgba(76,86,103,.25), 0 2px 18px rgba(31,37,50,.32);
  -moz-box-shadow: 0 0 1px rgba(76,86,103,.25),0 2px 18px rgba(31,37,50,.32);
  -webkit-box-shadow: 0 0 1px rgba(76,86,103,.25), 0 2px 18px rgba(31,37,50,.32);
  outline: 0;
  overflow: hidden;
}

.btn {
  color: #fff;
  float: right;
  font-size: 13px;
  outline: 0;
  padding: 10px 30px;
  right: 0;
  background-color: #ef494f;
  border: none;
  border-radius: 4px;
  display: inline-block;
  margin: 5px;
}  
.btn[disabled] {
  cursor: not-allowed;
  opacity: .65;
  filter: alpha(opacity=65);
  box-shadow: none;
}

.content.action {
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #e6e6e6;
  width: 100%;
}

.content.message {
  text-align: center;
  padding: 40px 0;
  background: #fff;
  box-sizing: border-box;
  border-top: 1px solid #e6e6e6;
  width: 100%;
}
`]
})
export class FeedbackComponent {
  closed = true;
  sent = false;
  sending = false;

  @Input() placeholder = 'Enter your feedback or question here';
  @Input() successMessage = 'Thank you for your Feedback!';
  @Input() buttonText = 'Send a Message';
  @Input() buttonTextSending = 'Sending..';
  @Input() messageTitle = 'Feedback from NgxSlack';
  @Input() closeAfter = 2000;

  constructor(private fb: FeedbackService, private cd: ChangeDetectorRef, @Inject(SlackUrlToken) public slackUrlToken) {}

  toggle() {
    this.closed = !this.closed;

    if (this.sent) {
      this.sent = false;
    }
  }

  sendFeedback(data: { feedback: string }) {

    this.sending = true;

    const slackObject = {
      text: data.feedback,
      'attachments': [
        {
          'title': this.messageTitle,
        },
      ]
    };

    this.fb.notifySlack(slackObject)
      .catch((data) => {
        console.error('Unable to send message. Is URL correct?');
        this.updateComponent();
        return data;
      })
      .subscribe(() => {
        this.updateComponent();
      });
  }

  private updateComponent() {
    this.sent = true;
    this.sending = false;
    this.cd.markForCheck();
    setTimeout(() => {
      this.closed = true;
      this.cd.markForCheck();
    }, this.closeAfter);
  }
}
