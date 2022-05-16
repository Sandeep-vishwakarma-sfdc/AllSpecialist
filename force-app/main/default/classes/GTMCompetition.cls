public with sharing class GTMCompetition {
    
  @AuraEnabled
public static List<GTM_Details__c> getGTMCompetition(){
  Id competitorRecordType = Schema.SObjectType.GTM_Details__c.getRecordTypeInfosByName().get('Competitior').getRecordTypeId();
   List<GTM_Details__c> gtmDetails = [select GTM_Customer__c,Competitor_Name_1__c,Indicate_share_wallet_of_competitor_1__c,Competitor_Name_2__c,Indicate_share_wallet_of_competitor_2__c,Competitor_Name_3__c,Indicate_share_wallet_of_competitor_3__c,Competitor_Name_4__c,Indicate_share_wallet_of_competitor_4__c,Competitor_Name_5__c,Indicate_share_wallet_of_competitor_5__c,Competitor_Name_6__c,Indicate_share_wallet_of_competitor_6__c,Competitor_Name_7__c,Indicate_share_wallet_of_competitor_7__c,Competitor_Name_8__c,Indicate_share_wallet_of_competitor_8__c,UPL_Position__c,UPLs_share_of_wallet__c from GTM_Details__c where recordTypeId=:competitorRecordType and Sales_Org__r.Sales_Org_Code__c=:GTMPathFinder.getSalesOrg().Sales_Org_Code__c];
   if(gtmDetails.size()==0){
      return createGTMDetail();
   }
   return gtmDetails;
}

private static List<GTM_Details__c> createGTMDetail(){ 
 List<Account> gtmCustomers = GTMPathFinder.getGTMCustomers();
 System.debug('The Gtm Customer size' +gtmCustomers.size());
List<GTM_Details__c> gtmDetailstToInsert = new List<GTM_Details__c>();
Id competitorRecordType = Schema.SObjectType.GTM_Details__c.getRecordTypeInfosByName().get('Competitor').getRecordTypeId();
List<Gtm__c> gtm=[select Id,name,Fiscal_Year__c from Gtm__c where Fiscal_year__c=:GTMPathFinder.getFiscalYear()];
for(Account acc:gtmCustomers){
   if(gtm.size()>0){
      GTM_Details__c gtmd = new GTM_Details__c();
      gtmd.recordTypeId = competitorRecordType;
      gtmd.GTM_Customer__c = acc.Id;
      gtmd.GTM__c=gtm[0].Id;
      gtmd.Sales_Org__c=GTMPathFinder.getSalesOrg().Id;
      gtmDetailstToInsert.add(gtmd);
   }
}
insert gtmDetailstToInsert;
List<GTM_Details__c> gtmDetails =[select GTM_Customer__c,Competitor_Name_1__c,Indicate_share_wallet_of_competitor_1__c,Competitor_Name_2__c,Indicate_share_wallet_of_competitor_2__c,Competitor_Name_3__c,Indicate_share_wallet_of_competitor_3__c,Competitor_Name_4__c,Indicate_share_wallet_of_competitor_4__c,Competitor_Name_5__c,Indicate_share_wallet_of_competitor_5__c,Competitor_Name_6__c,Indicate_share_wallet_of_competitor_6__c,Competitor_Name_7__c,Indicate_share_wallet_of_competitor_7__c,Competitor_Name_8__c,Indicate_share_wallet_of_competitor_8__c,UPL_Position__c,UPLs_share_of_wallet__c from GTM_Details__c where Sales_Org__r.Sales_Org_Code__c=:GTMPathFinder.getSalesOrg().Sales_Org_Code__c];

return gtmDetails;

}
}