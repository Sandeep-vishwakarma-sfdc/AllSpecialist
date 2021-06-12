public with sharing class AccountController {
    public List<Account> accs{get{
      accs = [select name, billingcity, billingstate, billingstreet, billingpostalcode from account limit 5];
      return accs;
    }
    set;}
}