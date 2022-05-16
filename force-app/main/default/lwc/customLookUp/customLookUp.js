import lookUp from '@salesforce/apex/Lookup.search';
import { api, LightningElement, track, wire } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

export default class CustomLookUp extends LightningElement {
    @api objName='Account';
    @api iconName='standard:account';
    @api filter = `Name!=null`;
    @api searchPlaceholder='Search';
    
    @track selectedName;
    @track records;
    @track isValueSelected;
    @track blurTimeout;
    searchTerm = '';
    @track lookupSelectedId = '';

    @api
    get outputValue() {
        return this.lookupSelectedId;
    }

    //css
    @track boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    @track inputClass = '';
    @wire(lookUp, {searchTerm : '$searchTerm', myObject : '$objName', filter : '$filter'})
    wiredRecords({ error, data }) {
        if (data) {
            this.error = undefined;
            this.records = data;
            console.log('Data ',this.records);
        } else if (error) {
            this.error = error;
            this.records = undefined;
            console.log('error while ',this.error);
        }
    }

    connectedCallback(){
        console.log(`searchTerm : ${this.searchTerm}, myObject : ${this.objName}, filter : ${this.filter} `);
    }

    handleClick() {
        this.searchTerm = '';
        this.inputClass = 'slds-has-focus';
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus slds-is-open';
    }
    onBlur() {
        this.blurTimeout = setTimeout(() =>  {this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus'}, 300);
    }
    onSelect(event) {
        let selectedId = event.currentTarget.dataset.id;
        let selectedName = event.currentTarget.dataset.name;
        this.lookupSelectedId = selectedId;
        const valueSelectedEvent = new CustomEvent('lookupselected', {detail:  selectedId });
       
        this.dispatchEvent(new FlowAttributeChangeEvent('outputValue', selectedId));

        this.dispatchEvent(valueSelectedEvent);
        this.isValueSelected = true;
        this.selectedName = selectedName;
        if(this.blurTimeout) {
            clearTimeout(this.blurTimeout);
        }
        this.boxClass = 'slds-combobox slds-dropdown-trigger slds-dropdown-trigger_click slds-has-focus';
    }

    handleRemovePill() {
        this.isValueSelected = false;
    }

    onChange(event) {
        this.searchTerm = event.target.value;
    }
}