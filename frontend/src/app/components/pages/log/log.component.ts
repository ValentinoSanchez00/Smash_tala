import { Router } from '@angular/router';
import { LogService } from './../../../services/log.service';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.css']
})
export class LogComponent implements OnInit, OnDestroy {
  logs: any[] = [];
  filteredLogs: any[] = [];
  startDate: string = '';
  endDate: string = '';
  minDate: string = '';
  maxDate: string = '';
  intervalId: any;
  showingAllLogs: boolean = false;

  constructor(private logService: LogService, private Router: Router) { }

  ngOnInit(): void {
    this.comprobar();
    this.getLogsMes();
    this.startInterval(this.getLogsMes.bind(this), 5000);
  }

  ngOnDestroy(): void {
    this.clearInterval();
  }

  comprobar(){
    let isLoaded = sessionStorage.getItem('isLoad');
    console.log(isLoaded);

    if(isLoaded === null || isLoaded === 'false') {
      this.Router.navigate(['/home']);
    }
    else{
      let user= JSON.parse(sessionStorage.getItem('user')! || '{}');
      if(user.rol != 2){
        this.Router.navigate(['/home']);
      }
    }

  }
  startInterval(callback: Function, interval: number) {
    this.clearInterval();
    this.intervalId = setInterval(callback, interval);
  }

  pauseInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  clearInterval() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
      this.intervalId = null;
    }
  }

  async getLogsMes() {
    this.pauseInterval();
    const data = await this.logService.getLogsMes().toPromise();
    this.logs = data;
    this.formatDates(this.logs);
    this.filteredLogs = [...this.logs];
    this.setMonthLimits();
    this.showingAllLogs = false;
    this.startInterval(this.getLogsMes.bind(this), 5000);
  }

  async getAllLogs() {
    this.pauseInterval();
    const data = await this.logService.getLogs().toPromise();
    this.logs = data;
    this.formatDates(this.logs);
    this.filteredLogs = [...this.logs];
    this.clearDateLimits();
    this.showingAllLogs = true;
    this.startInterval(this.getAllLogs.bind(this), 5000);
  }

  toggleLogs() {
    if (this.showingAllLogs) {
      this.getLogsMes();
    } else {
      this.getAllLogs();
    }
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
    this.pauseInterval();
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
