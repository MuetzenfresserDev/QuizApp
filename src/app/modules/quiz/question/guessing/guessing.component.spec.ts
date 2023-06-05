/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GuessingComponent } from './guessing.component';

describe('GuessingComponent', () => {
  let component: GuessingComponent;
  let fixture: ComponentFixture<GuessingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GuessingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GuessingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
