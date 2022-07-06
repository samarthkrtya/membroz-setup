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
    let authKey = localStorage.getItem('authKey');
    let domain = localStorage.getItem('domain');
    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('authKey', '5e954c7b9df11624f81e785b');
    if(authKey){
      this.headers = this.headers.delete('authKey');
      this.headers = this.headers.set('authKey', authKey);
    }

    if(domain){
      this.headers = this.headers.delete('domain');
      this.headers = this.headers.set('domain', domain);
      this.Server = domain+'/';
    }else{
      this.Server = 'https://app.membroz.com/';
    }
    
    
    this.baseUrl = location.origin + '/#';
     if (location.hostname === 'localhost' || location.hostname === '127.0.0.1') {
        this.Server = 'http://localhost:3001/';
        this.actionUrl = this.Server + 'api/';
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
