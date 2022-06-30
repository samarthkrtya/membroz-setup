
import { Component, OnInit } from "@angular/core";
import { Observable } from 'rxjs';
import { Router, ActivatedRoute } from "@angular/router";

import { AppInjector } from "../../app-injector.service";

import { LangresourceService } from '../../core/services/langresource/langresource.service';
import { SafeHtml } from '@angular/platform-browser';

declare var $: any;

@Component({
  selector: 'app-base-componemnt',
  templateUrl: './base-componemnt.component.html',
  styles: [
  ]
})
export class BaseComponemntComponent implements OnInit {

  protected _langresourceService: LangresourceService;

  protected _router: Router;

  public langResource: any;
  public defaultLanguage: any;
  public pagename: any;

  constructor(
  ) { 
    const injector = AppInjector.getInjector();
    this._langresourceService = injector.get(LangresourceService);
    this._router = injector.get(Router);
  }

  async ngOnInit() {

    this.defaultLanguage = "ENG";
    
    this.langResource = {};

    await this.initialize(); // LOGIN VARIABLES

    try {
      if (this.pagename) {
        await this.loadLangResource(this.pagename); // INITIALIZE LANG VARIABLE
      }
    } catch (error) {
      console.error({ error });
    } finally {
    }

  }

  async initialize() {
    return;
  }

  async loadLangResource(pageName: any) {

    let postData = {};
    postData["search"] = [];
    postData["search"].push({ searchfield: "componentname", searchvalue: pageName, datatype: "text", criteria: "eq" });
    postData["search"].push({ searchfield: "key", searchvalue: true, datatype: "Boolean", criteria: "exists" });

    await this._langresourceService
      .AsyncGetByFilter(postData)
      .then((data) => {
        if (data && Array.isArray(data) && data.length !== 0) {
          this.langResource = {};
          data.forEach((element) => {
            if (element.key && element.value) {
              this.langResource[element.key] = [];
              this.langResource[element.key] = element["value"][this.defaultLanguage] ? element["value"][this.defaultLanguage] : element.key;
            }
          });
        }
      });
  }

  public getLang(key: string, value: string) {
    return this.langResource && this.langResource[key] ? this.langResource[key] : value;
  }

  showNotification(from: any, align: any, msg: any, type: any) {
    $.notify(
      {
        icon: "notifications",
        message: msg,
      },
      {
        type: type,
        timer: 3000,
        placement: {
          from: from,
          align: align,
        },
        z_index: 1070
      }
    );
  }

}
