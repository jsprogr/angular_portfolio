import { Component, ViewChild, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Chart } from 'chart.js'
import { AnalyticsService } from '../shared/services/analytcs.service';
import { AnalyticsPage } from '../shared/interfaces';

@Component({
  selector: 'app-analytics-page',
  templateUrl: './analytics-page.component.html',
  styleUrls: ['./analytics-page.component.scss']
})
export class AnalyticsPageComponent implements AfterViewInit, OnDestroy {

  aSub: Subscription
  @ViewChild('gain', {static: false}) gainRef: ElementRef
  @ViewChild('order', {static: false}) orderRef: ElementRef

  average: number
  pending = true

  constructor(private service: AnalyticsService) { }

  ngAfterViewInit() {
    const gainConfig: any = {
      label: 'Выручка',
      color: 'rgb(255, 99, 132)'
    }

    const orderConfig: any = {
      label: 'Заказы',
      color: 'rgb(54, 164, 235)'
    }

    this.aSub = this.service.getAnalytics().subscribe((data: AnalyticsPage) => {
      this.average = data.average

      gainConfig.labels = data.chart.map( item => item.label)
      gainConfig.data = data.chart.map( item => item.gain)

      orderConfig.labels = data.chart.map( item => item.label)
      orderConfig.data = data.chart.map( item => item.order)

      const gainCtx = this.gainRef.nativeElement.getContext('2d')
      const orderCtx = this.orderRef.nativeElement.getContext('2d')
      gainCtx.canvas.height = '300px'
      orderCtx.canvas.height = '300px'

      new Chart(gainCtx, createChartConfig(gainConfig))
      new Chart(orderCtx, createChartConfig(orderConfig))

      this.pending = false
    })
  }

  ngOnDestroy() {
    if (this.aSub) this.aSub.unsubscribe()
  }

}

function createChartConfig({labels, data, label, color}) {
  return {
    type: 'line',
    options: {
      responsive: true
    },
    data: {
      labels,
      datasets: [
        {
          label, data,
          borderColor: color,
          steppedLine: false,
          fill: false
        }
      ]
    }
  }
}
