/* tslint:disable:no-unused-variable */
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { UiUserinfo1Component } from './ui-userinfo1.component';

describe('UiUserinfo1Component', () => {
  let component: UiUserinfo1Component;
  let fixture: ComponentFixture<UiUserinfo1Component>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UiUserinfo1Component ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UiUserinfo1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
