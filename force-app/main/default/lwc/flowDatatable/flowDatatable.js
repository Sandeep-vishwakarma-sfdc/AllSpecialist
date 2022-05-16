import { LightningElement,api } from 'lwc';

export default class FlowDatatable extends LightningElement {
    @api records = [];
    @api fieldColumns = [
        { label: 'Name', fieldName: 'Name' },
        { label: 'Title', fieldName: 'Title'},
        { label: 'Department', fieldName: 'Department' }
    ];
    viewRecord = false;
    recId = '';
   
    connectedCallback(){
        this.records = JSON.parse(JSON.stringify(this.records));
    }

    handleViewRecord(event){
        this.viewRecord = true;
        console.log('event.target.key ',event.target);
        this.recId = event.target.id.split('-')[0];
    }

    handleCancleRecord(event){
        this.viewRecord = false;
    }
}