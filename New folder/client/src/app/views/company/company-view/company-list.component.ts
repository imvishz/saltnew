import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';

@Component({
  selector: 'app-company-view',
  templateUrl: './company-list.component.html'
})
export class CompanyListComponent implements OnInit {

  companyList : any = [];
  tempList : any = [];

  constructor( private router: Router,private dataService: DataService, public comm: CommunicationService ) { }

  ngOnInit() {
    this.dataService.get('/api/company/getCompanyList').subscribe((res): any => {
      this.companyList=res;
      this.tempList = this.companyList;
     }, (error) => {
       console.log(error);
     });
  }
 
  onViewClick(idval){
    this.router.navigate(['/company/viewcompany/'+idval])
  }

  onUpdateClick(idval){
    this.router.navigate(['/company/updatecompany/'+idval])
  }

  updateFilter(event) {
      const val = event.target.value.toLowerCase();
      // filter our data
      const temp = this.tempList.filter(function(d) {
        return (d.companyName.toLowerCase().indexOf(val) !== -1 || d.contactPerson.toLowerCase().indexOf(val) !== -1 
                  || d.city.toLowerCase().indexOf(val) !== -1 || d.status.toLowerCase().indexOf(val) !== -1 || !val);
      });

      // update the rows
      this.companyList = temp;
      // Whenever the filter changes, always go back to the first page
      // this.table.offset = 0;
  }

  onDeleteClick(compId){
    this.dataService.deleteById('/api/company/deleteCompany/'+compId)
        .subscribe((res): any => {
          //reload the page
          this.dataService.selfReload(this.router.url);
          this.comm.sendMessage(JSON.stringify({content:"Company deleted successfully", title:"Deleteion", type:"S"}));
        }, (error) => {
            console.log(error);
            this.comm.sendMessage(JSON.stringify({content:"Failed to delete compnay", title:"Deleteion", type:"E"}));
        });
  }

}
