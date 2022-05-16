import { LightningElement, track, api, wire } from 'lwc';
import getLeadCustomerList from '@salesforce/apex/GtmLeadCustomer.getLeadCustomerList';
import updateAccountMethod from '@salesforce/apex/GtmLeadCustomer.updateAccountMethod';
import downloadCSV from '@salesforce/apex/GtmLeadCustomer.downloadCSV';
import saveFile from '@salesforce/apex/GtmLeadCustomer.saveFile';

import leadCustomerListForSelected from '@salesforce/apex/GtmLeadCustomer.leadCustomerListForSelected';


import {ShowToastEvent} from 'lightning/platformShowToastEvent';
 



export default class GtmLeadCustomer extends LightningElement {
  

  @track customer = {
    id:'',
    name:''
    }
    @track leadAccData=[];
    
   @track customerTypeForFilter='';
   @track ownerRecId ='';
   @track accRecId ='';
   @track paginatedLeadAccData =[];
   @track showLoadingSpinner = false;

  showPage=true;
  tmpLeadData=[];


  @track disableBtn = {first:false,previous:false,next:false,last:false};
  


  // for files decalration 
  filesUploaded = [];
  @track fileName = '';  
  @track data;
  @track isTrue = false;
  @track showLoadingSpinner = false;
  @track selectCount = 0;
  file;
  fileContents;
  fileReader;
  content;
  MAX_FILE_SIZE = 1500000;



  accSelectedData =[];
 
  checkboxMap={};

  ownerMap={};
  pathfindMap={};
  customertypeMap={};

  pageLimit=10;
  pageNumber=1;
  pageItems=[];
  
  connectedCallback(){
    this.customerTypeForFilter ='Both';

    getLeadCustomerList({customerFilter: this.customerTypeForFilter}).then(data=>{
      this.showLoadingSpinner = true;
      console.log('Data  ',data);      
      this.leadAccData = data;
      this.tmpLeadData = data;
      this.displayRecords();
      setTimeout(() => {
        this.showLoadingSpinner = false;
      }, 2000);
     
      
    }).catch(error=> console.log('error is ',error))
  }

  get pageSizeOptions(){
    return [10,20,50,100];
}

handleRecordsPerPage(event){
  this.pageLimit = event.target.value;
  this.pageNumber=1;
  this.displayRecords();
}

handleNext(event){
  if(this.pageLimit*this.pageNumber<this.leadAccData.length){
    this.pageNumber++;
    this.displayRecords();
  }

}

handlePrevious(event){
  if(this.pageNumber>1){
    this.pageNumber--;
    this.displayRecords();
  }
}

displayRecords(){
  let lastIndex=this.pageLimit*this.pageNumber;
  let startIndex = lastIndex - this.pageLimit;
  if(this.pageLimit*this.pageNumber>this.leadAccData.length){
    lastIndex=this.leadAccData.length;
  }
  this.pageItems=[];
  for(let i=startIndex;i<lastIndex;i++){
    this.pageItems.push(this.leadAccData[i]);

  }
  

}
 
  handleCustomerFilter(event){
    // console.log('handleCustomerFIlter method ');
    let custType = event.target.value;
    console.log('handleCustomerFIlter method '+custType);
    this.customerTypeForFilter = custType;
    getLeadCustomerList({customerFilter: this.customerTypeForFilter}).then(data=>{
      console.log('Data  ',data);
      this.leadAccData = data;
      
    }).catch(error=> console.log('error is ',error))


  }


    handleLookup(event){
      //console.log('in handle lookup after fire event from csearch component');
      console.log( 'sadsadsds '+JSON.stringify ( event.detail) )
      var recId='';
      if(event.detail.data){
        console.log('inside true part')
        recId =  event.detail.data.recordId;
        this.accRecId = recId;
      }else{
        this.accRecId ='';
        getLeadCustomerList({customerFilter: this.customerTypeForFilter}).then(data=>{
          console.log('Data  ',data);
          this.leadAccData = data;
          
        }).catch(error=> console.log('error is ',error))

      }


     
      console.log('in handle lookup after fire event from csearch component '+recId);
      this.searchByCustomerByName(recId,this.ownerRecId);

    }

    handleLookupOwner(event){
       //console.log('in handle lookup after fire event from csearch component');
       console.log( 'handle lookup owner '+JSON.stringify ( event.detail) );
       var recId='';
       if(event.detail.data){
         console.log('inside true part for owner');
         recId =  event.detail.data.recordId;
         this.ownerRecId = recId;
       }else{
        console.log('inside false part for owner');
        this.ownerRecId ='';
          getLeadCustomerList({customerFilter: this.customerTypeForFilter}).then(data=>{
            console.log('Data  ',data);
            this.leadAccData = data;
           
          }).catch(error=> console.log('error is ',error))
 
       }
       console.log('in handle lookup after fire event from owner component '+recId);
       this.searchByCustomerByName(this.accRecId,recId);

    }



    searchByCustomerByName(accRecId,ownerRecIds){
      leadCustomerListForSelected({ accId: accRecId, ownerId:ownerRecIds}).then(data=>{
        console.log('Data dsatttttttgd ',data);
        this.leadAccData = data;
        
      }).catch(error=> console.log('error is ',error));
    }

    get options() {
        return [
          { label: 'Dealer', value: 'Dealer' },
          { label: 'Retailer', value: 'Retailer' },
            { label: 'B2B', value: 'B2B' },
            { label: 'Farmer', value: 'Farmer' },
            { label: 'Cooperative', value: 'Cooperative' },
           
           
        ];


    }

   
   
    
    activeSections = ['A','B'];
    activeSectionsMessage = '';


     
    DragStart(event) {
      this.dragStart = event.target.title;
      event.target.classList.add("drag");
    }
  
    DragOver(event) {
      event.preventDefault();
      return false;
    }
  
    Drop(event) {
      event.stopPropagation();
      const DragValName = this.dragStart;
      const DropValName = event.target.title;
      if (DragValName === DropValName) {
        return false;
      }
      const index = DropValName;
      const currentIndex = DragValName;
      const newIndex = DropValName;
      Array.prototype.move = function (from, to) {
        this.splice(to, 0, this.splice(from, 1)[0]);
      };
      this.ElementList.move(currentIndex, newIndex);
      this.csoElement.move(currentIndex, newIndex);
      this.competitorElement.move(currentIndex, newIndex);
      
    }

    @api recordId;
    get acceptedFormats() {
        return ['.csv'];
    }



    importcsv(event){
      if (event.target.files.length > 0) {
          this.filesUploaded = event.target.files;
          this.filename = event.target.files[0].name;
          console.log(this.filename);
          if (this.filesUploaded.size > this.MAX_FILE_SIZE) {
              this.filename = 'File Size is to long to process';
          }else{
            this.uploadHelper();
          } 
  }
  }

   
  uploadHelper() {
    this.file = this.filesUploaded[0];
   if (this.file.size > this.MAX_FILE_SIZE) {

        window.console.log('File Size is to long');

        return ;

    }
    this.showLoadingSpinner = true;
    this.fileReader= new FileReader();
    this.fileReader.onloadend = (() => {
        this.fileContents = this.fileReader.result;
        this.saveToFile();
    });
    this.fileReader.readAsText(this.file);

}


saveToFile() {
  console.log('in  saveToFile function ');
  saveFile({ base64Data: JSON.stringify(this.fileContents), cdbId: this.recordid})
  .then(result => {
      window.console.log('result ====> ');
      window.console.log(result);
      this.data = result;
      this.fileName = this.fileName + ' - Uploaded Successfully';
      this.isTrue = false;
      this.showLoadingSpinner = false;
      this.dispatchEvent(
          new ShowToastEvent({
              title: 'Success!!',
              message: this.file.name + ' - Uploaded Successfully!!!',
              variant: 'success',
          }),
          
      );
      location.reload();
  })
  .catch(error => {
      window.console.log('Error in uploading ',error);
      this.dispatchEvent(
          new ShowToastEvent({
              title: 'Error while uploading File',
              message: error.message,
              variant: 'error',
          }),
      );
      this.showLoadingSpinner = false;
  });

  

}


handleCheckChange(event){
  console.log('inside new check click ');
 // this.leadAccData[event.target.value].isSelected = event.target.checked;
 this.showLoadingSpinner = true;
  let accId = event.currentTarget.dataset.id; 
  let accObj = this.leadAccData.find(ele=>ele.leadCustomerId==accId);

  let flgCount = event.target.checked;
  console.log('dddddddddd ',this.leadAccData[event.target.value].isSelected);
  console.log('flag count ',flgCount);
  if(flgCount == true){
    this.selectCount = this.selectCount + 1;
    accObj.isSelected = flgCount;
  }else{
    this.selectCount = this.selectCount - 1;
    accObj.isSelected = flgCount;
}


 let tmData = JSON.parse(JSON.stringify(this.leadAccData));
  this.leadAccData = tmData;
  console.log('this.selectCount ',this.selectCount);
  this.showLoadingSpinner = false;

}


handleDownload(event){
  console.log('in handleDownload method');  
  downloadCSV({ accData: JSON.stringify(this.leadAccData) })
  .then(result => {
    //this.accounts = result;
    console.log('result for download ',result);
    

  

    let url = result[1]+'/servlet/servlet.FileDownload?file='+result[0];
    console.log('url in Data for redirect  ',url);
    window.open(url,"_blank" );


    // this.error = undefined;
  })
  .catch(error => {
    // this.error = error;
    // this.accounts = undefined;
  });

}


    

//     handleCheckBoxChange(event){     
//       var selIndex = event.target.name;
//       console.log('selIndex in sele ',selIndex);
//       let flg  = event.target.checked;
//       console.log('@@@ flg '+flg);
//       let accId = event.currentTarget.dataset.id;
//       this.checkboxMap[accId]=flg;
//       try {
//         if(flg){
//           this.selectCount = this.selectCount+1;
//           var dt = this.leadAccData[selIndex];
//           this.paginatedLeadAccData[selIndex].checked=true;
//           this.leadAccData[selIndex].checked=true;
          
//           console.log('accId in check box '+accId);
//          let accObj = this.tmpLeadData.find(ele=>ele.leadCustomerId==accId);
//          console.log('selected acount object '+JSON.stringify(accObj));
//          accObj.checked = true;
         
         

          
//           this.accSelectedData.push(dt);
//           let tmData = JSON.parse(JSON.stringify(this.leadAccData));
//           this.leadAccData = tmData;

          
//         }else{
          

//           this.selectCount = this.selectCount-1;
//         }
  
// } catch (error) {
//   console.log('error ',error);
// }

//   console.log('selected account for update size ',this.accSelectedData.length);
//   console.log('selected account for update Data  ',this.accSelectedData);
     

//     }


    handllePathFinder(event){
      let accId = event.currentTarget.dataset.id;
     
    this.pathfindMap[accId]=event.target.checked;
 
      let tmpCheck = event.target.checked;
      console.log('selIndex in sele ',tmpCheck);
      let accObj = this.leadAccData.find(ele=>ele.leadCustomerId==accId);
      if(tmpCheck){
        accObj.pathFinder = true;
      }else{
        accObj.pathFinder = false;
      }
      
      console.log('accObj dasda ',accObj);

      let tmData = JSON.parse(JSON.stringify(this.leadAccData));
          this.leadAccData = tmData;

    }




    handleChangeCustomerType(event){
      let accId = event.currentTarget.dataset.id;      
      console.log('selIndex in selecustomer type  ',accId);
      
     // this.customertypeMap[accId]=event.target.value;
      let accObj = this.leadAccData.find(ele=>ele.leadCustomerId==accId);
      console.log('accObj in former ',accObj);

    let selvalue = event.target.value;

    console.log('customer type Name is ',selvalue);
    accObj.customerType = selvalue;

    let tmData = JSON.parse(JSON.stringify(this.leadAccData));
    this.leadAccData = tmData;
    console.log('after changeing type ',tmData);
    }



    handleOwnershipChange(event){
      console.log('in ownership change method');
      let accId = event.currentTarget.dataset.id;      
      console.log('selIndex in selecustomer type  ',accId);
      
     // this.customertypeMap[accId]=event.target.value;
      let accObj = this.leadAccData.find(ele=>ele.leadCustomerId==accId);
      console.log('accObj ownser change ',accObj);

    let selvalue = event.target.value;
    console.log('value from owner ',selvalue);
    accObj.ownerShipName = selvalue;

    let tmData = JSON.parse(JSON.stringify(this.leadAccData));
    this.leadAccData = tmData;


    }

    handleUsers(event){
      console.log('inside of handleUsers function');
      console.log( 'users handle '+JSON.stringify ( event.detail) );

      let accId = event.currentTarget.dataset.id;      
      console.log('selIndex in in user select  ',accId);

      let accObj = this.leadAccData.find(ele=>ele.leadCustomerId==accId);
      var recId='';
      if(event.detail.data){
        console.log('inside true part for user selected');
        recId =  event.detail.data.recordId;
      }
      accObj.ownerShip = recId;
    

       let tmData = JSON.parse(JSON.stringify(this.leadAccData));

           this.leadAccData = tmData;
  

    }


    handleSaveClick(event){

      for (var i = 0; i < this.leadAccData.length; i++) {
        console.log('selected data ',this.leadAccData[i].isSelected);

        if (this.leadAccData[i].isSelected) {
          this.accSelectedData.push(this.leadAccData[i]);
        }
      }  

       console.log('all save function '+JSON.stringify(this.accSelectedData));
       this.showLoadingSpinner = true;

      window.console.log('before save');

      if(this.leadAccData.length>0){
        console.log('select one ');
        updateAccountMethod({accountObjList:JSON.stringify(this.accSelectedData)})
        .then(result=>{
         
            //this.getAccountRecord={};
            //this.accountid=result.Id;
            window.console.log('after save' );
            
            const toastEvent = new ShowToastEvent({
              title:'Success!',
              message:'Account Saved successfully',
              variant:'success'
            });
            this.accSelectedData =[];
            this.selectCount =0;
            this.dispatchEvent(toastEvent);
            this.showLoadingSpinner = false;
            location.reload();
        })
        .catch(error=>{
           this.error=error.message;
           window.console.log(this.error);
        });
      }else{
        console.log('non selected');

        const toastEvent = new ShowToastEvent({
          title:'Error!',
          message:'Select atleast one record.',
          variant:'error'
        });
        this.dispatchEvent(toastEvent);
      }


     

   }


   handlePaginationAction(event){
     console.log('ffffffffffff ',event.detail.values);
     setTimeout(() => {
      this.paginatedLeadAccData = JSON.parse(JSON.stringify(event.detail.values));  
     }, 300);
     

     


    //  for(let i=0;i<this.paginatedLeadAccData.length;i++){
    //    if(this.checkboxMap[this.paginatedLeadAccData[i].leadCustomerId]){
    //     this.paginatedLeadAccData[i].checked=true;
    //    }
    //    else{
    //     this.paginatedLeadAccData[i].checked=false;
    //    }

    //    this.paginatedLeadAccData[i].ownerShip = this.ownerMap[this.paginatedLeadAccData[i].leadCustomerId];
    //    this.paginatedLeadAccData[i].customerType = this.customertypeMap[this.paginatedLeadAccData[i].leadCustomerId];
    //    this.paginatedLeadAccData[i].pathFinder = this.pathfindMap[this.paginatedLeadAccData[i].leadCustomerId];
      

    //  }

    
    }

    handleResetClick(event){
    console.log('inside handleResetClick method');
    this.template.querySelector('c-search-component').handleClose();
    this.template.querySelector('c-lookup-owner').handleClose();
      
    }


    handleSort(event){
      let fieldName = event.target.name;
      
      this.sortDirection = !this.sortDirection;
      this.sortData(fieldName,this.sortDirection);
  }

  sortData(fieldname, direction) {
      direction = direction==true?'asc':'des';
      console.log('Field Name ',fieldname,' direction ',direction);
      let parseData = JSON.parse(JSON.stringify(this.paginatedLeadAccData));
      if(parseData.length>1){
      let keyValue = (a) => {
          return a[fieldname];
      };
      let isReverse = direction === 'asc' ? 1: -1;
         parseData.sort((x, y) => {
          x = keyValue(x) ? keyValue(x) : ''; 
          y = keyValue(y) ? keyValue(y) : '';
          return isReverse * ((x > y) - (y > x));
      });
      this.paginatedLeadAccData = parseData;
      }

  }




  }