import { ThrowStmt } from '@angular/compiler';
import { ElementRef, ViewChild } from '@angular/core';
import { Component } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ReportServiceService } from './service/report-service.service';
import { UtilsService } from './service/utils.service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  @ViewChild('dischargeWorkListGrid') dischargeWorkListTable : ElementRef;
  title = 'reportPortal';

  dischargeWorkListGrid: any;
  dischargeWorkListGridObjec: any;
  rptCode: any;
  pringFormat:any;
  constructor(
    private reportService:ReportServiceService,
    private coreUtilService: UtilsService,
  ) { }

  ngOnInit() {

setTimeout(()=>{
  console.log(this.dischargeWorkListTable.nativeElement)
  this.initPrescriptionWorkListGrid();
},100)
    
        

  }
  initPrescriptionWorkListGrid() {
    const that = this;
    this.dischargeWorkListGrid = $(that.dischargeWorkListTable.nativeElement);
    this.dischargeWorkListGridObjec = that.dischargeWorkListGrid.DataTable({

      initComplete: function () {
        $(".dataTables_filter input").unbind()
          .bind('keyup change', function (e: any) {

            if (e.keyCode === 13) {
              if (e.target.value.length != undefined) {
                that.dischargeWorkListGridObjec.search(e.target.value).draw();
              }
            }
            if (e.target.value == "") {
              that.dischargeWorkListGridObjec.search("").draw();
            }
          });
        $('input[type=search]').bind('click', function (e) {
          that.dischargeWorkListGridObjec.search("").draw();
        });
      },

      pagingType: 'full_numbers',
      pageLength: 25,
      serverSide: true,
      processing: true,
      ajax: {
        url: environment.baseUrl + environment.diagnosticApiUrl + '/report/gridList',
        type: 'GET',

        data: function (sendData) {
          
          
        },
        beforeSend: function (xhr) {
          // xhr.setRequestHeader('Authorization', 'bearer ' + that.authService.getAccessToken());
          xhr.setRequestHeader('Content-Type', 'application/json');
          xhr.setRequestHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
          xhr.setRequestHeader('Access-Control-Allow-Credentials', 'true');
        },
        dataSrc: function (response) {
          response.draw = response.obj.draw;
          response.recordsTotal = response.obj.recordsTotal;
          response.recordsFiltered = response.obj.recordsFiltered;
          return response.obj.data;
        },
        error: function (request) {
          console.log('request.responseText', request.responseText);
        }
      },

      'order': [[0, 'DESC']],
      columns: [
        {
          title: 'ID',
          data: 'rptId',
         name: 'disReqTime'
        },
        {
          title: 'Reporting Tool',
          data: 'reptTool',
          name: 'reptTool'
        },
        {
          title: 'Report Name',
          data: 'rptName',
          name: 'rptName'
        },
        {
          title: 'Report Details',
          data: 'dtl',
          name: 'dtl'
        },
        {
          title: 'Format',
          data: 'rptFormat',
          name: 'rptFormat'
        },
        // {
        //   title: 'Report Name',
        //   data: 'rptName',
        //   name: 'rptName'
        // },
        {
          title: '',
          'orderable': false,
          class: 'text-center',
          render: (data, type, row) => {
            return '<button type="button" class="btn btn-info rounded printPres">Print</button>';
          }
        },
        
      ],

      select: true,
      responsive: true,
      autoWidth: true,
      rowCallback: (row: Node, data: any | Object) => {
        $(row).find('.discharge-btn').click(function () {
          if (data.admissionNo && data.admissionType) {
            // that.discharge(data);
          } else {
            // that.toastr.warning('', 'Please Select a Patient!');
          }
        });

        if (data.disFlag == 1) {
          $(row).find('td:eq(10)').find('.discharge-btn').addClass('btn-danger');
          $(row).find('td:eq(10)').find('.discharge-btn').text('Discharged');
          $(row).find('td:eq(10)').attr('title', 'Discharged');
        }
        if (data.disFlag == 0 && data.disReqFlag == 1) {
          $(row).find('td:eq(10)').find('.discharge-btn').addClass('btn-warning');
          $(row).find('td:eq(10)').find('.discharge-btn').text('Requested');
          $(row).find('td:eq(10)').attr('title', 'Requested');
        }
        if (data.disFlag == 0 && data.disReqFlag == 0) {
          $(row).find('td:eq(10)').find('.discharge-btn').addClass('btn-info');
          $(row).find('td:eq(10)').find('.discharge-btn').text('Admitted');
          $(row).find('td:eq(10)').attr('title', 'Admitted');
        }
        $(row).find('.printPres').click(function () {
          that.print(data);
        });
        return row;
      }
    });
  }
print(data){
console.log(data);
if (data.rptId===1) {
  this.printDischargeRpt();
}else if(data.rptId===2){
  this.prescriptionRpt();
}else if(data.rptId===3){
  this.rptCode="1"
  this.pringFormat="pdf"
  this.salesReport();

}else if(data.rptId===4){
  this.rptCode="2"
  this.pringFormat="pdf"
  this.salesReport();

}else if(data.rptId===5){
  this.rptCode="1"
  this.pringFormat="XLSX"
this.salesReport();

}else if(data.rptId===6){
  this.rptCode="2"
  this.pringFormat="XLSX"
  this.salesReport();

}else if(data.rptId===7){
  this.onInitialportocol();
}else if(data.rptId===8){
  this.patientChemoAppointmentSchedule();
}else if(data.rptId===9){
  this.dischargeSummarybirt();
}else if(data.rptId===10){
  this.rptCode="OPD_4012_117_N"
this.opdAppointmentReporteRpt();
  // this.rptCode="OPD_4013"
  // this.opdAppointmentReporteRpt();
}else if(data.rptId===11){
  this.rptCode="OPD_4013"
  this.billColl();
}else if(data.rptId===12){
  this.rptCode="OPD_4013"
  this.billDetail();
}else if(data.rptId===13){
  this.rptCode="OPD_4013";
  this.billReferralReport();
}else if(data.rptId===14){
  this.splOtSummaryReport();
}
else if(data.rptId===15){
  this.rptCode="OPD_4013"
  this.cabinShareReport();
}else if(data.rptId===16){
  this.rptCode="OPD_4013"
  this.otConsultaionFeesReport();
}else if(data.rptId===17){
  this.rptCode="OPD_4013"
  this.hospitalStoppageAndDetailReport();

}else if(data.rptId===18){
  this.rptCode="OPD_4013"
  this.nsInvoiceRpt();
  
}else if(data.rptId===19){
  this.rptCode="OPD_4013"
  this.appointmentAcknoledgeMentRpt();
 
}
else if(data.rptId===20){
  
  this.printanesthconsentform2Rpt();
}
else if(data.rptId===21){
  
  this.printanesthconsentformRpt();
}
else if(data.rptId===22){
  
  this.quesaForm();
}
else if(data.rptId===23){
  this.printBookingRpt();
 
}
else if(data.rptId===24){
  this.regCardReport();
 
}
else if(data.rptId===25){
  this.labelBarcode();
 
}
else if(data.rptId===26){
  this.posInvoice();
 
}
else if(data.rptId===27){
  this.medSticker();
 
}else if(data.rptId===28){
  this.rptCode="3"
  this.pringFormat="pdf"
  this.salesReport();

}
else{
  alert('Report Not found')
}


}
dischargeSummarybirt(){
  const reqObj={}
  this.reportService.dischargeSummarybirt(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
printDischargeRpt(){
  const reqObj={}
  this.reportService.dischargeSummary(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
printBookingRpt(){
  const reqObj={}
  this.reportService.opdAppointmentReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
printanesthconsentformRpt(){
  const reqObj={}
  this.reportService.printanesthconsentform(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
printanesthconsentform2Rpt(){
  const reqObj={}
  this.reportService.printanesthconsentform2(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
prescriptionRpt(){
  const reqObj={}
  this.reportService.prescription(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
appointmentAcknoledgeMentRpt(){
  const reqObj={}
  this.reportService.appointmentAcknoledgeMent(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
quesaForm(){
  const reqObj={}
  this.reportService.quesaForm(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
nsInvoiceRpt(){
  const reqObj={}
  this.reportService.nsInvoice(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
opdAppointmentReporteRpt(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.appointmenReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
billDetail(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.billDetail(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
billColl(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.billColl(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
cabinShareReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.cabinShareReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
otConsultaionFeesReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.otConsultaionFeesReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
// otConsultaionFeesReport(){
//   const reqObj={
//     "rptCode": this.rptCode
//   }
//   this.reportService.otConsultaionFeesReport(reqObj).subscribe(
//     res => {
//       // this.printBtn = false;
//       let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
//       var fileURL = URL.createObjectURL(file);
//       window.open(fileURL);
//       // this.removeLoader();
//     },
//     err => {
//       console.log(" Error occured in Registration card generation..", err);
//       // this.printBtn = false;
//       //     this.removeLoader();
//     }
//   )
// }
splOtSummaryReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.splOtSummaryReport(reqObj).subscribe(
    res => {

      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
  
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
hospitalStoppageAndDetailReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.hospitalStoppageAndDetailReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
billReferralReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.billReferralReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
salesReport(){
  const reqObj={
    "rptType": this.rptCode,
    "pringFormat":this.pringFormat
  }
  this.reportService.salesReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat(this.pringFormat) });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
patientChemoAppointmentSchedule(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.patientChemoAppointmentSchedule(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
onInitialportocol(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.onInitialportocol(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
regCardReport(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.regCardReport(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
labelBarcode(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.labelBarcode(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
posInvoice(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.posInvoice(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
medSticker(){
  const reqObj={
    "rptCode": this.rptCode
  }
  this.reportService.medSticker(reqObj).subscribe(
    res => {
      // this.printBtn = false;
      let file = new Blob([res], { type: this.coreUtilService.printFormat("PDF") });
      var fileURL = URL.createObjectURL(file);
      window.open(fileURL);
      // this.removeLoader();
    },
    err => {
      console.log(" Error occured in Registration card generation..", err);
      // this.printBtn = false;
      //     this.removeLoader();
    }
  )
}
}
