import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {RequestStatus, ReservationRequest} from "../../accommodations/accommodation/model/model.module";
import {ReservationsService} from "../reservations.service";

@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.css']
})
export class RequestsViewComponent implements OnInit {
  requests: ReservationRequest[] = [];
  dataSource = new MatTableDataSource<ReservationRequest>([]); // Initialize with an empty array
  displayedColumns: string[] = ['timeSlot','price', 'accommodation','status','cancel'];

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;

  constructor(private service: ReservationsService) { }

  ngOnInit(): void {
    this.service.getAll(RequestStatus.WAITING).subscribe({
      next: (data: ReservationRequest[]) => {
        this.requests = data;
        this.dataSource = new MatTableDataSource<ReservationRequest>(this.requests);
        // @ts-ignore
        this.dataSource.paginator = this.paginator;
        // @ts-ignore
        this.dataSource.sort = this.sort;
      },
      error: (_) => {
        console.log("Error fetching data from ReservationsService");
      }
    });
  }
}
