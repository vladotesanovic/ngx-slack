import { Injectable, Injector } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { SlackUrlToken } from '../module';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/observable/of';

@Injectable()
export class FeedbackService {
  private slackUrlToken: string;
  constructor(private http: Http, private injector: Injector) {
    this.slackUrlToken = this.injector.get(SlackUrlToken);
  }

  notifySlack(slackObject: object) {

    const header = new Headers();
    header.append('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');

    return this.http.post(this.slackUrlToken,
      `payload=${ JSON.stringify(slackObject)}`, {
        headers: header
      })
      .map((test: Response) => {
        console.log(test);
        return Observable.of(test.text());
      });
  }
}
