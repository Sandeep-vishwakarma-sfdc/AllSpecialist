import { LightningElement } from 'lwc';
import {ShowToastEvent} from 'lightning/platformShowToastEvent'
import FIRST_NAME from '@salesforce/schema/Contact.FirstName'
import LAST_NAME from '@salesforce/schema/Contact.LastName'
import EMAIL from '@salesforce/schema/Contact.Email'
import OBJECT_API_NAME from '@salesforce/schema/Contact'
export default class ContactCreator extends LightningElement {

    object_api_name = OBJECT_API_NAME;
    fileds = [FIRST_NAME,LAST_NAME,EMAIL];

    handleSuccess(event){
        this.dispatchEvent(new ShowToastEvent({title:'Contact Created',message:'Contact record Id '+event.detail.id,varient:'success'}));
    }

}