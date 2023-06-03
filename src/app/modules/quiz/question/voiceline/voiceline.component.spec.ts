/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { VoicelineComponent } from './voiceline.component';

describe('VoicelineComponent', () => {
  let component: VoicelineComponent;
  let fixture: ComponentFixture<VoicelineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VoicelineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoicelineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
