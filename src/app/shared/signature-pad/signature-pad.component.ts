import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { NgxSignaturePadComponent, SignaturePadOptions } from "@o.krucheniuk/ngx-signature-pad";
declare var $ : any;

@Component({
  selector: 'app-signature-pad',
  templateUrl: './signature-pad.component.html',
})
export class SignaturePadComponent implements OnInit {

  @Input() selectedField : any;
  @Output() onSave = new EventEmitter();
  @ViewChild("testPadTest", { static: false }) signaturePadElement: NgxSignaturePadComponent;

  config: SignaturePadOptions = {
    minWidth: 1,
    maxWidth: 5,
    penColor: "blue"
  };
  
  constructor() { }

  ngOnInit(): void {
    console.log('ngOnInit selectedField =>', this.selectedField);
    let canvas = document.getElementsByTagName('canvas')[0];
    setTimeout(() => {
      if(canvas){
          canvas.height = 157;
          canvas.width = 300;  
      }
      this.clear();
    }, 1000);
  }

  clear(){
    this.signaturePadElement.clear();
  }
  save(){
    $("#closesign").click();
    this.selectedField.value = this.signaturePadElement.toDataURL();
    this.onSave.emit(this.selectedField);
  }
  

}
