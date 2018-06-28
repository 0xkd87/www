/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiNavComponent } from './ui-nav.component';

describe('UiNavComponent', () => {
  let component: UiNavComponent;
  let fixture: ComponentFixture<UiNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
