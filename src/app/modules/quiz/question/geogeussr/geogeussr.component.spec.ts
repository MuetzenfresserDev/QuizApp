/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { GeogeussrComponent } from './geogeussr.component';

describe('GeogeussrComponent', () => {
  let component: GeogeussrComponent;
  let fixture: ComponentFixture<GeogeussrComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GeogeussrComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GeogeussrComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
