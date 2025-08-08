import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { TitleCasePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatInputModule } from '@angular/material/input';
import { MatError, MatOption, MatSelect } from '@angular/material/select';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, takeUntil } from 'rxjs';

interface Status{
  label : string;
  value: string;
}
@Component({
  selector: 'app-add-user',
  imports: [MatCardModule,ReactiveFormsModule,MatFormFieldModule,MatInputModule, FormsModule,MatOption,MatError,MatSelect,MatDatepickerModule,MatGridListModule,MatButtonModule,TitleCasePipe],
  providers: [provideNativeDateAdapter()],
  templateUrl: './add-user.component.html',
  styleUrl: './add-user.component.scss'
})
export class AddUserComponent {
  userForm: FormGroup;
  isFormSubmitted: boolean = false;
  driverStatus : Status[] = [
    {label: 'select status',value: ''},
    {label: 'Running',value: 'running'},
    {label: 'Idle',value: 'idle'},
    {label: 'Offline',value: 'offline'}
  ]

  VehicleList: string[] = ['bus','scooter','scooty','car','cycle','bicycle'];
  nextId: number = 1;
  cols: number = 3;
  storage: { nextId: string; allUsers: { location: string; drivers: string[], panelOpenState: boolean; users: any[] }[] } = {
    nextId: '1',
    allUsers: []
  };
  destroyed = new Subject<void>();
  fb = inject(FormBuilder)
  snackBar = inject(MatSnackBar)
  breakpointObserver = inject(BreakpointObserver)

  constructor() {
    this.userForm = this.fb.group({
      id: [''],
      name: ['', [Validators.required]],
      location: ['', [Validators.required]],
      imei: ['', [Validators.required]],
      registration: ['', [Validators.required]],
      phone: ['', [Validators.required,Validators.pattern('^[0-9]{10}$')]],
      status: ['', [Validators.required]],
      vehicle: ['', [Validators.required]],
      lastseen: ['', [Validators.required]],
      selected: [''],
    });
  }

  ngOnInit(): void {
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.storage = JSON.parse(savedData);
      this.nextId = parseInt(this.storage.nextId) || 1;
    }
    this.breakpointObserver
      .observe([
        Breakpoints.XSmall,
        Breakpoints.Small,
        Breakpoints.Medium,
        Breakpoints.Large,
        Breakpoints.XLarge,
      ])
      .pipe(takeUntil(this.destroyed))
      .subscribe((result) => {
        if (result.breakpoints[Breakpoints.XSmall]) {
          this.cols = 1;
        } else if (result.breakpoints[Breakpoints.Small]) {
          this.cols = 2;
        } else {
          this.cols = 3;
        }
      });
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userForm.patchValue({ id: this.nextId.toString() });
      const city = this.userForm.value.location.trim();
      let locationGroup = this.storage.allUsers.find(
        group => group.location.toLowerCase() === city.toLowerCase()
      );
      if (!locationGroup) {
        locationGroup = { location: city, panelOpenState: true,drivers:[], users: [] };
        this.storage.allUsers.push(locationGroup);
      }
      locationGroup.users.push(this.userForm.value);
      locationGroup.drivers.push(this.userForm?.value?.name)
      this.nextId++;
      this.storage.nextId = this.nextId.toString();
      localStorage.setItem('userData', JSON.stringify(this.storage));
      
      console.log('Form Submitted', this.userForm.value);
      this.snackBar.open('Form submitted successfully!', 'Close', {
        duration: 4000,
        horizontalPosition: 'right',
        verticalPosition: 'bottom'
      });
      this.resetForm();
    }
  }
  restrictToNumbers(event: KeyboardEvent): void {
    const pattern = /[0-9]/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  canDeactivate(): boolean {
    return !this.userForm.dirty && this.isFormSubmitted || this.userForm.touched;
  }
  restrictToString(event: KeyboardEvent): void {
    const pattern = /^[a-zA-Z\s]*$/;
    const inputChar = String.fromCharCode(event.charCode);
    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }
  restrictToAplhaNumeric(event: KeyboardEvent): void {
    const pattern = /^[a-zA-Z0-9\s]*$/
    const inputChar = String.fromCharCode(event.charCode);

    if (!pattern.test(inputChar)) {
      event.preventDefault();
    }
  }

  resetForm(): void {
    this.userForm.reset();
    this.userForm.patchValue({ id: '' });
  }
  ngOnDestroy() {
    this.destroyed.next();
    this.destroyed.complete();
  }
}
