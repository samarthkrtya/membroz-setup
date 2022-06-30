import { AfterViewChecked, AfterViewInit, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { CommonService } from 'src/app/core/services/common.service';


declare var $ : any;

@Component({
  selector: 'app-personal-details',
  templateUrl: './personal-details.component.html', 
  styles : [
     `.center {
       text-align: center;
     }
     ::ng-deep .custom-class {
       border: 0;
       border-bottom: 1px solid #000;
       height: auto;
       font-size: 14px;
       font-family: 'Poppins', arial;
     }
     `
  ],
})

export class PersonalDetailsComponent implements OnInit , AfterViewChecked , AfterViewInit {

  doctemplate : any = {};
  isLoading : boolean = false;

  formfields: any [] = [];

  _loginUserBranch = {"workinghours":{"days":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"starttime":"08:00:00","endtime":"18:00:00"},"paymentterms":[],"status":"active","_id":"619f698507f63663cdf59381","branchname":"M PLACE","solutiontype":"Gym, Yoga & Fitness Center","currency":"PHP","startingnumber":"MPLACE10000","docformat":{"appointment":{"prefix":"MPLACE"},"bill":{"prefix":"MPLACE"},"billpayment":{"prefix":"MPLACE"},"booking":{"prefix":"MPLACE"},"challan":{"prefix":"MPLACE"},"creditnote":{"prefix":"MPLACE"},"expense":{"prefix":"MPLACE"},"facility":{"prefix":"MPLACE"},"joborder":{"prefix":"MPLACE"},"journal":{"prefix":"MPLACE"},"journalledger":{"prefix":"MPLACE"},"leaseorder":{"prefix":"MPLACE"},"payment":{"prefix":"MPLACE"},"invoice":{"prefix":"MPLACE"},"purchaseinvoice":{"prefix":"MPLACE"},"popayment":{"prefix":"MPLACE"},"purchaseorder":{"prefix":"MPLACE"},"purchaserequest":{"prefix":"MPLACE"},"quotation":{"prefix":"MPLACE"},"salesorder":{"prefix":"MPLACE"},"support":{"prefix":"MPLACE"}},"timezone":"Asia/Manila","startingusernumber":"MPLACES100","walletsetting":{"paymentType":["card","mobile"],"iswalletotpenable":false},"branchlogo":"https://res.cloudinary.com/dlopjt9le/image/upload/v1638359438/uwjthgukqxvsetzuii2e.png","locale":"en-IN","qrcode":"","updatedAt":"2022-06-15T07:41:28.935Z","iswalletenable":true,"property":{"country":"Philippines","address":"Ground Floor Mplace Mall Mother Ignacia St. South Triangle Q.c","pincode":395002,"paymentintergations":"magpie","supremamembergroup":"1043","deviceid":"540092688","supremausergroup":"1041","autodebit":true},"webqrcode":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATtSURBVO3BQY4cSRIEQdNA/f/Lun30UwCJ9GoOuSaCP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtAfpOaN4BMaiYgk5obIG+ouQHym9S8cVK16KRq0UnVok+WqdkE5A0gbwB5Q80NkEnNjZpNQDadVC06qVp0UrXoky8D8oSaJ4BMam7U3Ki5ATKpeUPNG0CeUPNNJ1WLTqoWnVQt+uQfA2RSMwGZ1ExAJjWTmhsgN2omIJOav9lJ1aKTqkUnVYs++ceoeUPNE0AmNROQCcik5l9yUrXopGrRSdWiT75MzZ8EZFIzAblRMwG5AXKjZpOa/5KTqkUnVYtOqhZ9sgzI30zNBGRSMwGZ1ExAboBMam6A/JedVC06qVp0UrUIf+QvBmRSMwG5UVN7TqoWnVQtOqla9MlLQCY1E5BNaiY1E5BJzQTkm4DcqJmATGomIJvUfNNJ1aKTqkUnVYs++cPUPAFkUjOpuVEzAblRcwPkCSCTmgnIJjU3QCY1b5xULTqpWnRStQh/ZBGQGzUTkCfU3AB5Qs0EZJOaN4A8oeZPOqladFK16KRq0ScvAblR84SaGyA3am6APKHmNwGZ1NwAmYBMaiYgk5pNJ1WLTqoWnVQt+uTLgLwBZFLzBJBJzQRkUjMBuVEzAZnU3ACZ1DyhZgIyAZnUfNNJ1aKTqkUnVYvwRxYBmdRsAvKEmgnIjZongExqboBMaiYgb6h5Asik5o2TqkUnVYtOqhZ98hKQGyA3am6ATGomIJOaCcikZgLyBJA31ExA3lDzhppNJ1WLTqoWnVQt+uQlNROQSc0EZAJyo2YCMqmZgExqJiBPANkEZFIzAZnU3ACZ1NwAmdRsOqladFK16KRqEf7IIiA3aiYgk5oJyBNqboDcqLkBMqmZgExqboBMat4A8oaaN06qFp1ULTqpWvTJS0AmNTdAJjUTkEnNBOQGyI2aGyA3aiYgk5obIJOaCcgbaiYgv+mkatFJ1aKTqkWffBmQGyCTmgnIpGYCcqNmAjKpeQLIpGYCcqPmRs0E5EbNE2q+6aRq0UnVopOqRZ/8MjUTkAnIpGYC8oaaCciNmgnIjZobIJOab1IzAblR88ZJ1aKTqkUnVYs++TI1E5BJzQRkAjKpuQEyAZnU3KiZgExqboBMam6AvAFkUjMBuVGz6aRq0UnVopOqRfgjfzEgN2omIJOaN4BMaiYgT6h5AsgmNW+cVC06qVp0UrXok5eA/CY1k5oJyDcBeULNBOQJIJOaTWo2nVQtOqladFK16JNlajYBuQEyqZmAvAFkUvOGmgnIjZon1NwAmYBMat44qVp0UrXopGrRJ18G5Ak1bwCZ1NwAmdRMaiYgk5oJyKTmCSCbgExqvumkatFJ1aKTqkWf/GPU3ACZ1ExAbtRMQCY1T6jZBOQGyI2aN06qFp1ULTqpWvTJ/xk1N2omIBOQGyBPqLkB8k1qNp1ULTqpWnRSteiTL1PzTWomIJOaGyA3aiYgN2omIDdAbtTcALlRMwH5ppOqRSdVi06qFn2yDMhvAvIEkEnNBGQCMqm5AfKEmhsgN2pugExqvumkatFJ1aKTqkX4I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/Aw17Qlrvsj/LAAAAAElFTkSuQmCC","standardplan":true,"createdAt":"2021-10-12T06:29:13.660Z","isqrenable":false,"iswebqrenable":true,"paymentmethods":[],"supportemail":"surgefitnessgymmplacemall@gmail.com","breaktime":[],"paymentsetting":{"acceptchecks":"Yes","acceptcash":"Yes","allowmemwallre":"No","acceptcreditcard":"Yes","requirebillingaddressforonlinepurchages":null,"acceptgiftcards":"Yes","enablecashbackforgiftcertificatebalance":"Yes","allowdiposit":"Yes","enabletipsgratuityforServices":"Yes","autotransfertipstopayouts":"Yes","enableservicecharge":"Yes","creditnote":"Yes","tips":"Yes","autodebitinvoice":"Yes","paymentgateway":"Magpie","magpiepublickey":"pk_live_Z7O4DuiKv8kUAz3gTvF3tu","magpiesecretkey":"sk_live_lV5pcJ6jjZl6zSrMDO0HWR"},"branchid":{"workinghours":{"days":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"starttime":"08:00:00","endtime":"18:00:00"},"paymentterms":[],"status":"active","_id":"619f698507f63663cdf59381","branchname":"M PLACE","solutiontype":"Gym, Yoga & Fitness Center","currency":"PHP","startingnumber":"MPLACE10000","docformat":{"appointment":{"prefix":"MPLACE"},"bill":{"prefix":"MPLACE"},"billpayment":{"prefix":"MPLACE"},"booking":{"prefix":"MPLACE"},"challan":{"prefix":"MPLACE"},"creditnote":{"prefix":"MPLACE"},"expense":{"prefix":"MPLACE"},"facility":{"prefix":"MPLACE"},"joborder":{"prefix":"MPLACE"},"journal":{"prefix":"MPLACE"},"journalledger":{"prefix":"MPLACE"},"leaseorder":{"prefix":"MPLACE"},"payment":{"prefix":"MPLACE"},"invoice":{"prefix":"MPLACE"},"purchaseinvoice":{"prefix":"MPLACE"},"popayment":{"prefix":"MPLACE"},"purchaseorder":{"prefix":"MPLACE"},"purchaserequest":{"prefix":"MPLACE"},"quotation":{"prefix":"MPLACE"},"salesorder":{"prefix":"MPLACE"},"support":{"prefix":"MPLACE"}},"timezone":"Asia/Manila","startingusernumber":"MPLACES100","walletsetting":{"paymentType":["card","mobile"],"iswalletotpenable":false},"branchlogo":"https://res.cloudinary.com/dlopjt9le/image/upload/v1638359438/uwjthgukqxvsetzuii2e.png","locale":"en-IN","qrcode":"","updatedAt":"2022-06-15T07:41:28.935Z","iswalletenable":true,"property":{"country":"Philippines","address":"Ground Floor Mplace Mall Mother Ignacia St. South Triangle Q.c","pincode":395002,"paymentintergations":"magpie","supremamembergroup":"1043","deviceid":"540092688","supremausergroup":"1041","autodebit":true},"webqrcode":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATtSURBVO3BQY4cSRIEQdNA/f/Lun30UwCJ9GoOuSaCP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtAfpOaN4BMaiYgk5obIG+ouQHym9S8cVK16KRq0UnVok+WqdkE5A0gbwB5Q80NkEnNjZpNQDadVC06qVp0UrXoky8D8oSaJ4BMam7U3Ki5ATKpeUPNG0CeUPNNJ1WLTqoWnVQt+uQfA2RSMwGZ1ExAJjWTmhsgN2omIJOav9lJ1aKTqkUnVYs++ceoeUPNE0AmNROQCcik5l9yUrXopGrRSdWiT75MzZ8EZFIzAblRMwG5AXKjZpOa/5KTqkUnVYtOqhZ9sgzI30zNBGRSMwGZ1ExAboBMam6A/JedVC06qVp0UrUIf+QvBmRSMwG5UVN7TqoWnVQtOqla9MlLQCY1E5BNaiY1E5BJzQTkm4DcqJmATGomIJvUfNNJ1aKTqkUnVYs++cPUPAFkUjOpuVEzAblRcwPkCSCTmgnIJjU3QCY1b5xULTqpWnRStQh/ZBGQGzUTkCfU3AB5Qs0EZJOaN4A8oeZPOqladFK16KRq0ScvAblR84SaGyA3am6APKHmNwGZ1NwAmYBMaiYgk5pNJ1WLTqoWnVQt+uTLgLwBZFLzBJBJzQRkUjMBuVEzAZnU3ACZ1DyhZgIyAZnUfNNJ1aKTqkUnVYvwRxYBmdRsAvKEmgnIjZongExqboBMaiYgb6h5Asik5o2TqkUnVYtOqhZ98hKQGyA3am6ATGomIJOaCcikZgLyBJA31ExA3lDzhppNJ1WLTqoWnVQt+uQlNROQSc0EZAJyo2YCMqmZgExqJiBPANkEZFIzAZnU3ACZ1NwAmdRsOqladFK16KRqEf7IIiA3aiYgk5oJyBNqboDcqLkBMqmZgExqboBMat4A8oaaN06qFp1ULTqpWvTJS0AmNTdAJjUTkEnNBOQGyI2aGyA3aiYgk5obIJOaCcgbaiYgv+mkatFJ1aKTqkWffBmQGyCTmgnIpGYCcqNmAjKpeQLIpGYCcqPmRs0E5EbNE2q+6aRq0UnVopOqRZ/8MjUTkAnIpGYC8oaaCciNmgnIjZobIJOab1IzAblR88ZJ1aKTqkUnVYs++TI1E5BJzQRkAjKpuQEyAZnU3KiZgExqboBMam6AvAFkUjMBuVGz6aRq0UnVopOqRfgjfzEgN2omIJOaN4BMaiYgT6h5AsgmNW+cVC06qVp0UrXok5eA/CY1k5oJyDcBeULNBOQJIJOaTWo2nVQtOqladFK16JNlajYBuQEyqZmAvAFkUvOGmgnIjZon1NwAmYBMat44qVp0UrXopGrRJ18G5Ak1bwCZ1NwAmdRMaiYgk5oJyKTmCSCbgExqvumkatFJ1aKTqkWf/GPU3ACZ1ExAbtRMQCY1T6jZBOQGyI2aN06qFp1ULTqpWvTJ/xk1N2omIBOQGyBPqLkB8k1qNp1ULTqpWnRSteiTL1PzTWomIJOaGyA3aiYgN2omIDdAbtTcALlRMwH5ppOqRSdVi06qFn2yDMhvAvIEkEnNBGQCMqm5AfKEmhsgN2pugExqvumkatFJ1aKTqkX4I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/Aw17Qlrvsj/LAAAAAElFTkSuQmCC","standardplan":true,"createdAt":"2021-10-12T06:29:13.660Z","isqrenable":false,"iswebqrenable":true,"paymentmethods":[],"supportemail":"surgefitnessgymmplacemall@gmail.com","breaktime":[],"paymentsetting":{"acceptchecks":"Yes","acceptcash":"Yes","allowmemwallre":"No","acceptcreditcard":"Yes","requirebillingaddressforonlinepurchages":null,"acceptgiftcards":"Yes","enablecashbackforgiftcertificatebalance":"Yes","allowdiposit":"Yes","enabletipsgratuityforServices":"Yes","autotransfertipstopayouts":"Yes","enableservicecharge":"Yes","creditnote":"Yes","tips":"Yes","autodebitinvoice":"Yes","paymentgateway":"Magpie","magpiepublickey":"pk_live_Z7O4DuiKv8kUAz3gTvF3tu","magpiesecretkey":"sk_live_lV5pcJ6jjZl6zSrMDO0HWR"},"branchid":{"workinghours":{"days":["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],"starttime":"08:00:00","endtime":"18:00:00"},"paymentterms":[],"status":"active","_id":"619f698507f63663cdf59381","branchname":"M PLACE","solutiontype":"Gym, Yoga & Fitness Center","currency":"PHP","startingnumber":"MPLACE10000","docformat":{"appointment":{"prefix":"MPLACE"},"bill":{"prefix":"MPLACE"},"billpayment":{"prefix":"MPLACE"},"booking":{"prefix":"MPLACE"},"challan":{"prefix":"MPLACE"},"creditnote":{"prefix":"MPLACE"},"expense":{"prefix":"MPLACE"},"facility":{"prefix":"MPLACE"},"joborder":{"prefix":"MPLACE"},"journal":{"prefix":"MPLACE"},"journalledger":{"prefix":"MPLACE"},"leaseorder":{"prefix":"MPLACE"},"payment":{"prefix":"MPLACE"},"invoice":{"prefix":"MPLACE"},"purchaseinvoice":{"prefix":"MPLACE"},"popayment":{"prefix":"MPLACE"},"purchaseorder":{"prefix":"MPLACE"},"purchaserequest":{"prefix":"MPLACE"},"quotation":{"prefix":"MPLACE"},"salesorder":{"prefix":"MPLACE"},"support":{"prefix":"MPLACE"}},"timezone":"Asia/Manila","startingusernumber":"MPLACES100","walletsetting":{"paymentType":["card","mobile"],"iswalletotpenable":false},"branchlogo":"https://res.cloudinary.com/dlopjt9le/image/upload/v1638359438/uwjthgukqxvsetzuii2e.png","locale":"en-IN","qrcode":"","updatedAt":"2022-06-15T07:41:28.935Z","iswalletenable":true,"property":{"country":"Philippines","address":"Ground Floor Mplace Mall Mother Ignacia St. South Triangle Q.c","pincode":395002,"paymentintergations":"magpie","supremamembergroup":"1043","deviceid":"540092688","supremausergroup":"1041","autodebit":true},"webqrcode":"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAJQAAACUCAYAAAB1PADUAAAAAklEQVR4AewaftIAAATtSURBVO3BQY4cSRIEQdNA/f/Lun30UwCJ9GoOuSaCP1K15KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkUnVYtOqhadVC06qVr0yUtAfpOaN4BMaiYgk5obIG+ouQHym9S8cVK16KRq0UnVok+WqdkE5A0gbwB5Q80NkEnNjZpNQDadVC06qVp0UrXoky8D8oSaJ4BMam7U3Ki5ATKpeUPNG0CeUPNNJ1WLTqoWnVQt+uQfA2RSMwGZ1ExAJjWTmhsgN2omIJOav9lJ1aKTqkUnVYs++ceoeUPNE0AmNROQCcik5l9yUrXopGrRSdWiT75MzZ8EZFIzAblRMwG5AXKjZpOa/5KTqkUnVYtOqhZ9sgzI30zNBGRSMwGZ1ExAboBMam6A/JedVC06qVp0UrUIf+QvBmRSMwG5UVN7TqoWnVQtOqla9MlLQCY1E5BNaiY1E5BJzQTkm4DcqJmATGomIJvUfNNJ1aKTqkUnVYs++cPUPAFkUjOpuVEzAblRcwPkCSCTmgnIJjU3QCY1b5xULTqpWnRStQh/ZBGQGzUTkCfU3AB5Qs0EZJOaN4A8oeZPOqladFK16KRq0ScvAblR84SaGyA3am6APKHmNwGZ1NwAmYBMaiYgk5pNJ1WLTqoWnVQt+uTLgLwBZFLzBJBJzQRkUjMBuVEzAZnU3ACZ1DyhZgIyAZnUfNNJ1aKTqkUnVYvwRxYBmdRsAvKEmgnIjZongExqboBMaiYgb6h5Asik5o2TqkUnVYtOqhZ98hKQGyA3am6ATGomIJOaCcikZgLyBJA31ExA3lDzhppNJ1WLTqoWnVQt+uQlNROQSc0EZAJyo2YCMqmZgExqJiBPANkEZFIzAZnU3ACZ1NwAmdRsOqladFK16KRqEf7IIiA3aiYgk5oJyBNqboDcqLkBMqmZgExqboBMat4A8oaaN06qFp1ULTqpWvTJS0AmNTdAJjUTkEnNBOQGyI2aGyA3aiYgk5obIJOaCcgbaiYgv+mkatFJ1aKTqkWffBmQGyCTmgnIpGYCcqNmAjKpeQLIpGYCcqPmRs0E5EbNE2q+6aRq0UnVopOqRZ/8MjUTkAnIpGYC8oaaCciNmgnIjZobIJOab1IzAblR88ZJ1aKTqkUnVYs++TI1E5BJzQRkAjKpuQEyAZnU3KiZgExqboBMam6AvAFkUjMBuVGz6aRq0UnVopOqRfgjfzEgN2omIJOaN4BMaiYgT6h5AsgmNW+cVC06qVp0UrXok5eA/CY1k5oJyDcBeULNBOQJIJOaTWo2nVQtOqladFK16JNlajYBuQEyqZmAvAFkUvOGmgnIjZon1NwAmYBMat44qVp0UrXopGrRJ18G5Ak1bwCZ1NwAmdRMaiYgk5oJyKTmCSCbgExqvumkatFJ1aKTqkWf/GPU3ACZ1ExAbtRMQCY1T6jZBOQGyI2aN06qFp1ULTqpWvTJ/xk1N2omIBOQGyBPqLkB8k1qNp1ULTqpWnRSteiTL1PzTWomIJOaGyA3aiYgN2omIDdAbtTcALlRMwH5ppOqRSdVi06qFn2yDMhvAvIEkEnNBGQCMqm5AfKEmhsgN2pugExqvumkatFJ1aKTqkX4I1VLTqoWnVQtOqladFK16KRq0UnVopOqRSdVi06qFp1ULTqpWnRSteikatFJ1aKTqkX/Aw17Qlrvsj/LAAAAAElFTkSuQmCC","standardplan":true,"createdAt":"2021-10-12T06:29:13.660Z","isqrenable":false,"iswebqrenable":true,"paymentmethods":[],"supportemail":"surgefitnessgymmplacemall@gmail.com","breaktime":[],"paymentsetting":{"acceptchecks":"Yes","acceptcash":"Yes","allowmemwallre":"No","acceptcreditcard":"Yes","requirebillingaddressforonlinepurchages":null,"acceptgiftcards":"Yes","enablecashbackforgiftcertificatebalance":"Yes","allowdiposit":"Yes","enabletipsgratuityforServices":"Yes","autotransfertipstopayouts":"Yes","enableservicecharge":"Yes","creditnote":"Yes","tips":"Yes","autodebitinvoice":"Yes","paymentgateway":"Magpie","magpiepublickey":"pk_live_Z7O4DuiKv8kUAz3gTvF3tu","magpiesecretkey":"sk_live_lV5pcJ6jjZl6zSrMDO0HWR"},"branchid":"619f698507f63663cdf59381","membersetting":{"allowcard":"1"},"staffsetting":{"allowcard":"1"}},"membersetting":{"allowcard":"1"},"staffsetting":{"allowcard":"1"}},"membersetting":{"allowcard":"1"},"staffsetting":{"allowcard":"1"}}
  bindData : any;

  @Output() onSaveSuccess3 : EventEmitter<any> = new EventEmitter<any>();

  checked : boolean = false;
  selectedField : any; 
  formFieldVisibile: boolean = false;

  public classes: any;

  constructor(
    private _commonService : CommonService,
    private elementRef:ElementRef
    ) {
    }

 async ngOnInit() {
    try{
      this.isLoading = true;
      await this.getformFields();
      await this.getLoadForm(); 
      this.isLoading = false;
    }catch(e){
      this.isLoading = false;
    }
  }

  ngAfterViewChecked(){
    this.classes = this.elementRef.nativeElement.querySelectorAll('.signaturepad');
    if(this.classes){
      this.classes.forEach((cls : HTMLElement) => {
        cls.addEventListener('click', this.handleAnchorClick);
      });
    }
    // if(this.classes){
    //   this.classes.addEventListener('click', this.handleAnchorClick);
    // }
  }

  ngAfterViewInit(){
    //this.signaturePadElement.fromDataURL("data:image/png;base64,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");
  }

  public handleAnchorClick = (event: Event) => {
    // Prevent opening anchors the default way
    const anchor = event.target as HTMLAnchorElement;
    this.selectedField = null;
    this.formFieldVisibile = false;
    setTimeout(() => {
      this.selectedField = this.getformfieldObj(anchor.id);
       if(this.selectedField && this.selectedField.fieldtype !== "checkbox" && this.selectedField.fieldtype !== "text" && this.selectedField.fieldtype !== "list" && this.selectedField.fieldtype !== "long_text") {
          $('#myModalFormfield').appendTo("body")
          $("#myModalFormfieldPopup").click();
          this.formFieldVisibile = true;
       }
    });
  }

  click(event : any){
    
  }

  async getformFields() {
 
    const url = "formfields/filter";
    const method = "POST";

    let postData = {};
    postData['search'] = [];
    postData["search"].push({"searchfield": "formname", "searchvalue": "Membership Contract", "criteria": "eq" });
    postData["search"].push({"searchfield": "status", "searchvalue": "active", "criteria": "eq"});

    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then((data: any) => {
        if(data) {
          this.formfields = [];
          this.formfields = data;
        }
    }, (error) =>{
      console.error(error);
    });

  }

  getformfieldObj(id: any) {
    return this.formfields.find(p=>p._id == id)
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [d.getFullYear(), pad(d.getMonth()+1), pad(d.getDate())].join('-')
  }

  getDayClassNames(value: any) {
    // if(value == "") {
    //   return "color: transparent"
    // } else {
    //   return "color: black";
    // }
  }

  async getLoadForm() {

    let postData = {};
    postData['search'] = [];
    postData["search"].push({"searchfield": "formname", "searchvalue": "Membership Contract", "criteria": "eq"});
    postData["search"].push({"searchfield": "status", "searchvalue": "active", "criteria": "eq"});

    const url =  "forms/filter";
    const method =  "POST";
    
    await this._commonService
      .commonServiceByUrlMethodDataAsync(url, method, postData)
      .then( (data: any) => {
        if(data) {
            console.log('data =>', data);
            if(data && data[0] && data[0]["doctemplate"]) {
              this.doctemplate = data[0]["doctemplate"];
              this.setupDocument();
            }
        }
    }, (error) =>{
      console.error(error);
    });

  }

  setupDocument(){
    var shortcode_regex_constant = /\[(\w+)+\.?(\w+)\.?(\w+)\]/mg;
    var th_constant: any = this;
    this.doctemplate.replace(shortcode_regex_constant, function (match_constant, code_constant) {
    var replace_str_constant = match_constant.replace('[', '');
    replace_str_constant = replace_str_constant.replace(']', '');
      if(replace_str_constant == "branchlogo" && th_constant._loginUserBranch && th_constant._loginUserBranch.branchlogo) {
        var branchlogo = th_constant._loginUserBranch.branchlogo
        var string_value = "<img id='" + replace_str_constant +"' src='"+ branchlogo +"' style='max-height: 150px; max-width: 200px;''>";
        th_constant.doctemplate = th_constant.doctemplate.replace("$[" + replace_str_constant + "]", string_value);
      }
    });
    let textDisplay;

    var shortcode_regex_user = /\[\((\w+)+\.?(\w+)\.?(\w+)\@?([\w ]+)\@?\#?([\w ]+)?\#?\)]/mg;
    var th_user: any = this;
    this.doctemplate.replace(shortcode_regex_user, function (match_user, code_user) {
      
      var replace_str_user = match_user.replace('[(', '');
      replace_str_user = replace_str_user.replace(')]', '');


      var displayname = replace_str_user.substring(
        replace_str_user.indexOf("@") + 1, 
        replace_str_user.lastIndexOf("@")
      );

      var fieldtype = replace_str_user.substring(
        replace_str_user.indexOf("#") + 1, 
        replace_str_user.lastIndexOf("#")
      );

      var fieldname = replace_str_user.replace('@' + displayname + '@','');
      fieldname = fieldname.replace('#' + fieldtype + '#','');

      let res = fieldname.split(".");
      console.log('res =>', res);
      var value = "";

      if(res[2]) {
        if(th_user.bindData && th_user.bindData[res[0]] && th_user.bindData[res[0]][res[1]] && th_user.bindData[res[0]][res[1]][res[2]]) {
          value = th_user.bindData[res[0]][res[1]][res[2]]
        }
      } else if (res[1]) {
        if(th_user.bindData && th_user.bindData[res[0]] && th_user.bindData[res[0]][res[1]]) {
          value = th_user.bindData[res[0]][res[1]]
        }
      } else {
        // value = th_user.bindData[res[0]]
      }

      if(fieldtype && fieldtype == 'image' && value && value !== '') {
        value = `<img src='${value}'>` 

      } else if (fieldtype && fieldtype == 'date' && value && value !== '') {
        value = `<span style='background-color: yellow'> ${new Date(value).toLocaleDateString(th_user._commonService.currentLocale())} </span>`;
      } else {
        value = `<span style='background-color: yellow'>${value ? value : displayname} </span>`;
      }
      th_user.doctemplate = th_user.doctemplate.replace("$[(" + replace_str_user + ")]", value ? value : displayname);
    });
    var shortcode_regex = /\[{(\w+)+\.?(\w+)\.?(\w+)\}]/mg;
    var th: any = this;
    this.doctemplate.replace(shortcode_regex, function (match: any, code: any) {
      var replace_str = match.replace('[{', '');
      replace_str = replace_str.replace('}]', '');
      var formfieldObj = th.getformfieldObj(replace_str);
      if(formfieldObj) {
        var htmlTemplate = "";
        if(formfieldObj.fieldtype == "text") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='text' name='attributename_" + replace_str +"' id='" + replace_str +"' value='"+ value +"'>"
        } else if (formfieldObj.fieldtype  == "long_text") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<textarea row='6' cols='50' name='attributename_" + replace_str +"' id='" + replace_str +"'>" + value + " </textarea>"
        } else if (formfieldObj.fieldtype == "checkbox") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          if(formfieldObj.lookupdata && formfieldObj.lookupdata.length > 0) {
            formfieldObj.lookupdata.forEach(element => {
              var checkedString = '';
              if(value && value.length > 0) {
                var valueObj = value.find(p=>p == element.key);
                if(valueObj)  checkedString = 'checked="checked"';
              }
              htmlTemplate += " <input type='checkbox' name='attributename_"+replace_str+"' id='" + replace_str +"' "+ checkedString +">"
            });
          }
        } else if (formfieldObj.fieldtype == "datepicker") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='date' name='attributename_" + replace_str +"' id='" + replace_str +"' value='"+ th.convertDate(value) +"' style='" + th.getDayClassNames(value) +  "'>"

        } else if (formfieldObj.fieldtype == "lookup" || formfieldObj.fieldtype == "form") {
          var value = formfieldObj && formfieldObj.value && formfieldObj.value.autocomplete_displayname ? formfieldObj.value.autocomplete_displayname : formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
          htmlTemplate = "<input type='text' id='" + replace_str +"' value='"+ value +"'>"
        } else if (formfieldObj.fieldtype == "signaturepad") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          if(value == "") {
            htmlTemplate = "<input type='text' class='"+ formfieldObj.fieldtype +"'  id='" + replace_str +"' val='"+ value +"' placeholder='Signature ....' class='custom-class'>"
          } else {
            htmlTemplate = "<img id='" + replace_str +"' src='"+ value +"' style='height: 100px; width: 100px'>"
          }
        } else if (formfieldObj.fieldtype == "list") {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          var checkedString = '';
          var optionString = "";
          optionString += "<option value=''></option>";
          if(formfieldObj.lookupdata && formfieldObj.lookupdata.length > 0) {
            formfieldObj.lookupdata.forEach(elementLookup => {
              if(value == elementLookup.value) {
                checkedString = "selected"
              }
              optionString += "<option value='"+ elementLookup.value +"' "+ checkedString +">"+ elementLookup.value +"</option>"
            });
          }
          htmlTemplate = "<select name='attributename_" + replace_str +"' id='" + replace_str +"'> "+ optionString +" </select>"
        } else {
          var value = formfieldObj && formfieldObj.value ? formfieldObj.value : '';
          htmlTemplate = "<input type='text' id='" + replace_str +"' value='"+ value +"'>"
        }
        if(formfieldObj.fieldtype == "mobile" || formfieldObj.fieldtype == "alternatenumber" || formfieldObj.fieldtype == "whatsappnumber") {
          textDisplay = formfieldObj && formfieldObj.value && formfieldObj.value.number ? formfieldObj.value.number : formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        } else if (formfieldObj.fieldtype == "lookup" || formfieldObj.fieldtype == "form") {
          textDisplay = formfieldObj && formfieldObj.value && formfieldObj.value.autocomplete_displayname ? formfieldObj.value.autocomplete_displayname : formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        } else {
          textDisplay = formfieldObj && formfieldObj.value ? formfieldObj.value : formfieldObj.displayname
        }

        // if (data[0].addedby == th._loginUserId){
        //   th.btnDisable = true;
        // }

        // if(th.btnDisable) {
        //   formcontrol = `<span id="${replace_str}">${htmlTemplate}</span>`;
        // } else {
          // formcontrol = `<a id="${replace_str}">${htmlTemplate}</a>`;
        //}
      }
      if (htmlTemplate) {
        th.doctemplate = th.doctemplate.replace("$[{" + replace_str + "}]", htmlTemplate);
      }
    });
  }

  onNext(){
    let confirmModel = {};
    confirmModel['property'] = {};
    this.formfields.forEach(element => {
      if(element.fieldtype == "text" || element.fieldtype == "list" || element.fieldtype == "long_text") {
        confirmModel['property'][element['fieldname']] = $(`#${element._id}`).val();
      } else if(element.fieldtype == "checkbox") {
        var elems = document.getElementsByName("attributename_" + element._id);
        for(var i = 0; i < elems.length; i++) {
          if(elems[i]["checked"] == true) {
            if(element.lookupdata && element.lookupdata.length > 0 && element.lookupdata[i] && element.lookupdata[i]["key"]) {
              if(!element.value) {
                element.value = [];
              }
              element.value.push(element.lookupdata[i]["key"]);
              if(!confirmModel['property'][element['fieldname']]) {
                confirmModel['property'][element['fieldname']] = [];
              }
              confirmModel['property'][element['fieldname']].push(element.lookupdata[i]["key"]);
            }
          }
        }
      } else if(element.fieldtype == "datepicker") {
        var elems = document.getElementsByName("attributename_" + element._id);
        for(var i = 0; i < elems.length; i++) {
          if(elems[i]["value"] && elems[i]["value"] !== "") {
            var dateString = elems[i]["value"].split("-");
            if(dateString && dateString[2]) {
              var d = new Date();
              d.setFullYear(dateString[0]);
              d.setMonth(dateString[1] - 1);
              d.setDate(dateString[2]);
              element.value = d;
              confirmModel['property'][element['fieldname']] = d;
            }
          }
        }
      }
    });
    console.log('confirmModel =>', confirmModel);
    this.onSaveSuccess3.emit(confirmModel);
  }

 async onSaveSign(selectedField : any){
    console.log('selectedField in pd =>',selectedField);
    this.selectedField = selectedField;
    let fieds = this.formfields.find(a=>a._id == selectedField._id);
    fieds  = this.selectedField;
    this.isLoading = true;
    await this.getLoadForm();
    this.isLoading = false;
  }

 


}
