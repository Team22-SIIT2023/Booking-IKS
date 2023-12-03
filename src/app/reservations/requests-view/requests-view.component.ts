import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";

export interface Request {
  timeSlot: string;
  price: number;
  guest: string;
  accommodation: string;
  guestNumber: number;
  status: string;
}

const STATIC_REQUESTS: Request[] = [
  { timeSlot: '2023-02-01', price: 150, guest: 'Jane Smith', accommodation: 'Hotel B', guestNumber: 1, status: 'Approved' },
  { timeSlot: '2023-02-01', price: 150, guest: 'Jane Smith', accommodation: 'Hotel B', guestNumber: 1, status: 'Approved' },
  { timeSlot: '2023-01-01', price: 100, guest: 'John Doe', accommodation: 'Hotel A', guestNumber: 2, status: 'Pending' },
  { timeSlot: '2023-02-01', price: 150, guest: 'Jane Smith', accommodation: 'Hotel B', guestNumber: 1, status: 'Approved' },
];
@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.css']
})
export class RequestsViewComponent implements OnInit{

  columnDisplayNames: { [key: string]: string } = {
    timeSlot: 'Dates',
    price: 'Price',
    guest: 'Guest',
    accommodation: 'Accommodation',
    guestNumber: 'Guest Number',
    status: 'Request Status',
    delete: 'Delete',
  };
  displayedColumns: string[] = ['timeSlot', 'price', 'guest', 'accommodation', 'guestNumber', 'status','delete'];
  dataSource = new MatTableDataSource<Request>(STATIC_REQUESTS);
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  @ViewChild(MatSort) sort: MatSort | undefined;


  ngOnInit() {
    // @ts-ignore
    this.dataSource.paginator = this.paginator;
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.dataSource.sort = this.sort;
  }

}
