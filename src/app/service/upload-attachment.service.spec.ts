import { TestBed } from '@angular/core/testing';

import { UploadAttachmentService } from './upload-attachment.service';

describe('UploadAttachmentService', () => {
  let service: UploadAttachmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UploadAttachmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
