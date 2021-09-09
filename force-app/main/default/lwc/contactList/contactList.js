import { LightningElement, wire } from 'lwc';
import getContacts from '@salesforce/apex/ContactController.getContacts';
import FIRST_NAME from '@salesforce/schema/Contact.FirstName';
import LAST_NAME from '@salesforce/schema/Contact.LastName';
import EMAIL from '@salesforce/schema/Contact.Email';
import { reduceErrors } from 'c/ldsUtils';

const columns = [
    {label:'First Name',fieldName:FIRST_NAME.fieldApiName,type:'text'},
    {label:'Last Name',fieldName:LAST_NAME.fieldApiName,type:'text'},
    {label:'Email',fieldName:EMAIL.fieldApiName,type:'text'},
];

export default class ContactList extends LightningElement {
    column = columns;
    response = [];
    errors = [];

    get errors(){
        return (this.response.error)?reduceErrors(this.response.error):[];
    }

    @wire(getContacts)
    contacts({error,data}){
        if(error){
            console.log('error ',reduceErrors(error));
            this.errors = reduceErrors(error);
        }
        if(data){
           this.response = data;
        }
    }

}