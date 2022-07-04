import { OnInit, Pipe, PipeTransform } from '@angular/core';
import { CurrencyPipe } from '@angular/common';

@Pipe({
    name: "myCurrencyPipe"
})
export class MyCurrencyPipe implements PipeTransform {

    currencyCode: string = '';
    isAppCurr = false;
    currentuserBranch: any;

    constructor(
        private currencyPipe: CurrencyPipe,
    ) { 
    }

    transform(value: any , currencycode: string ): string {
        let transformed = this.currencyPipe.transform(value, currencycode, 'symbol-narrow');
        return transformed;
    }

}