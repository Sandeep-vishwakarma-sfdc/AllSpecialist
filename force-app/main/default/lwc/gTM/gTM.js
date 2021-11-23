import { LightningElement, track } from 'lwc';
import bootstrap from '@salesforce/resourceUrl/bootstrap';
import bootstrapjsag from '@salesforce/resourceUrl/bootstrapjsag';

export default class GTM extends LightningElement {
    @track isShowModal = false;
    value = 'No. of Lead Customer';

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
    

}