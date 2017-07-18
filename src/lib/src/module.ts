import { InjectionToken, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpModule } from '@angular/http';
import { FormsModule } from '@angular/forms';

import { FeedbackComponent } from './component/feedback.component';
import { FeedbackService } from './service/feedback.service';

export const SlackUrlToken = new InjectionToken<string>('SlackUrlToken');

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpModule
  ],
  declarations: [
    FeedbackComponent
  ],
  providers: [
    FeedbackService
  ],
  exports: [FeedbackComponent]
})
export class NgxSlackModule {

  /**
   * Initialize NgxSlack
   *
   * @param slackUrl Slack Webhook URL or any URL that accept POST and object { text: '...' }
   * @returns {{ngModule: NgxSlackModule, providers: [{provide: InjectionToken<string>, useValue: string}]}}
   */
  static initializeApp(slackUrl: string) {
    return {
      ngModule: NgxSlackModule,
      providers: [
        { provide: SlackUrlToken, useValue: slackUrl }
      ]
    };
  }
}
