import {
  Component, ChangeDetectionStrategy, ChangeDetectorRef, Input,
  Injector, OnInit
} from '@angular/core';
import { FeedbackService } from '../service/feedback.service';
import { SlackUrlToken } from '../module';

import 'rxjs/add/operator/catch';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'ngx-slack-feedback',
  templateUrl: './feedback.component.html',
  styleUrls: ['./feedback.component.css']
})
export class FeedbackComponent implements OnInit {
  closed = true;
  sent = false;
  sending = false;
  slackUrlToken: string;

  @Input() placeholder = 'Enter your feedback or question here';
  @Input() successMessage = 'Thank you for your Feedback!';
  @Input() buttonText = 'Send a Message';
  @Input() buttonTextSending = 'Sending..';
  @Input() messageTitle = 'Feedback from NgxSlack';
  @Input() closeAfter = 2000;

  constructor(
    private fb: FeedbackService,
    private cd: ChangeDetectorRef,
    private injector: Injector) {}

  ngOnInit() {
    this.slackUrlToken = this.injector.get(SlackUrlToken);
  }

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
      .catch((slackData: any) => {
        console.error('Unable to send message. Is URL correct?');
        this.updateComponent();
        return slackData;
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
