import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublishComponent } from './job-publish.component';

describe('JobPublishComponent', () => {
  let component: JobPublishComponent;
  let fixture: ComponentFixture<JobPublishComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPublishComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublishComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
