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
  startDate: string='';
  endDate: string='';

  constructor(private LogService: LogService) { }

  ngOnInit(): void {
    this.getLog();
  }

  async getLog() {
    const data = await this.LogService.getLogs().toPromise();
    this.logs = data;
    this.logs.forEach(log => {
      const date = new Date(log.fecha);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      log.fecha = `${year}-${month}-${day}`;
    });
    this.filteredLogs = [...this.logs];
    console.log(this.logs);
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
}
