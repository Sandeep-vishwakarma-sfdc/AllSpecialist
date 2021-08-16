import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent';
import ACCOUNT_OBJECT from '@salesforce/schema/Account';
import NAME_FIELD from '@salesforce/schema/Account.Name';
import REVENUE_FIELD from '@salesforce/schema/Account.AnnualRevenue';
import INDUSTRY_FIELD from '@salesforce/schema/Account.Industry';

export default class AccountCreator extends LightningElement {

    objectApiName = ACCOUNT_OBJECT;
    fields = [NAME_FIELD,REVENUE_FIELD,INDUSTRY_FIELD];

    onSuccess(event){
        this.dispatchEvent(new ShowToastEvent({title:'Account Created',message:'Record Id: '+event.detail.id,varient:'success'}));
    }
}