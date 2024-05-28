import { LogService } from './../../../services/log.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit {
  logs: any[] = [];
  filteredLogs: any[] = [];
  startDate: string = '';
  endDate: string = '';
  minDate: string = '';
  maxDate: string = '';

  constructor(private logService: LogService) { }

  ngOnInit(): void {
    this.getLogsMes();
  }

  async getLogsMes() {
    const data = await this.logService.getLogsMes().toPromise();
    this.logs = data;
    this.formatDates(this.logs);
    this.filteredLogs = [...this.logs];
    this.setMonthLimits();
   
  }

  async getAllLogs() {
    const data = await this.logService.getLogs().toPromise();
    this.logs = data;
    this.formatDates(this.logs);
    this.filteredLogs = [...this.logs];
    this.clearDateLimits();
 
  }

  formatDates(logs: any[]) {
    logs.forEach(log => {
      const date = new Date(log.fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      log.fecha = `${year}-${month}-${day}`;
    });
  }

  applyFilter() {
    this.filteredLogs = this.logs.filter(log => {
      const logDate = new Date(log.fecha).getTime();
      const start = this.startDate ? new Date(this.startDate).getTime() : null;
      const end = this.endDate ? new Date(this.endDate).getTime() : null;

      if (start && end) {
        return logDate >= start && logDate <= end;
      } else if (start) {
        return logDate >= start;
      } else if (end) {
        return logDate <= end;
      } else {
        return true;
      }
    });
  }

  setMonthLimits() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');

    this.minDate = `${year}-${month}-01`;
    this.maxDate = `${year}-${month}-${new Date(year, today.getMonth() + 1, 0).getDate()}`;
    this.startDate = this.minDate;
    this.endDate = this.maxDate;
  }

  clearDateLimits() {
    this.minDate = '';
    this.maxDate = '';
    this.startDate = '';
    this.endDate = '';
  }
}
