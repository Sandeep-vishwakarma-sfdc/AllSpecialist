import { LightningElement, track, api, wire } from 'lwc';

export default class Gtm_country extends LightningElement {

    queryTerm;
    @track csoElement=[];
    @track competitorElement=[];

    accounts=[];

    handlePaginationAction (){}

    handleKeyUp(evt) {
        const isEnterKey = evt.keyCode === 13;
        if (isEnterKey) {
            this.queryTerm = evt.target.value;
        }
    }


    get options() {
        return [
            { label: 'No. of Lead Customer', value: 'No. of Lead Customer' },
            { label: 'No. of Non Lead Customer', value: 'No. of Non Lead Customer' },
           
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }


    showModalBox() {  
        this.isShowModal = true;
    }

    hideModalBox() {  
        this.isShowModal = false;
    }

    show = true;
    handleChange(event){
        this.show = event.target.checked;
    }
    
    activeSections = ['A','B'];
    activeSectionsMessage = '';

    handleSectionToggle(event) {
        const openSections = event.detail.openSections;

        if (openSections.length === 0) {
            this.activeSectionsMessage = 'All sections are closed';
        } else {
            this.activeSectionsMessage =
                'Open sections: ' + openSections.join(', ');
        }
    }

handleclick(){
    let ml=this.template.querySelector(".sidebar");
    ml.toggleClass("active");
}
    


    @track dragStart;
    @track ElementList = [];
  
    connectedCallback() {
     /* getAccountList()
        .then((result) => {
          for (let i = 0; i < result.length; i++) {
            this.ElementList.push(result[i]);
          }
        })
        .catch((error) => {
          console.log("###Error : " + error.body.message);
        });*/
  
        let acc1 = {Id:1,Name:'Fungicides', SalesOrg:'Argentina', Status:true, Date:'10/11/2021 1:19 pm'};
        let acc2 = {Id:2,Name:'Biosolutions',SalesOrg:'Argentina', Status:false, Date:'10/11/2021 1:24 pm'};
        let acc3 = {Id:3,Name:'Herbicides',SalesOrg:'Argentina', Status:true, Date:'10/11/2021 1:28 pm'};
        let acc4 = {Id:4,Name:'Soil & Seed',SalesOrg:'Argentina', Status:true, Date:'10/11/2021 1:32 pm'};
        let acc5 = {Id:5,Name:'Health',SalesOrg:'Argentina', Status:true, Date:'10/11/2021 1:36 pm'};
        let acc6 = {Id:6,Name:'Other',SalesOrg:'Argentina', Status:true, Date:'10/11/2021 1:40 pm'};

       

      this.ElementList.push(acc1);
      this.ElementList.push(acc2);
      this.ElementList.push(acc3);
      this.ElementList.push(acc4);
      this.ElementList.push(acc5);
      this.ElementList.push(acc6);

      let arrObj = [{Id:1,Name:"Maize",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:30 PM"}
      ,{Id:2,Name:"Cereal",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:35 PM"},
      {Id:3,Name:"Peanuts",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:40 PM"},
      {Id:4,Name:"Potato",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:45 PM"},
      {Id:5,Name:"F & V",SalesOrg:"Argentina",Status:false,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:50 PM"},
      {Id:6,Name:"Other",SalesOrg:"Argentina",Status:false,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:55 PM"},
      ];
      
      this.csoElement = arrObj;

      let arrObj2 = [{Id:1,Name:"Bayer", SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:30 PM"},
      {Id:2,Name:"Nova",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:35 PM"},
      {Id:3,Name:"Syngenta",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:40 PM"},
      {Id:4,Name:"Corteva",SalesOrg:"Argentina",Status:true,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:45 PM"},
      {Id:5,Name:"ACA",SalesOrg:"Argentina",Status:false,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:50 PM"},
      {Id:6,Name:"Atanor",SalesOrg:"Argentina",Status:false,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:55 PM"},
      {Id:7,Name:"Other",SalesOrg:"Argentina",Status:false,LastModifiedBy:"Sandip Atkari",Date:"10/11/2021 1:55 PM"},
      ];
      
      this.competitorElement = arrObj2;
      
    }
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
        return ['.pdf', '.png','.jpg','.jpeg'];
    }
    handleUploadFinished(event) {
        // Get the list of uploaded files
        const uploadedFiles = event.detail.files;
        let uploadedFileNames = '';
        for(let i = 0; i < uploadedFiles.length; i++) {
            uploadedFileNames += uploadedFiles[i].name + ', ';
        }
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: uploadedFiles.length + ' Files uploaded Successfully: ' + uploadedFileNames,
                variant: 'success',
            }),
        );
    }

  }