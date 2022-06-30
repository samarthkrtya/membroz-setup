import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
@Injectable()
export class Configuration {

  public Server: string;
  public actionUrl: string;
  public headers: HttpHeaders = new HttpHeaders();

  public serverBaseUrl: '';
  public baseUrl: string;

  public ipAddress: any;


  constructor(private httpClient: HttpClient) {

    this.getIPAddress();

    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('authKey', '613074c9bfd7602f90774d32');
    
    this.baseUrl = location.origin + '/#';

      if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        //this.Server = 'http://localhost:3001/';
        this.Server = 'https://surgefitnesslifestyle.membroz.com/';
        this.actionUrl = this.Server + 'api/';
      } else {
        this.Server = 'https://' + location.hostname + '/';
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
