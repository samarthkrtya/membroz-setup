import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpHeaders, HttpParams } from "@angular/common/http";

import { retry, catchError, tap } from 'rxjs/operators';

import { Configuration } from './../../../app.constants';

@Injectable({
  providedIn: 'root'
})

export class CommonService {

  constructor(
    private httpClient: HttpClient,
    private configuration: Configuration
  ) {

  }
    
  public commonServiceByUrlMethodIdOrDataAsync(url: string, method: string, id?: string, data?: any) {
    let urlstring = this.configuration.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != "") {
        urlstring = urlstring + id;
      }
      if (method != "") {
        if (method == "GET") {
          return this.httpClient
            .get(urlstring, { headers: this.configuration.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {

          const toAdd = JSON.stringify(data);
          return this.httpClient
            .get(urlstring)
            .toPromise();

        } else if (method == "DELETE" && (id != null || "")) {
          if (data !== undefined && data.formname !== undefined) {
            if (!this.configuration.headers.has("formname")) {
              this.configuration.headers.append("formname", data.formname);
            }
          }
          console.log("urlstring", urlstring);
          return this.httpClient
            .delete(urlstring, { headers: this.configuration.headers })
            .toPromise();
        }
      } else {
        return this.httpClient
          .get(urlstring, { headers: this.configuration.headers })
          .toPromise();
      }
    }
  }

  public commonServiceByUrlMethodIdOrData(url: string, method: string, id?: string, data?: any) {
    let urlstring = this.configuration.actionUrl;

    if (url != "") {
      urlstring = urlstring + url;
      if (id != "") {
        urlstring = urlstring + id;
      }
      if (method != "") {
        if (method == "GET") {
          return this.httpClient
            .get(urlstring, { headers: this.configuration.headers })
        } else if (method == "GET" && (data != null || "")) {

          const toAdd = JSON.stringify(data);
          return this.httpClient
            .get(urlstring)

        } else if (method == "PUT") {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.configuration.headers })

        } else if (method == "DELETE" && (id != null || "")) {
          if (data !== undefined && data.formname !== undefined) {
            if (!this.configuration.headers.has("formname")) {
              this.configuration.headers.append("formname", data.formname);
            }
          }
          return this.httpClient
            .delete(urlstring, { headers: this.configuration.headers })
        }
      } else {
        return this.httpClient
          .get(urlstring, { headers: this.configuration.headers })
      }
    }
  }

  public commonServiceByUrlMethodData(url: string, method: string, data: any, id?: string) {

    let urlstring = this.configuration.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { headers: this.configuration.headers })
        } else if (method == "PATCH" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .patch(urlstring, toAdd, { headers: this.configuration.headers })
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.configuration.headers })
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { headers: this.configuration.headers })
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { headers: this.configuration.headers })
      }
    }
  }

  public commonServiceByUrlMethodDataAsync(url: string, method: string, data: any, id?: string) {

    let urlstring = this.configuration.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { headers: this.configuration.headers })
            .toPromise();
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { headers: this.configuration.headers })
            .toPromise();
        } else if (method == "PATCH" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .patch(urlstring, toAdd, { headers: this.configuration.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { headers: this.configuration.headers })
            .toPromise();
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { headers: this.configuration.headers })
          .toPromise();
      }
    }
  }

  public commonServiceByUrlMethodDataPagination(url: string, method: string, data: any, id?: string) {


    let urlstring = this.configuration.actionUrl;
    if (url != "") {
      urlstring = urlstring + url;
      if (id != undefined && id != "") {
        urlstring = urlstring + "/" + id;
      }
      if (method != "") {

        if (method == "POST" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .post(urlstring, toAdd, { observe: "response", headers: this.configuration.headers })
            .toPromise();
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, { observe: "response", headers: this.configuration.headers })
            .toPromise();
        } else if (method == "GET" && (data != null || "")) {
          return this.httpClient
            .get(urlstring, { observe: "response", headers: this.configuration.headers })
            .toPromise();
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, { observe: "response", headers: this.configuration.headers })
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
    let urlstring = this.configuration.actionUrl;
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
              headers: this.configuration.headers,
              responseType: 'blob',
            })
        } else if (method == "PUT" && (data != undefined || null)) {
          const toAdd = JSON.stringify(data);
          return this.httpClient
            .put(urlstring, toAdd, {
              headers: this.configuration.headers,
              responseType: 'blob',
            })
        }
      } else {
        const toAdd = JSON.stringify(data);
        return this.httpClient
          .post(urlstring, toAdd, {
            headers: this.configuration.headers,
            responseType: 'blob',
          })
      }
    }
  };



  public currentLocale() {
    return  "en-IN";
  }
}
