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


@Component({
  selector: 'app-requests-view',
  templateUrl: './requests-view.component.html',
  styleUrls: ['./requests-view.component.css']
})
export class RequestsViewComponent implements OnInit {
  requests: ReservationRequest[] = [];
  dataSource = new MatTableDataSource<ReservationRequest>([]); // Initialize with an empty array
  displayedColumns: string[] = ['timeSlot','price', 'accommodation','status', 'guest','report', 'cancel'];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  guest:User;
  host:Host;
  startDate:string="";
  endDate:string="";
  userId:number;
  statusOptions: string[]=[];
  filterRequestsForm:FormGroup=new FormGroup({
    accommodationName:new FormControl(),
    requestStatus:new FormControl()
  });

  constructor(private service: ReservationsService,private userService:UserService, private snackBar: MatSnackBar) {
  }

  ngOnInit(): void {

    const hostId=this.userService.getUserId();
    this.userService.getUser(hostId).subscribe(
        (data) => {
          this.host=data;
          console.log(this.host)
        },
        (error) => {
          console.error('Error fetching guest:', error);
        });


      this.statusOptions=Object.values(RequestStatus).map(item => String(item));
      this.fetchData();
  }

  filterClicked() {
   this.fetchData();
  }

  fetchData(){
    this.userId=this.userService.getUserId();
    const selectedName=<string>this.filterRequestsForm.value.accommodationName;
    const selectedStatus=<RequestStatus>this.filterRequestsForm.value.requestStatus;
    if(this.userService.getRole()=="ROLE_GUEST"){
      this.service.getAllForGuest(this.userId,selectedStatus,selectedName,this.startDate,this.endDate).subscribe({
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

    }else if(this.userService.getRole()=="ROLE_HOST"){
      const selectedName=<string>this.filterRequestsForm.value.accommodationName;
      const selectedStatus=<RequestStatus>this.filterRequestsForm.value.requestStatus;
      this.service.getAllForHost(this.userId,selectedStatus,selectedName,this.startDate,this.endDate).subscribe({
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
  }

  getFormatedDate(date: Date, format: string) {
    const datePipe = new DatePipe('en-US');
    return datePipe.transform(date, format);
  }

  dateRangeChange(dateRangeStart: HTMLInputElement, dateRangeEnd: HTMLInputElement) {
    // @ts-ignore
    this.startDate=this.getFormatedDate(new Date(dateRangeStart.value),"yyyy-MM-dd");
    // @ts-ignore
    this.endDate=this.getFormatedDate(new Date(dateRangeEnd.value),"yyyy-MM-dd");
  }
  //promeniti na drugi nacin kao sto je kod accommodations-view za datume


  public reportGuest(guestId: number) {
    this.userService.getUser(guestId).subscribe(
        (data) => {
          this.guest=data;

          this.userService.reportGuest(this.host.id, this.guest).subscribe(
              (data) => {
                this.snackBar.open("Comment is created", 'Close', {
                  duration: 3000,
                });
              },
              (error) => {
                this.snackBar.open("Comment is created", 'Close', {
                  duration: 3000,
                });
                console.error('Error fetching guest:', error);
              });
        },
        (error) => {
          console.error('Error fetching guest:', error);
        });
  }
}
