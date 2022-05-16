import { LightningElement, track, api, wire } from 'lwc';
import { refreshApex } from '@salesforce/apex';
import { updateRecord } from "lightning/uiRecordApi";
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { NavigationMixin } from 'lightning/navigation';
import STATUS__c from "@salesforce/schema/Product_Category_Sales_Org_Mapping__c.Status__c";
import updateProductCategoryMapStatus from '@salesforce/apex/GtmProductCompetition.updateProductCategoryMapStatus';
import getproductList from '@salesforce/apex/GtmProductCompetition.getproductList';
import checkStatus from '@salesforce/apex/GtmProductCompetition.checkStatus';
export default class GtmProductCategory extends LightningElement {
  @wire(getproductList) gtmWrapList;
  @track productCategorySalesorgMapping = [];
  @track paginatedProductCategorySalesorgMapping = [];
  @track dragStart = '';
  @track lstpscm = [];
  @track ProductCategoryMapStatusUpdated = [];
  @api
  recordId;
  @track mapDataSave = [];

  handlePaginationAction(event) {
    this.paginatedProductCategorySalesorgMapping = event.detail.values;
  }
  connectedCallback() {
    this.refreshData();
  }

  refreshData() {
    getproductList().then(data => {
      console.log('DATA++++++++++++++', data);
      this.productCategorySalesorgMapping = data;
    }).catch(err => console.log(err));
  }

  handleChangeCheckbox(event) {
    console.log(event);
    let res = event.target.checked;
    let key = event.target.dataset.id;
    console.log('res ++++++', res);
    console.log('key++++++++', key);

    // this.paginatedProductCategorySalesorgMapping.forEach(ele => {
    //   if (ele.productCategorySalesOrgMappingId == key) {
    //     let elefound = this.mapDataSave.find(e => e.productCategorySalesOrgMappingId == key);
    //     console.log('elefound = ', elefound);

    //     if (elefound) {
    //       console.log('if = ', elefound);
    //       elefound.status = res;
    //     } else {
    //       console.log('else = ', elefound);
    //       this.mapDataSave.push(JSON.parse(JSON.stringify(ele)));
    //       let elefound1 = this.mapDataSave.find(e => e.productCategorySalesOrgMappingId == key);
    //       elefound1.status = res;
    //     }

    //   }

    // });
    // console.log('HIiiiii+++++++', this.mapDataSave);

    let pcid = event.target.dataset.pc;
    let status = false;
    checkStatus({ pcid: pcid }).then(ischecked => {
      if (ischecked) {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Warning',
            message: 'GTM detail already created',
            variant: 'warning'
          })
        );
        status = true;
      }
      let index = this.productCategorySalesorgMapping.findIndex(elem => elem.productCategorySalesOrgMappingId == key);
        this.productCategorySalesorgMapping[index].status = status;
        setTimeout(() => {
          this.paginatedProductCategorySalesorgMapping = this.productCategorySalesorgMapping;
        }, 200);

    })

  }

  SavehandleClick(event) {
    console.log('Hello Welcome +++++', this.mapDataSave);
    updateProductCategoryMapStatus({ statusmap: JSON.stringify(this.mapDataSave) }).then(result => {
      console.log('result = ' + result);
      this.refreshData();
      this.dispatchEvent(
        new ShowToastEvent({
          title: 'Success',
          message: 'Status updated successfully',
          variant: 'success'

        })
      );
    })
      .catch(error => {
        this.dispatchEvent(
          new ShowToastEvent({
            title: 'Error updating status',
            message: error.body.message,
            variant: 'error'
          })
        );
      });
  }
  CanclehandleClick() {
  }

  DragStart(event) {
    this.dragStart = event.target.title;
    event.target.classList.add("drag");
    console.log(this.DragStart);
  }

  DragOver(event) {
    event.preventDefault();
    return false;
  }

  Drop(event) {
    event.stopPropagation();
    const DragValName = this.dragStart;
    const DropValName = event.target.title;
    console.log('41', this.DragStart);
    if (DragValName === DropValName) {
      return false;
    }
    const index = DropValName;
    const currentIndex = DragValName;
    const newIndex = DropValName;
    Array.prototype.move = function (from, to) {
      this.splice(to, 0, this.splice(from, 1)[0]);

    };

    let test = JSON.parse(JSON.stringify(this.paginatedProductCategorySalesorgMapping));
    //console.log('Welcome', test);
    this.paginatedProductCategorySalesorgMapping = test;
    //console.log('Hello ', this.paginatedProductCategorySalesorgMapping);
    this.paginatedProductCategorySalesorgMapping.move(currentIndex, newIndex);
    //this.productCategorySalesorgMapping.move(currentIndex, newIndex);


  }
}