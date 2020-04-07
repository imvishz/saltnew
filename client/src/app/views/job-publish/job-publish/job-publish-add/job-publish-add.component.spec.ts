import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublishAddComponent } from './job-publish-add.component';

describe('JobPublishAddComponent', () => {
  let component: JobPublishAddComponent;
  let fixture: ComponentFixture<JobPublishAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPublishAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublishAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
