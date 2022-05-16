import { LightningElement,track,api } from 'lwc';
import { updateRecord } from 'lightning/uiRecordApi';
import getGTMCompetition from '@salesforce/apex/GTMCompetition.getGTMCompetition';
import  updateGTMDetails from '@salesforce/apex/GTMCompetition.updateGTMDetails';
import  getCompetitorDetails from '@salesforce/apex/GTMCompetition.getCompetitorDetails';


export default class GtmCompetition extends LightningElement {
    @track gtmcompetitor;
    gtmcompetitorVirtual = [];
    @api recordId;
    @track panelStatus={
        notFilled:'0',
        inProgress:'0',
        completed:'0'
    }
    
    

    value = 'new';
    statusOptions = [];
    connectedCallback() {
        this.getGTMCompetitionName( );
        
        getGTMCompetition().then(data=>{
            let tempData = [];
            if(data){
                data.forEach(ele=>{
                    let obj = {
                        id:ele.Id,
                        customer:ele.GTM_Customer__r.Name,
                        Competitor1:ele.Competitor_Name_1__c,
                        Indicate1:ele.Indicate_share_wallet_of_competitor_1__c,
                        Competitor2:ele.Competitor_Name_2__c,
                        Indicate2:ele.Indicate_share_wallet_of_competitor_2__c,
                        Competitor3:ele.Competitor_Name_3__c,
                        Indicate3:ele.Indicate_share_wallet_of_competitor_3__c,
                        Competitor4:ele.Competitor_Name_4__c,
                        Indicate4:ele.Indicate_share_wallet_of_competitor_4__c,
                        Competitor5:ele.Competitor_Name_5__c,
                        Indicate5:ele.Indicate_share_wallet_of_competitor_5__c,
                        Competitor6:ele.Competitor_Name_6__c,
                        Indicate6:ele.Indicate_share_wallet_of_competitor_6__c,
                        Competitor7:ele.Competitor_Name_7__c,
                        Indicate7:ele.Indicate_share_wallet_of_competitor_7__c,
                        Competitor8:ele.Competitor_Name_8__c,
                        Indicate8:ele.Indicate_share_wallet_of_competitor_8__c,
                        
                        status:'',
                        numberOfFieldsFilled:''
                    }
                    tempData.push(obj);
                });
                setTimeout(() => {
                    this.getGTMCompetition = tempData;
                    console.log('getGTMCompetition string',JSON.stringify(this.getGTMCompetition));
                    this.gtmcompetitorVirtual = tempData;
                    this.gtmcompetitor = this.getGTMCompetition;
                        this.getGTMCompetition.forEach(ele=>{
                            this.handleChangeStatusOnLoad(ele.id);
                            this.updateStatusLabel();
                        })
                }, 200);
                console.log('Competitior  data ',this.getGTMCompetition);
            }
        })
    }
            
             
            


    handlePaginationAction() {}
   


   
    

    handleInputChange(event ){
        console.log('detail value ', event.detail.value);
        let value=event.target.value;
        let id=event.currentTarget.dataset.id;
        let name=event.currentTarget.dataset.name;

        console.log(event.target.value);
        console.log('The id is',id);
        console.log('the name is',name);
        updateGTMDetails({ recordId:id, name:name, value:value}).then(data=>{
            
            Console.log('data updated',data); 
        
     
    let gtmIndex = this.getGTMCompetition.findIndex((obj=>obj.id==id));
    if(name=='Competitor_Name_1__c'){
        console.log('Competitor_Name_1__c');
       this.getGTMCompetition[gtmIndex].Competitor1= value;
       
    }
    else if(name=='Indicate_share_wallet_of_competitor_1__c'){
        console.log('Indicate_share_wallet_of_competitor_1__c');
       this.getGTMCompetition[gtmIndex].Indicate1= value;
    }
    else if(name=='Competitor_Name_2__c'){
        console.log('Competitor_Name_2__c');
       this.getGTMCompetition[gtmIndex].Competitor2= value;
    }else if(name=='Indicate_share_wallet_of_competitor_2__c'){
        console.log('Indicate_share_wallet_of_competitor_2__c');
       this.getGTMCompetition[gtmIndex].Indicate2= value;
    }else if(name=='Competitor_Name_3__c'){
        console.log('Competitor_Name_3__c');
       this.getGTMCompetition[gtmIndex].Competitor3= value;
    }else if(name=='Indicate_share_wallet_of_competitor_3__c'){
        console.log('Indicate_share_wallet_of_competitor_3__c');
       this.getGTMCompetition[gtmIndex].Indicate3= value;
    }else if(name=='Competitor_Name_4__c'){
        console.log('Competitor_Name_4__c');
       this.getGTMCompetition[gtmIndex].Competitor4= value;
    }else if(name=='Indicate_share_wallet_of_competitor_4__c'){
        console.log('Indicate_share_wallet_of_competitor_4__c');
       this.getGTMCompetition[gtmIndex].Indicate4= value;
    }else if(name=='Competitor_Name_5__c'){
        console.log('Competitor_Name_5__c');
       this.getGTMCompetition[gtmIndex].Competitor5= value;
    }else if(fieldName=='Indicate_share_wallet_of_competitor_5__c'){
        console.log('Indicate_share_wallet_of_competitor_5__c');
       this.getGTMCompetition[gtmIndex].Indicate5= value;
    }
    else if(name=='Competitor_Name_6__c'){
        console.log('Competitor_Name_6__c');
       this.getGTMCompetition[gtmIndex].Competitor6= value;
    }else if(name=='Indicate_share_wallet_of_competitor_6__c'){
        console.log('Indicate_share_wallet_of_competitor_6__c');
       this.getGTMCompetition[gtmIndex].Indicate6= value;
    }else if(name=='Competitor_Name_7__c'){
        console.log('Competitor_Name_7__c');
       this.getGTMCompetition[gtmIndex].Competitor7= value;
    }else if(name=='Indicate_share_wallet_of_competitor_7__c'){
        console.log('Indicate_share_wallet_of_competitor_7__c');
       this.getGTMCompetition[gtmIndex].Indicate7= value;
    }else if(name=='Competitor_Name_8__c'){
        console.log('Competitor_Name_8__c');
       this.getGTMCompetition[gtmIndex].Competitor8= value;
    }else if(name=='Indicate_share_wallet_of_competitor_8__c'){
        console.log('Indicate_share_wallet_of_competitor_8__c');
       this.getGTMCompetition[gtmIndex].Indicate8= value;
    }
    console.log('this.getGTMCompetition -->',this.getGTMCompetition);
    setTimeout(() => {
        this.handleChangeStatusOnLoad(id);
        this.updateStatusLabel();
    }, 200);
           

        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Finally');
        })
    }


    //
        
    


    updateStatusLabel(){
        

        
                    
        
        let completeField = 0;
        let inProgressField = 0;
        let NotFilled = 0;
        this.getGTMCompetition.forEach(ele=>{
            if(ele.status=="Completed"){
                completeField++;
            }
            if(ele.status=="INProgress"){
                inProgressField++;
                console.log('The in progress value',inProgressField);
            }
            if(ele.status=="NotFilled"){
                NotFilled++;
            }
        });
        this.panelStatus = {
            notFilled:NotFilled,
            inProgress:inProgressField,
            completed:completeField
        }
    }

    // Meeting Time
    handleChangeStatusOnLoad(id){
        console.log('id ',id);
            this.getGTMCompetition.forEach(ele=>{
                console.log('ele ',JSON.stringify(ele));
                let NumberOfFilled=0;
                if(ele.Competitor1){
                    NumberOfFilled++;
                    console.log('Condition 1');
                }
                if(ele.Indicate1 && Number(ele.Indicate1)!=0){
                    NumberOfFilled++;
                    console.log('Condition 2');
                }
                if(ele.Competitor2){
                    NumberOfFilled++;
                    console.log('Condition 3');
                }
                if(ele.Indicate2 && Number(ele.Indicate2)!=0){
                    NumberOfFilled++;
                    console.log('Condition 4');
                }if(ele.Competitor3){
                    NumberOfFilled++;
                    console.log('Condition 5');
                }
                if(ele.Indicate3 && Number(ele.Indicate3)!=0){
                    NumberOfFilled++;
                    console.log('Condition 6');
                }if(ele.Competitor4){
                    NumberOfFilled++;
                    console.log('Condition 7');
                }
                if(ele.Indicate4 && Number(ele.Indicate4)!=0){
                    NumberOfFilled++;
                    console.log('Condition 8');
                }if(ele.Competitor5){
                    NumberOfFilled++;
                    console.log('Condition 9');
                }
                if(ele.Indicate5 && Number(ele.Indicate5)!=0){
                    NumberOfFilled++;
                    console.log('Condition 10');
                }if(ele.Competitor6){
                    NumberOfFilled++;
                    console.log('Condition 11');
                }
                if(ele.Indicate6 && Number(ele.Indicate6)!=0){
                    NumberOfFilled++;
                    console.log('Condition 12');
                }if(ele.Competitor7){
                    NumberOfFilled++;
                    console.log('Condition 13');
                }
                if(ele.Indicate7 && Number(ele.Indicate7)!=0){
                    NumberOfFilled++;
                    console.log('Condition 14');
                }if(ele.Competitor8){
                    NumberOfFilled++;
                    console.log('Condition 15');
                }
                if(ele.Indicate8 && Number(ele.Indicate8)!=0){
                    NumberOfFilled++;
                    console.log('Condition 16');
                }
                
                ele.numberOfFieldsFilled= NumberOfFilled;
                if(NumberOfFilled==16){
                    ele.status = 'Completed';
                }
                if(NumberOfFilled<16 && NumberOfFilled>0){
                    ele.status = 'INProgress';
                }
                if(NumberOfFilled==0){
                    ele.status = 'NotFilled';
                }
            })
            console.log('Added status ',this.getGTMCompetition);
    }



    


    handleFiltersAction(event){
        console.log('filter action ',event.detail);
        let filterValues = JSON.parse(JSON.stringify(event.detail));
        this.applyFiltersOnCustomer(filterValues);
    }

    applyFiltersOnCustomer(filtersValue){
        console.log('filtersValue -------------->',filtersValue);
        let search = filtersValue.search.length!=0;
        let filter1 = filtersValue.filter1.length!=0 && filtersValue.filter1!='Both';
        let filter2 = filtersValue.filter2.length!= 0 && filtersValue.filter2!='None';

        let searchValue = filtersValue.search;
        let filter1Value = filtersValue.filter1;
        let filter2Value = filtersValue.filter2;
    }
   
    //
    getGTMCompetitionName() {
        getCompetitorDetails()
        .then((data) => {
            console.log('competitor Options',data);
            
           data.forEach(element => {
               console.log('element',element);
           let obj=  { label: element.Name, value: element.Id };
            this.statusOptions.push(obj);
           });
            
        })
        .catch((error) => {
            console.log(error);
        })
        .finally(() => {
            console.log('Finally');
        })
    }

   


  




}