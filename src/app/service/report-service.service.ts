import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ReportServiceService {
  private BASE_URL = `${environment.baseUrl}${environment.diagnosticApiUrl}/report`;
  private DISCHARGE= `${this.BASE_URL}/dischargeSummary`;
  private PRINTANESTHCONSENTFORM2= `${this.BASE_URL}/print-anesth-consentFrom2`;
  private PRINTANESTHCONSENTFORM= `${this.BASE_URL}/print-anesth-consentFrom`;
  private BOOKINGITEM= `${this.BASE_URL}/bookingItem`;
  private QUESAFORM= `${this.BASE_URL}/quesaForm`;
  private APPOINTMENTACKNOLEDGEMENT= `${this.BASE_URL}/appointmentAcknoledgeMent`;
  private NSINVOICE= `${this.BASE_URL}/nsInvoice`;
  private PRESCRIPTION= `${this.BASE_URL}/prescription`;
  private APPOINTMENREPORT= `${this.BASE_URL}/appointmenReport`;
  private CABINSHAREREPORT= `${this.BASE_URL}/cabinShareReport`;
  private OTCONSULTAIONFEESREPORT= `${this.BASE_URL}/otConsultaionFeesReport`;
  private SPLOTSUMMARYREPORT= `${this.BASE_URL}/splOtSummaryReport`;
  private HOSPITALSTOPPAGEANDDETAILREPORT= `${this.BASE_URL}/hospitalStoppageAndDetailReport`;
  private BILLCOLL= `${this.BASE_URL}/billColl`;
  private BILLDETAIL= `${this.BASE_URL}/billDetail`;
  private DISCHARGESUMMARYBIRT= `${this.BASE_URL}/dischargeSummarybirt`;
  private BILLREFERRALREPORT= `${this.BASE_URL}/billReferralReport`;
  private PATIENTCHEMOAPPOINTMENTSCHEDULE= `${this.BASE_URL}/patientchemoappointmentschedule`;
  private ONINITIALPORTOCOL= `${this.BASE_URL}/onInitialportocol`;
  private SALESREPORT= `${this.BASE_URL}/salesReport`;
  private REGCARDREPORT= `${this.BASE_URL}/regCardReport`;
  private LABELBARCODE= `${this.BASE_URL}/labelBarcode`;
  private POSINVOICE= `${this.BASE_URL}/posInvoice`;
  private MEDSTICKER= `${this.BASE_URL}/medSticker`;
  constructor(
    private http: HttpClient,
  ) { }


  opdAppointmentReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.BOOKINGITEM, _reqObj, httpOptions);
  }
  salesReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.SALESREPORT, _reqObj, httpOptions);
  }
  dischargeSummary(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.DISCHARGE, _reqObj, httpOptions);
  }
  prescription(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.PRESCRIPTION, _reqObj, httpOptions);
  }
  nsInvoice(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.NSINVOICE, _reqObj, httpOptions);
  }
  appointmentAcknoledgeMent(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.APPOINTMENTACKNOLEDGEMENT, _reqObj, httpOptions);
  }
  quesaForm(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.QUESAFORM, _reqObj, httpOptions);
  }
  bookingItem(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.BOOKINGITEM, _reqObj, httpOptions);
  }
  printanesthconsentform(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.PRINTANESTHCONSENTFORM, _reqObj, httpOptions);
  }
  printanesthconsentform2(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.PRINTANESTHCONSENTFORM2, _reqObj, httpOptions);
  }
  appointmenReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.APPOINTMENREPORT, _reqObj, httpOptions);
  }
  cabinShareReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.CABINSHAREREPORT, _reqObj, httpOptions);
  }
  otConsultaionFeesReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.OTCONSULTAIONFEESREPORT, _reqObj, httpOptions);
  }
  
  splOtSummaryReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.SPLOTSUMMARYREPORT, _reqObj, httpOptions);
  }
  hospitalStoppageAndDetailReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.HOSPITALSTOPPAGEANDDETAILREPORT, _reqObj, httpOptions);
  }
  billColl(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.BILLCOLL, _reqObj, httpOptions);
  }
  billDetail(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.BILLDETAIL, _reqObj, httpOptions);
  }
  dischargeSummarybirt(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.DISCHARGESUMMARYBIRT, _reqObj, httpOptions);
  }
  billReferralReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.BILLREFERRALREPORT, _reqObj, httpOptions);
  }
  patientChemoAppointmentSchedule(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.PATIENTCHEMOAPPOINTMENTSCHEDULE, _reqObj, httpOptions);
  }
  onInitialportocol(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.ONINITIALPORTOCOL, _reqObj, httpOptions);
  }
  regCardReport(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.REGCARDREPORT, _reqObj, httpOptions);
  }
  labelBarcode(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.LABELBARCODE, _reqObj, httpOptions);
  }
  posInvoice(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.POSINVOICE, _reqObj, httpOptions);
  }
  medSticker(_reqObj: any): Observable<any> {
    const httpOptions = { 'responseType': 'arraybuffer' as 'json' };
    return this.http.post<any>(this.MEDSTICKER, _reqObj, httpOptions);
  }
}
