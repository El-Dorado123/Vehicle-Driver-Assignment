import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { VehicleGroupComponent } from '../vehicle-group/vehicle-group.component';

@Component({
  selector: 'app-driver-card',
  imports: [VehicleGroupComponent],
  templateUrl: './driver-card.component.html',
  styleUrl: './driver-card.component.scss'
})
export class DriverCardComponent {
  activatedRoute = inject(ActivatedRoute)
  location: string = ''
  driverList: any
  localStorage : any
  ngOnInit(){
    this.location = this.activatedRoute.snapshot.queryParamMap.get('location') || ''
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.localStorage = JSON.parse(savedData);
      this.driverList = [this.localStorage?.allUsers.find((user:any)=>user?.location?.toLowerCase() === this.location.toLowerCase())]
    }
  }
}
