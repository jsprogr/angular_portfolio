import { Component, OnInit } from '@angular/core';
import { AnalyticsService } from '../shared/services/analytcs.service';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements OnInit {

  constructor(private service: AnalyticsService) { }

  ngOnInit() {

  }

}
