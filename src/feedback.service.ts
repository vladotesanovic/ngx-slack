import { Inject, Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SlackUrlToken } from './ngx-slack.module';

import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class FeedbackService {
  constructor(private http: Http, @Inject(SlackUrlToken) private slackUrlToken) {}

  notifySlack(slackObject: object) {

    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(this.slackUrlToken,
      `payload=${ JSON.stringify(slackObject)}`, {
        headers: header
      })
      .map((test: Response) => {
        return Observable.of(test.text());
      })
  }
}
