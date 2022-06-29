import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs/Observable";

import { retry, catchError, tap } from 'rxjs/operators';




@Injectable({
  providedIn: 'root'
})

export class CommonService {

  public headers: HttpHeaders = new HttpHeaders();
  actionUrl : string = 'https://surgefitnesslifestyle.membroz.com/api/';
  
  constructor(
    private httpClient: HttpClient,
  ) {

    this.headers = this.headers.set('Content-Type', 'application/json');
    this.headers = this.headers.set('Accept', 'application/json');
    this.headers = this.headers.set('Access-Control-Allow-Origin', '*');
    this.headers = this.headers.set('authKey', '613074c9bfd7602f90774d32');
  }
    
  public commonServiceByUrlMethodIdOrDataAsync(url: string, method: string, id?: string, data?: any) {
    let urlstring = this.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != "") {
        urlstring = urlstring + id;
      }
      if (method != "") {
        if (method == "GET") {
          return this.httpClient
            .get(urlstring, { headers: this.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {

          const toAdd = JSON.stringify(data);
          return this.httpClient
            .get(urlstring)
            .toPromise();

        } else if (method == "DELETE" && (id != null || "")) {
          if (data !== undefined && data.formname !== undefined) {
            if (!this.headers.has("formname")) {
              this.headers.append("formname", data.formname);
            }
          }
          console.log("urlstring", urlstring);
          return this.httpClient
            .delete(urlstring, { headers: this.headers })
            .toPromise();
        }
      } else {
        return this.httpClient
          .get(urlstring, { headers: this.headers })
          .toPromise();
      }
    }
  }

  public commonServiceByUrlMethodIdOrData(url: string, method: string, id?: string, data?: any) {
    let urlstring = this.actionUrl;

    if (url != "") {
      urlstring = urlstring + url;
      if (id != "") {
        urlstring = urlstring + id;
      }
      if (method != "") {
        if (method == "GET") {
          return this.httpClient
            .get(urlstring, { headers: this.headers })
        } else if (method == "GET" && (data != null || "")) {

          const toAdd = JSON.stringify(data);
          return this.httpClient
            .get(urlstring)

        } else if (method == "PUT") {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.headers })

        } else if (method == "DELETE" && (id != null || "")) {
          if (data !== undefined && data.formname !== undefined) {
            if (!this.headers.has("formname")) {
              this.headers.append("formname", data.formname);
            }
          }
          return this.httpClient
            .delete(urlstring, { headers: this.headers })
        }
      } else {
        return this.httpClient
          .get(urlstring, { headers: this.headers })
      }
    }
  }

  public commonServiceByUrlMethodData(url: string, method: string, data: any, id?: string) {

    let urlstring = this.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { headers: this.headers })
        } else if (method == "PATCH" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .patch(urlstring, toAdd, { headers: this.headers })
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.headers })
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { headers: this.headers })
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { headers: this.headers })
      }
    }
  }

  public commonServiceByUrlMethodDataAsync(url: string, method: string, data: any, id?: string) {

    let urlstring = this.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { headers: this.headers })
            .toPromise();
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.headers })
            .toPromise();
        } else if (method == "PATCH" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .patch(urlstring, toAdd, { headers: this.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { headers: this.headers })
            .toPromise();
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { headers: this.headers })
          .toPromise();
      }
    }
  }

  public commonServiceByUrlMethodDataPagination(url: string, method: string, data: any, id?: string) {


    let urlstring = this.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { observe: "response", headers: this.headers })
            .toPromise();
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { observe: "response", headers: this.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { observe: "response", headers: this.headers })
            .toPromise();
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { observe: "response", headers: this.headers })
          .toPromise();
      }
    }
  }

  public commonServiceByUrlMethodDataExpo(
    url: string,
    method: string,
    data: any,
    id?: string
  ) {
    let urlstring = this.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {
        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, {
              headers: this.headers,
              responseType: 'blob',
            })
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, {
              headers: this.headers,
              responseType: 'blob',
            })
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, {
            headers: this.headers,
            responseType: 'blob',
          })
      }
    }
  };



  public currentLocale() {
    return  "en-IN";
  }
}
