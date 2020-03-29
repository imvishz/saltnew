import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublishViewComponent } from './job-publish-view.component';

describe('JobPublishViewComponent', () => {
  let component: JobPublishViewComponent;
  let fixture: ComponentFixture<JobPublishViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPublishViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublishViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
