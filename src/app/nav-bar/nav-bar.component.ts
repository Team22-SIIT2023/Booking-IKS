import { Component } from '@angular/core';
import {NotificationService} from "../notification/notification.service";
import {Notification} from "../notification/notification/model/model.module";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {

  notifications: Notification[] = []
  constructor(private service: NotificationService) {
  }

  ngOnInit(): void {
    this.service.getAll().subscribe({
      next: (data: Notification[]) => {
        this.notifications = data
      },
      error: (_) => {console.log("Greska!")}
    })
  }
}
