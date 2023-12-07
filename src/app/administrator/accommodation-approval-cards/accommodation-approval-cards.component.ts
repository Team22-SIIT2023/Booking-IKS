import { Component, OnInit } from '@angular/core';
import { Accommodation } from 'src/app/accommodations/accommodation/model/model.module';
import { AccommodationsService } from 'src/app/accommodations/accommodations.service';

@Component({
  selector: 'app-accommodation-approval-cards',
  templateUrl: './accommodation-approval-cards.component.html',
  styleUrls: ['./accommodation-approval-cards.component.css']
})
export class AccommodationApprovalCardsComponent implements OnInit {


  accommdations: Accommodation[] =[];
  currentPage: number = 1;
  itemsPerPage: number = 5;
  clickedAccommodation: string='';
  
  constructor(private service: AccommodationsService) {
  }

  ngOnInit(): void {
    this.service.getUpdatedAndNew().subscribe({
      next:(data: Accommodation[]) => {
        this.accommdations = data
      },
      error: (_) => {console.log("Greska!")}
    })
  }

  onNewAccommodationClick(accommdations: Accommodation): void {
    this.clickedAccommodation = accommdations.id + " " + accommdations.name;
  }


  get paginatedAccommodations(): any[] {
    const startIndex = (this.currentPage - 1) * this.itemsPerPage;
    const endIndex = startIndex + this.itemsPerPage;
    return this.accommdations.slice(startIndex, endIndex);
  }

  onPageChange(pageNumber: number): void {
    this.currentPage = pageNumber;
    window.scrollTo({
      top: 0,
      behavior: 'auto'
    });
  }

  getPages(): number[] {
    const totalItems = this.accommdations.length;
    const totalPages = Math.ceil(totalItems / this.itemsPerPage);
    return Array.from({ length: totalPages }, (_, index) => index + 1);
  }
}
