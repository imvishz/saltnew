import {Component, OnInit, ViewChild} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {ModalDirective} from 'ngx-bootstrap/modal';
import { DataService } from '../../../data.service';
import { CommunicationService } from '../../../communication.service';
import { environment } from '../../../../environments/environment';
@Component({
    selector : 'get-company',
    templateUrl : './get-company.component.html'
})
export class GetCompanyComponent implements OnInit{

  @ViewChild('confirmModal', {static: false}) public confirmModal: ModalDirective;

    feature : any = "View";
    isUpdating : boolean = false;
    loading = false;
    submitted = false;
    companyDetail : any = {};
    companyId:any;
    updatingTo : any = "";
    downloadImage:any;

    constructor( private router: Router, private route: ActivatedRoute,private dataService: DataService, public comm: CommunicationService ) {
        if(this.router.url == "/company/updatecompany"){
            this.feature = "Update";
            this.isUpdating = true;
        }
    }

    ngOnInit() {
      this.companyId=this.route.snapshot.paramMap.get('id');

      this.dataService.get('/api/company/getCompanyDetail/'+this.companyId).subscribe((res): any => {
        if(res.length>0){
          this.companyDetail=res[0];
          this.downloadImage=environment.serverurl+this.companyDetail.orginalFilePath;
        }
       }, (error) => {
         console.log(error);
       });
      console.log('ddd',this.companyId)
      //fetch the details of selected company thru api's
    }


    updateStatus(opt) {
      this.submitted = true;
      this.loading = true;
      
        this.dataService.post('/api/company/update-company-status/' + this.companyId, {status : opt}).subscribe((res): any => {
            this.comm.sendMessage(JSON.stringify({content:"Company status updated", type:"S"}));
            this.router.navigate(['company/company']);
        }, (error) => {
          this.comm.sendMessage(JSON.stringify({content:"Failed to update status", type:"E"}));
        });
   }

   onReset(){
     window.history.back();
   }

   updateClick(st){
      this.updatingTo = st;
   }

}
