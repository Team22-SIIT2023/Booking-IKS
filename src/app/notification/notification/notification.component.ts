import {Component, OnInit} from '@angular/core';
import {Accommodation} from "../../accommodations/accommodation/model/model.module";
import {AccommodationsService} from "../../accommodations/accommodations.service";
import {NotificationService} from "../notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent{

  // notifications: Notification[] = []
  // constructor(private service: NotificationService) {
  // }
  //
  // ngOnInit(): void {
  //   this.service.getAll().subscribe({
  //     next: (data: Notification[]) => {
  //       this.notifications = data
  //     },
  //     error: (_) => {console.log("Greska!")}
  //   })
  // }
}
