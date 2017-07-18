import { TestBed, inject } from '@angular/core/testing';

import { FeedbackService } from './feedback.service';

describe('Feedback Service', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FeedbackService]
    });
  });

  it('should create service', inject([FeedbackService], (service: FeedbackService) => {
    expect(service).toBeTruthy();
  }));

  it('should post message to slack', inject([FeedbackService], (service: FeedbackService) => {
    // expect(service.getMeaning()).toBe(42);
  }));
});
