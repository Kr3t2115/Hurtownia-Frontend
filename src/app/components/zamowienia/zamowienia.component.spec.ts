import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ZamowieniaComponent } from './zamowienia.component';

describe('ZamowieniaComponent', () => {
  let component: ZamowieniaComponent;
  let fixture: ComponentFixture<ZamowieniaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ZamowieniaComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ZamowieniaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
