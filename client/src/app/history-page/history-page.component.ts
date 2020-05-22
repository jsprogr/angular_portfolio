import { Component, OnInit, ViewChild, ElementRef, OnDestroy, AfterViewInit } from '@angular/core';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrdersService } from '../shared/services/orders.service';
import { Subscription } from 'rxjs';
import { Order, Filter } from '../shared/interfaces';


const STEP = 12

@Component({
  selector: 'app-history-page',
  templateUrl: './history-page.component.html',
  styleUrls: ['./history-page.component.scss']
})
export class HistoryPageComponent implements OnInit, OnDestroy, AfterViewInit {
  oSub: Subscription
  @ViewChild('tooltip', {static: false}) tooltipRef: ElementRef
  tooltip: MaterialInstance
  isFilterVisible = false
  filter: Filter = {}
  orders: Order[] = []
  offset = 0
  limit = STEP
  loading = false
  preloading = false
  noMoreOrders = false

  constructor(private ordersService: OrdersService) { }

  ngOnInit() {
    this.preloading = true
    this.fetch()
  }

  private fetch() {
    const params = Object.assign({}, this.filter,{
      offset: this.offset,
      limit: this.limit
    })
    this.oSub = this.ordersService.fetch(params).subscribe(
      orders => {
        this.orders = this.orders.concat(orders)
        this.noMoreOrders = orders.length < STEP
        this.loading = false
        this.preloading = false
      }
    )
  }

  loadMore() {
    this.offset += STEP
    this.loading = true
    this.fetch()
  }

  ngAfterViewInit() {
    this.tooltip = MaterialService.initTooltip(this.tooltipRef)
  }

  ngOnDestroy() {
    this.tooltip.destroy()
    if (this.oSub) {
      this.oSub.unsubscribe()
    }
  }

  applyFilter(filter: Filter) {
    this.orders = []
    this.offset = 0
    this.filter = filter
    this.preloading = true
    this.fetch()
  }

  isFiltered(): boolean {
    return Object.keys(this.filter).length !== 0
  }



}
