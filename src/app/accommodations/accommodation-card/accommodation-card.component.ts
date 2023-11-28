import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Accommodation, Address} from "../accommodation/model/model.module";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input()
  accommodation: Accommodation | undefined;
  @Output()
  clicked:EventEmitter<Accommodation>=new EventEmitter<Accommodation>();

  onAccommodationClicked():void{
    this.clicked.emit(this.accommodation);
  }

    protected readonly Array = Array;
}
