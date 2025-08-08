import { Component, Input, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { CommonModule, DatePipe, TitleCasePipe } from '@angular/common';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-card',
  standalone: true,
  imports: [CommonModule, MatCardModule, MatSelectModule, MatChipsModule, ReactiveFormsModule,DatePipe,TitleCasePipe,MatButtonModule],
  templateUrl: './vehicle-card.component.html',
  styleUrls: ['./vehicle-card.component.scss']
})
export class VehicleCardComponent {
  @Input() vehicle!: any;
  @Input() location!: string
  driverControl = new FormControl<number | null>(null);
  driverList: any
  localStorage : any

  ngOnInit(){
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.localStorage = JSON.parse(savedData);
      this.driverList = (this.localStorage?.allUsers.find((user:any)=>user?.location?.toLowerCase() === this.location.toLowerCase()))?.drivers     
    }
  }

  onDriverChange(driverName: string | null,vehicle:any) {
    const storage = this.localStorage?.allUsers.find((user:any)=>user?.location?.toLowerCase() === vehicle?.location?.toLowerCase())
    storage?.users.forEach((user: any)=>{
      // if(user.id != vehicle?.id && !vehicle.selected){
      //   vehicle.selected = driverName
      //   if(user?.driver){
      //     user.driver = user?.driver?.filter((driver:string)=> driver !== driverName)
      //     vehicle.driver = user.driver
      //   }
      // }else{
      //   const previousSelected = vehicle.selected
      //   vehicle.selected = driverName
      //   if(user.id != vehicle?.id){
      //     vehicle.driver.push(previousSelected)
      //     user.driver = user?.driver?.filter((driver:string)=> driver !== driverName)
      //     vehicle.driver = user.driver
      //   }
      // }
    })    
    localStorage.setItem('userData',JSON.stringify(this.localStorage))
  }

  onSubmit(){
    console.log("Form Data",this.localStorage);
  }
}