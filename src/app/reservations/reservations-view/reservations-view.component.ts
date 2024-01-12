import {Component, OnInit, ViewChild} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {RequestStatus, ReservationRequest} from "../../accommodations/accommodation/model/model.module";
import {ReservationsService} from "../reservations.service";
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-reservations-view',
  templateUrl: './reservations-view.component.html',
  styleUrls: ['./reservations-view.component.css']
})
export class ReservationsViewComponent implements OnInit{
  requests: ReservationRequest[] = [];
  dataSource = new MatTableDataSource<ReservationRequest>([]); // Initialize with an empty array
  displayedColumns: string[] = ['timeSlot','price', 'accommodation','status','cancel'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private service: ReservationsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
   this.fetchData(); 
  }

  fetchData(){
    this.service.getAll(RequestStatus.ACCEPTED,"").subscribe({
      next: (data: ReservationRequest[]) => {
        this.requests = data;
        this.dataSource = new MatTableDataSource<ReservationRequest>(this.requests);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error: (_) => {
        console.log("Error fetching data from ReservationsService");
      }
    });
  }

  cancelReservation(reservation: ReservationRequest) {
    if (this.todayIsBeforeDeadline(reservation)) {
      this.service.cancel(reservation).subscribe(
        {
          next: (data: ReservationRequest) => {
            this.snackBar.open("Reservation canceled!", 'Close', {
              duration: 3000,
            });
            this.fetchData();

          },
          error: (_) => {
            this.snackBar.open("Reservation can't be canceled!", 'Close', {
              duration: 3000,
            });
          }
        });
    }
    else{
      this.snackBar.open("The deadline for canceling the reservation has expired.", 'Close', {
        duration: 3000,
      });
    }
  }

  todayIsBeforeDeadline(reservation: ReservationRequest): boolean {
    const daysBeforeDeadline = reservation.accommodation?.reservationDeadline;
    const reservationStartDate = reservation.timeSlot?.startDate;

    if (reservationStartDate && daysBeforeDeadline !== undefined) {
      const resultDate = new Date(reservationStartDate);
      resultDate.setDate(resultDate.getDate() - daysBeforeDeadline); // Subtract days from the date
      const today = new Date();

      return today < resultDate;
    }

    return false;
  }

}


