import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {MatPaginator} from "@angular/material/paginator";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from "@angular/material/table";
import {RequestStatus, ReservationRequest} from "../../accommodations/accommodation/model/model.module";
import {ReservationsService} from "../reservations.service";
import {FormControl, FormGroup} from "@angular/forms";
import {MatOption} from "@angular/material/core";
import {DatePipe} from "@angular/common";


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

  @ViewChildren(MatOption) options: QueryList<MatOption> | undefined;
  selectedName: string ="";
  startDate:string="";
  endDate:string="";
  filterRequestsForm:FormGroup=new FormGroup({
    accommodationName:new FormControl(),
  });


  constructor(private service: ReservationsService) {
  }
  ngOnInit(): void {
   this.fetchData();
  }

  filterClicked() {
   this.fetchData();
  }
  fetchData(){
    this.service.getAll(RequestStatus.WAITING,this.selectedName,this.startDate,this.endDate).subscribe({
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
  onSelectionChange() {
    // @ts-ignore
    const selectedValue = this.filterRequestsForm.get('accommodationName').value;
    // @ts-ignore
    const selectedOption = this.options.find(option => option.value === selectedValue);

    if (selectedOption) {
      this.selectedName = selectedOption.viewValue;
    } else {
      console.log('Selected option not found');
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
}
