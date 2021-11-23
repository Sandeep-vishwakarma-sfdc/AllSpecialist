import { LightningElement,track, wire } from 'lwc';
import allAccounts from '@salesforce/apex/AccountController.getAllAccounts';

const columns = [
    { label: 'Name', fieldName: 'Name' },
    { label: 'Type', fieldName: 'Type'},
    { label: 'BillingStreet', fieldName: 'BillingStreet'},
    { label: 'BillingCountry', fieldName: 'BillingCountry'},
    { label: 'Phone', fieldName: 'Phone'},
    { label: 'CreatedDate', fieldName: 'CreatedDate', type: 'date' },
    { label: 'LastModifiedDate', fieldName: 'LastModifiedDate', type: 'date' },
];
export default class DistributorTable extends LightningElement {
    @track accounts = [{Id:'',Name:'',Type:'',BillingStreet:'',BillingCountry:'',Phone:'',CreatedDate:'',LastModifiedDate:''}];

    paginatedData = [];
    columns = columns;
    pagesize = 10;
    @wire(allAccounts)
    getAccounts({error,data}){
        console.log('Accounts ',data);
        this.accounts = data;
    }
    
    handlePaginationAction(event){
        console.log('Detail ',event.detail.values);
        this.paginatedData = event.detail.values;
    }
}