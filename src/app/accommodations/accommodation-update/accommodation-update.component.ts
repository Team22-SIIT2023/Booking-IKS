import { DatePipe } from '@angular/common';
import { Component, Host } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AmenityService } from 'src/app/amenity/amenity.service';
import { Amenity, Address, TimeSlot, PriceListItem, CreateAccommodation, Accommodation, Image, AccommodationType } from '../accommodation/model/model.module';
import { AccommodationsService } from '../accommodations.service';
import { CommentAndGrade } from 'src/app/administrator/comments-and-grades/model/model.module';

@Component({
  selector: 'app-accommodation-update',
  templateUrl: './accommodation-update.component.html',
  styleUrls: ['./accommodation-update.component.css']
})

export class AccommodationUpdateComponent {
  accommodation: Accommodation | undefined;
  events: string[] = [];
  selectedAmenities: Amenity[]=[];
  allAmenities2: Amenity[] = []
  submitted: boolean =false;

  constructor(private root:ActivatedRoute,private accommodationService: AccommodationsService, private router: Router,
              private amenityService: AmenityService,
              private fb: FormBuilder) {
  }
  

  updateAccommodationFormGroup = this.fb.group({
    name: ['',[Validators.required]],
    city: ['',[Validators.required]],
    country: ['',[Validators.required]],
    address: ['',[Validators.required]],
    description: ['',[Validators.required]],
    minGuests: [0,[Validators.required]],
    maxGuests: [0,[Validators.required]],
    deadline: [0,[Validators.required]],
    checkPrice: new FormControl(),
    checkReservation: new FormControl(),
    selectType: ['',[Validators.required]]
  });

  ngOnInit(): void {
    this.root.params.subscribe((params) =>{
      const id=+params['id']
      this.accommodationService.getAccommodation(id).subscribe({
        next:(data:Accommodation)=>{
          this.accommodation=data;
          this.updateAccommodationFormGroup.patchValue({
            name: this.accommodation.name,
            description: this.accommodation.description,
            city: this.accommodation.address?.city,
            country: this.accommodation.address?.country,
            address: this.accommodation.address?.address,
            minGuests: this.accommodation.maxGuests,
            maxGuests: this.accommodation.maxGuests,
            deadline: this.accommodation.reservationDeadline,
            checkPrice: this.accommodation.pricePerGuest,
            checkReservation: this.accommodation.automaticConfirmation,
          });
          if(this.accommodation.amenities){
          this.selectedAmenities = this.accommodation?.amenities;
          }
        }
      })
      this.amenityService.getAll().subscribe({
        next: (data: Amenity[]) => {
          this.allAmenities2 = data
        },
        error: (_) => {console.log("Greska!")}
      })
      }

    )

  }

  onChange(amenity: Amenity) {
    if(this.selectedAmenities){
      this.selectedAmenities.push(amenity)
    }
  
  }

  update() {
    this.submitted=true;

    if (this.updateAccommodationFormGroup.valid) {
      const address: Address = {
        city: this.updateAccommodationFormGroup.value.city as string,
        country: this.updateAccommodationFormGroup.value.country as string,
        address: this.updateAccommodationFormGroup.value.address as string,
      };

      const updatedAccommodation: Accommodation = {
        id: this.accommodation?.id,
        name: this.updateAccommodationFormGroup.value.name as string,
        description: this.updateAccommodationFormGroup.value.description as string,
        address: address,
        minGuests: this.updateAccommodationFormGroup.value.minGuests as number,
        maxGuests: this.updateAccommodationFormGroup.value.maxGuests as number,
        type: <AccommodationType> this.updateAccommodationFormGroup.value.selectType as AccommodationType,
        pricePerGuest: this.updateAccommodationFormGroup.value.checkPrice,
        automaticConfirmation: this.updateAccommodationFormGroup.value.checkReservation,
        host: Host(),
        reservationDeadline: this.updateAccommodationFormGroup.value.deadline as number,
        amenities: this.selectedAmenities
      };

      console.log(updatedAccommodation)

      this.accommodationService.update(updatedAccommodation).subscribe(
        {
          next: (data: Accommodation) => {
            this.accommodation = data;
            this.router.navigate(['home']);
          },
          error: (_) => {
          }
        }
      );

    }
    else {

    }
  }
  url: string|null|ArrayBuffer = '../../../assets/images/addpicture.png'

  selectedImages: Image[] = [];

  isAmenitySelected(amenity: Amenity): boolean {
    const isSelected = this.accommodation?.amenities?.some(a => a.name === amenity.name);
    if(isSelected){
      return isSelected;
    }
    return false;
  }
  
  onFileSelected(event: any):void {
    const files: FileList | null = event.target.files;
    if (files) {
      for (let i=0; i < files.length; i++) {
        const reader = new FileReader();
        reader.onload = (e) => {
          if (e.target) {
            const imageURL = e.target.result as string;
            const image : Image = {
              url: imageURL,
              file: files[i]
            }
            this.selectedImages.push(image);
            console.log(files[i]); // ovde ispise undefined
          }
        };
        reader.readAsDataURL(files[i]);
      }
    }
  }

  uploadPicture(idAccommodation: number) {
    const images : File[] = [];
    for (let image of this.selectedImages) {
      images.push(image.file);
    }

    // const idAccommodation = this.newAccommodation.id;
    // @ts-ignore
    this.accommodationService.uploadImage(images, idAccommodation).subscribe(
      {
        next: (data: Accommodation) => {
          // alert(data);
        },
        error: (_) => {
        }
      }
    );
  }
}