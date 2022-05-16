import { LightningElement, track } from 'lwc';
import getGTMOutlook from '@salesforce/apex/GTMOutlook.getGTMOutlook';

import updateGtmDetails from '@salesforce/apex/GTMOutlook.updateGtmDetails';


export default class GtmOutlook extends LightningElement {
    @track GTMOutlookDetails = [];
    @track paginatedGTMOutlookDetails;
    @track error;
    @track pending=true;
 
    Promise = getGTMOutlook();
 
    connectedCallback() {
        getGTMOutlook().then(result => {
                       result.forEach(element => {
                let obj = {
                    id : element.Id,
                    customerName :element.GTM_Customer__r?element.GTM_Customer__r.Name:'',
                    Estimated_Growth_PY_to_CY__c :'',
                    Estimated_Growth_PY_to_NY__c :'',
                    Estimated_Growth_NY_to_2NY__c : '',
                 }
                this.GTMOutlookDetails.push(obj);
            });
            setTimeout(() => {
                
                this.paginatedGTMOutlookDetails = this.GTMOutlookDetails;
            }, 200);
            console.log('Data', result);
        })
        .catch(error => {
            this.error = error;
            console.log('Error Data', error)
        })
        .finally(() => {
            this.pending = false
        });
    }

    handleFieldChange(event) {
        console.log(event.target.value);
        let value=event.target.value;
        let apiName=event.currentTarget.dataset.name;
        let recordId=event.currentTarget.dataset.id;

       updateGtmDetails({apiName:apiName, value:value, recordId:recordId}).then(result=>{
           console.log('Result-->',result);
       })
    
       }
       handlePaginationAction(event){
           this.paginatedGTMOutlookDetails=event.detail.values;
       }

       handleSort(event){
           let fieldName = event.target.name;
           this.sortDirection == !this.sortDirection;
           this.sortData(fieldName,this.sortDirection);
       }

       sortData(fieldname, direction) {
        direction==true?'asc':'des';
        console.log('Field Name ',fieldname,' direction ',direction);
        let parseData = JSON.parse(JSON.stringify(this.paginatedGTMOutlookDetails));
        let keyValue = (a) => {
            return a[fieldname];
        };
        let isReverse = direction === 'asc' ? 1: -1;
           parseData.sort((x, y) => {
            x = keyValue(x) ? keyValue(x) : ''; 
            y = keyValue(y) ? keyValue(y) : '';
            return isReverse * ((x > y) - (y > x));
        });
        this.paginatedGTMOutlookDetails = parseData;
    }

    handleFilterPanelAction(event){
        let filtersValue = JSON.parse(JSON.stringify(event.detail));
        this.setFilterOnCustomer(filtersValue);
    }

    setFilterOnCustomer(filtersValue){
        console.log('In filtersValue -------------->',filtersValue);
        let search = filtersValue.search.length != 0;
        let filter1 = filtersValue.filter1.length!=0 && filtersValue.filter1!='Both';
        let filter2 = filtersValue.filter2.length!=0 && filtersValue.filter2 !='None';
        let serachValue = filtersValue.search;
        let filter1Value = filtersValue.filter1;
        let filter2Value = filtersValue.filter2;
        if (filter1Value == "Lead Customer") {
            filter1Value=true;
        }
        if (filter1Value == "Non Lead Customer") {
            filter1Value=false;
        }
        console.log('Search String Length', serachValue.length);

    }
}