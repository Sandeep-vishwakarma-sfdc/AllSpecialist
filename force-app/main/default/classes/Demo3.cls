//pass by value & pass by reference 
public with sharing class Demo3 {
//------------------------pass by value--------------------------------

    public void mainValueMethod() {
        String websiteUrl = 'www.amitanityvan.in';
        System.debug('Before value call '+websiteUrl);
        passByValueCall(websiteUrl);
        System.debug('After value call '+websiteUrl);
    }

    private void passByValueCall(String websiteUrlValue){
        websiteUrlValue = 'www.salesforce.com';
    }
//----------------------pass by reference-------------------------------
    public void mainReferenceMethod(){
        Account a = new Account();
        a.Name ='Test account';
        a.website = 'www.amitvanityvan.in';
        System.debug('Before reference call '+a);
        passByReferenceCall(a);
        System.debug('After reference call '+a);
    }

    private void passByReferenceCall(Account a){
        a.website = 'www.salesforce.com';
    }

}
