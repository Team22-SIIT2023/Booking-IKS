import {Component, OnInit, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {
  RequestStatus,
  ReservationRequest
} from "../../accommodations/accommodation/model/model.module";
import {ReservationsService} from "../reservations.service";
import {FormControl, FormGroup} from "@angular/forms";
import {DatePipe} from "@angular/common";
import {UserService} from "../../account/account.service";
import {Host, User} from "src/app/account/model/model.module";
import {MatSnackBar} from "@angular/material/snack-bar";
import {of} from "rxjs";


@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.css']
})
export class RequestsViewComponent implements OnInit {
  requests: ReservationRequest[] = [];
  dataSource = new MatTableDataSource<ReservationRequest>([]); // Initialize with an empty array
  displayedColumns: string[] = [];
  numberOfCancellations: number;

  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  guest: User;
  host: Host;
  startDate: string = "";
  endDate: string = "";
  userId: number;
  role: string;
  statusOptions: string[] = [];
  filterRequestsForm: FormGroup = new FormGroup({
    accommodationName: new FormControl(),
    requestStatus: new FormControl()
  });

  constructor(private requestService: ReservationsService, private userService: UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    this.role = this.userService.getRole();
    this.userId = this.userService.getUserId();
    if (this.role == "ROLE_HOST") {

      const hostId = this.userService.getUserId();
      this.userService.getUser(hostId).subscribe(
        (data) => {
          this.host = data;
          console.log(this.host)
        },
        (error) => {
          console.error('Error fetching guest:', error);
        });

      this.displayedColumns = ['timeSlot', 'price', 'guest', 'report', 'cancellations', 'accommodation', 'status', 'accept', 'deny']
    } else {
      this.displayedColumns = ['timeSlot', 'price', 'host', 'accommodation', 'status', 'delete']
    }
    this.statusOptions = Object.values(RequestStatus).map(item => String(item));
    this.fetchData();
  }

  filterClicked() {
    this.fetchData();
  }

  fetchData() {
    const selectedName = this.filterRequestsForm.value.accommodationName;
    const selectedStatus = <RequestStatus>this.filterRequestsForm.value.requestStatus;
    if (this.role == "ROLE_GUEST") {
      this.requestService.getAllForGuest(this.userId, selectedStatus, selectedName, this.startDate, this.endDate).subscribe({
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

    } else if (this.role == "ROLE_HOST") {
      const selectedName = this.filterRequestsForm.value.accommodationName;
      const selectedStatus = <RequestStatus>this.filterRequestsForm.value.requestStatus;
      this.requestService.getAllForHost(this.userId, selectedStatus, selectedName, this.startDate, this.endDate).subscribe({
        next: (data: ReservationRequest[]) => {
          this.requests = data;
          this.getCancellationsForGuest();
          this.dataSource = new MatTableDataSource<ReservationRequest>(this.requests);
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        error: (_) => {
          console.log("Error fetching data from ReservationsService");
        }
      });
    }
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // @ts-ignore
    this.startDate = this.getFormatedDate(new Date(dateRangeStart.value), "yyyy-MM-dd");
    // @ts-ignore
    this.endDate = this.getFormatedDate(new Date(dateRangeEnd.value), "yyyy-MM-dd");
  }


  public reportGuest(guestId: number) {
    this.userService.getUser(guestId).subscribe(
      (data) => {
        this.guest = data;

        this.userService.reportGuest(this.host.id, this.guest).subscribe(
          (data) => {
            this.snackBar.open("Guest is reported!", 'Close', {
              duration: 3000,
            });
          },
          (error) => {
            this.snackBar.open("You can't report guest!", 'Close', {
              duration: 3000,
            });
          });
      },
      (error) => {
        console.error('Error fetching guest:', error);
      });
  }

  deleteRequest(request: ReservationRequest) {
    //the guest deletes the request if request status is pending
    if (request.status == RequestStatus.PENDING) {
      this.requestService.delete(request.id).subscribe(
        {
          next: (data: ReservationRequest) => {
            this.snackBar.open("Request deleted!", 'Close', {
              duration: 3000,
            });
            this.fetchData();
          },
          error: (_) => {
            this.snackBar.open("Request can't be deleted!", 'Close', {
              duration: 3000,
            });
          }
        });
    }
  }

  private getCancellationsForGuest() {
    for (const request of this.requests) {
      // @ts-ignore
      this.requestService.getCancellations(request.guest.id).subscribe({
        next: (data: number) => {
          // @ts-ignore
          request.guest.cancellations = data;
        },
        error: (_) => {
          console.log("Error fetching cancellation count for a guest from ReservationsService");
        }
      });
    }
  }
}
