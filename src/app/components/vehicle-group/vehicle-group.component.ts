import { Component, Input } from '@angular/core';
import { VehicleCardComponent } from '../vehicle-card/vehicle-card.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { CommonModule, TitleCasePipe } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-vehicle-group',
  standalone: true,
  imports: [CommonModule, MatExpansionModule,VehicleCardComponent,TitleCasePipe,MatButtonModule],
  templateUrl: './vehicle-group.component.html',
  styleUrls: ['./vehicle-group.component.scss'],
})
export class VehicleGroupComponent {
  @Input() driverList!: any;
  onSubmit(){
    console.log("Form Data",this.driverList);
  }
}