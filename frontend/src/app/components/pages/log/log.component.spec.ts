import { ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { LogService } from './../../../services/log.service';
import { LogComponent } from './log.component';
import { HeaderComponent } from '../../partials/header/header.component';
import { FormsModule } from '@angular/forms';

class MockLogService {
  getLogsMes() {
    return of([
      { fecha: '2023-05-01T00:00:00Z', log: 'Log 1' },
      { fecha: '2023-05-02T00:00:00Z', log: 'Log 2' }
    ]);
  }

  getLogs() {
    return of([
      { fecha: '2023-04-01T00:00:00Z', log: 'Log 1' },
      { fecha: '2023-04-02T00:00:00Z', log: 'Log 2' },
      { fecha: '2023-05-01T00:00:00Z', log: 'Log 3' },
      { fecha: '2023-05-02T00:00:00Z', log: 'Log 4' }
    ]);
  }
}

describe('LogComponent', () => {
  let component: LogComponent;
  let fixture: ComponentFixture<LogComponent>;
  let logService: MockLogService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogComponent, HeaderComponent ],
      imports: [ FormsModule ],
      providers: [
        { provide: LogService, useClass: MockLogService }
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LogComponent);
    component = fixture.componentInstance;
    logService = TestBed.inject(LogService);
    fixture.detectChanges();
  });

  afterEach(() => {
    if (component.intervalId) {
      clearInterval(component.intervalId);
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
 
  it('should apply filter based on date range', fakeAsync(() => {
    component.logs = [
      { fecha: '2023-04-01', log: 'Log 1' },
      { fecha: '2023-04-02', log: 'Log 2' },
      { fecha: '2023-05-01', log: 'Log 3' },
      { fecha: '2023-05-02', log: 'Log 4' }
    ];
    component.startDate = '2023-04-01';
    component.endDate = '2023-04-30';
    component.applyFilter();
    tick(); // Simula el paso del tiempo
    fixture.detectChanges();

    expect(component.filteredLogs.length).toBe(2);
    expect(component.filteredLogs[0].fecha).toBe('2023-04-01');
    expect(component.filteredLogs[1].fecha).toBe('2023-04-02');
  }));

  it('should clear the interval on destroy', () => {
    const intervalId = setInterval(() => {}, 1000);
    component.intervalId = intervalId;
    spyOn(window, 'clearInterval');
    component.ngOnDestroy();
    expect(window.clearInterval).toHaveBeenCalledWith(intervalId);
  });
});
