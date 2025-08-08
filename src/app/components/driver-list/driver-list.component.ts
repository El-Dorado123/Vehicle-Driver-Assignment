import { Component, inject } from '@angular/core';
import { VehicleDriverService } from '../../services/vehicle-driver/vehicle-driver.service';
import { VehicleGroupComponent } from '../vehicle-group/vehicle-group.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-driver-list',
  imports: [VehicleGroupComponent],
  templateUrl: './driver-list.component.html',
  styleUrl: './driver-list.component.scss'
})
export class DriverListComponent {
  location: string = '';
  driverList: any
  drivers: any
  activatedRoute = inject(ActivatedRoute)
  localStorage : any
  ngOnInit(){
    this.location = this.activatedRoute.snapshot.queryParamMap.get('location') || ''
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.localStorage = JSON.parse(savedData);
      this.driverList = this.localStorage?.allUsers
      this.localStorage?.allUsers?.forEach((userData:any)=>{
        userData?.users.forEach((user:any)=>{
          user['driver'] = structuredClone(userData?.drivers)
        })
      })
      localStorage.setItem('userData',JSON.stringify(this.localStorage))
    }
  }  
}
