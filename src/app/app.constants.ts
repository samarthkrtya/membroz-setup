import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class Configuration {

  public Server: string;
  public liveServer: string;
  public actionUrl: string;
  public headers: HttpHeaders = new HttpHeaders();

  public serverBaseUrl: '';
  public baseUrl: string;

  public ipAddress: any;


  constructor(private httpClient: HttpClient) {

    this.getIPAddress();
    let authKey = localStorage.getItem('authKey');
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('authKey', '5e954c7b9df11624f81e785b');
    
    if(authKey){
      this.headers = this.headers.set('authKey', authKey);
    }
    
    this.baseUrl = location.origin + '/#';
    this.liveServer = 'https://app.membroz.com';
    
      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        this.Server = 'https://app.membroz.com/';
        // this.Server = 'https://surgefitnesslifestyle.membroz.com';
        this.actionUrl = this.Server + 'api/';
        this.liveServer = 'http://localhost:4200/';
      } else {
        //this.Server = 'https://' + location.hostname + '/';
        this.Server = 'https://app.membroz.com/';
        this.actionUrl = this.Server + 'api/';
      }
  }

  getIPAddress() {
    this.httpClient.get("https://api.ipify.org/?format=json").subscribe((res:any)=>{
      this.ipAddress = res.ip;
      this.headers = this.headers.set('ipaddress', this.ipAddress);
    });
  }
}
