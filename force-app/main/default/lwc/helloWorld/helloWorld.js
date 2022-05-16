import { LightningElement,track,wire } from 'lwc';
import getAccountMap from '@salesforce/apex/AccountController.getAccountMap';

// import getContacts from '@salesforce/apex/AccountController.getContacts';
let i=0;
import helloWorld from './helloWorld.html';
export default class HelloWorld extends LightningElement {
    greeting = 'World';
    @track items = [];
    @track value = '';
    options = [{label:'Moon',value:''},{label:'Star',value:''},{label:'Earth',value:''},{label:'Sun',value:''}];
    changeHandler(event) {
      this.greeting = event.target.value;
    }
    // @wire(getContacts)
    // wiredContacts({ error, data }) {
    //     if (data) {
    //         for(i=0; i<data.length; i++) {
    //             console.log('id=' + data[i].Id);
    //             this.items = [...this.items ,{value: data[i].Id , label: data[i].Name}];                                   
    //         }                
    //         this.error = undefined;
    //     } else if (error) {
    //         this.error = error;
    //         this.contacts = undefined;
    //     }
    // }

    connectedCallback(){
      getAccountMap().then(data=>{
        console.log('map ',data);
      }).catch(err=>{
        console.log(err);
      })
    }

    renderedCallback(){
      
    }

    handlebox(){
      let ele = this.template.querySelector('slds-dropdown_lenght-with-icon-7');
      if(ele){
      ele.className = 'slds-listbox slds-listbox_vertical slds-dropdown slds-dropdown_fluid slds-dropdown_left slds-dropdown_lenght-with-icon-3';
      }
      console.log('ele ',ele);
    }

     get statusOptions() {
        console.log(this.items);
        return this.items;
    }
    handleChange(){

    }

    handleSelect(event){
      console.log('value ',event.target.value);
    }
}