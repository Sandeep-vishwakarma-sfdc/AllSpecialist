public with sharing class AccountController {
    public List<Account> accs{get{
      accs = [select name, billingcity, billingstate, billingstreet, billingpostalcode from account limit 5];
      return accs;
    }
    set;}

    @AuraEnabled
    public static Map<String,Account>  getAccountMap (){
      List<Account> acclst = new List<Account>();
      Map<String,Account> mapacc;
      if(Schema.sObjectType.Account.isAccessible()){}
        acclst = [select Id,Name from Account limit 5];
        mapacc = new Map<string,Account>{'1'=>acclst[0],'2'=>acclst[1],'3'=>acclst[2],'4'=>acclst[3]};
      }
      return mapacc;
    }

    @AuraEnabled(cacheable=true)
    public static List<Account> getAllAccounts(){
      List<Account> accounts = new List<Account>();
        accounts = [SELECT Id, Name, Type, BillingStreet, BillingCountry, Phone, Fax, AccountNumber, Website, PhotoUrl, Rating, OwnerId, CreatedDate, LastModi  fiedDate FROM Account];
      }
      if(accounts.size()>0){
        return accounts; 
      return new List<Account>{};
    }

    @AuraEnabled
    public static string methodName(Account a){
      a.Name = 'Name';
      delete a;
    }
}