import { Component, inject, ViewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule,MatTableModule,MatPaginatorModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  localStorageData : any
  tableData: any = [];
  displayedColumns: string[] = ['position','location', 'drivers','running','idle','offline'];
  dataSource = new MatTableDataSource<any>(this.tableData);
  route = inject(Router)
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  ngOnInit(){
    const savedData = localStorage.getItem('userData');
    if (savedData) {
      this.localStorageData = JSON.parse(savedData);
      this.localStorageData?.allUsers.forEach((user : any,index: number) => {
        const statusCounts: any = {running: 0,idle: 0,offline: 0};
        user?.users?.forEach((user:any)=>{
          const status = user.status.toLowerCase();
          if (statusCounts[status]) {
            statusCounts[status]++;
          } else {
            statusCounts[status] = 1;
          }
        })
        const data = {
          position : index,
          location : user?.location,
          drivers : user?.users?.length,
          running: statusCounts.running,
          idle: statusCounts.idle,
          offline: statusCounts.offline
        }
        this.tableData.push(data)
      });
    }
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }
  onRowClick(location:string){
    this.route.navigate(['/driver'],{
      queryParams: { location : location}
    })
  }
}



