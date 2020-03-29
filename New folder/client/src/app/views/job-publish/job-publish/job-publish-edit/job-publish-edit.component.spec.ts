import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { JobPublishEditComponent } from './job-publish-edit.component';

describe('JobPublishEditComponent', () => {
  let component: JobPublishEditComponent;
  let fixture: ComponentFixture<JobPublishEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ JobPublishEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(JobPublishEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
