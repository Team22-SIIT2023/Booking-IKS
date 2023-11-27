import {Component, Input} from '@angular/core';
import {Accommodation} from "../accommodation/model/model.module";

@Component({
  selector: 'app-accommodation-card',
  templateUrl: './accommodation-card.component.html',
  styleUrls: ['./accommodation-card.component.css']
})
export class AccommodationCardComponent {

  @Input()
  accommodation: Accommodation | undefined;
}
