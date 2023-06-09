/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { MultipleChoiceComponent } from './multipleChoice.component';

describe('MultipleChoiceComponent', () => {
  let component: MultipleChoiceComponent;
  let fixture: ComponentFixture<MultipleChoiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MultipleChoiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MultipleChoiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
