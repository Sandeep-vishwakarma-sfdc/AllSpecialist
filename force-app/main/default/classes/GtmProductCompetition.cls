public class GtmProductCompetition {

    @AuraEnabled
    public static List < GtmProductCompWrapper > getproductList() {
  
      List < Product_Category__c > gtmproductList = [Select Id, Name, Status__c From Product_Category__c];
      List < Product_Category_Sales_Org_Mapping__c > productCategoriesMapping = new List < Product_Category_Sales_Org_Mapping__c > ();
      Sales_Org__c gtmSo = GTMPathFinder.getSalesOrg();
  
      Integer index = 1;
      for (Product_Category__c gtmProdObj: gtmproductList) {
        Product_Category_Sales_Org_Mapping__c categorySalesorgMap = new Product_Category_Sales_Org_Mapping__c();
        // Product_Category__c pc = new Product_Category__c();
        // pc.Id= gtmProductCategory.Id;
        categorySalesorgMap.Status__c = 'Inactive';
        categorySalesorgMap.Sales_Org__c = gtmSo.Id;
        categorySalesorgMap.Category_Index__c = index;
        categorySalesorgMap.Product_Category__c = gtmProdObj.Id;
        productCategoriesMapping.add(categorySalesorgMap);
        index++;
      }
  
      List < Product_Category_Sales_Org_Mapping__c > lstSalesorgProductCategoryMap = [Select Id, Name, Product_Category__c, CreatedBy.Name, LastModifiedDate, CreatedDate, Sales_Org__r.Name, Product_Category__r.Name from Product_Category_Sales_Org_Mapping__c where Sales_Org__r.Sales_Org_Code__c =: gtmSo.Sales_Org_Code__c];
  
      if (lstSalesorgProductCategoryMap.size() == 0) {
        insert productCategoriesMapping;
      }
  
      return getWapper();
    }
    @AuraEnabled
    public static List < GtmProductCompWrapper > getWapper() {
      List < GtmProductCompWrapper > gtmWrapList = new List < GtmProductCompWrapper > ();
  
      Sales_Org__c gtmSo = GTMPathFinder.getSalesOrg();
      List < Product_Category_Sales_Org_Mapping__c > SalesorgProductCategoryMap = [Select Id, Name, Status__c, CreatedBy.Name, LastModifiedDate, CreatedDate, Product_Category__c, Sales_Org__r.Name, Product_Category__r.Name from Product_Category_Sales_Org_Mapping__c where Sales_Org__r.Sales_Org_Code__c =: gtmSo.Sales_Org_Code__c];
  
      //return SalesorgProductCategoryMap;
  
      for (Product_Category_Sales_Org_Mapping__c obj: SalesorgProductCategoryMap) {
        GtmProductCompWrapper objwrap = new GtmProductCompWrapper();
  
        if (obj.Status__c == 'Inactive') {
          objwrap.status = false;
        }
        if (obj.Status__c == 'Active') {
          objwrap.status = true;
        }
        objwrap.productCategoryName = obj.Product_Category__r.Name;
        objwrap.productCategory = obj.Product_Category__c;
        objwrap.productCategorySalesOrgMappingId = obj.Id;
        objwrap.salesOrgName = obj.Sales_Org__r.Name;
  
        objwrap.createdByName = obj.CreatedBy.Name;
        objwrap.lastModifiedDateName = obj.LastModifiedDate;
        gtmWrapList.add(objwrap);
        System.debug('Hiiiii' + gtmWrapList);
      }
      return gtmWrapList;
  
    }
  
    List < Crop__c > gtmCropList = [Select Id, Name, GTM_Status__c From Crop__c];
    @AuraEnabled
    public static List < GtmProductCompWrapper > getWapperCrop() {
      List < GtmProductCompWrapper > gtmWrapCropList = new List < GtmProductCompWrapper > ();
  
      Sales_Org__c gtmSo = GTMPathFinder.getSalesOrg();
      List < Crop__c > SalesorgCropMapping = [Select Id, Name, GTM_Status__c, CreatedById, LastModifiedById, SalesOrg__r.Name From Crop__c where SalesOrg__r.Sales_Org_Code__c =: gtmSo.Sales_Org_Code__c];
  
      //return SalesorgProductCategoryMap;
  
      for (Crop__c obj: SalesorgCropMapping) {
        GtmProductCompWrapper objwrapcrop = new GtmProductCompWrapper();
  
        if (obj.GTM_Status__c == 'Inactive') {
          objwrapcrop.gtmstatuscrop = false;
        }
        if (obj.GTM_Status__c == 'Active') {
          objwrapcrop.gtmstatuscrop = true;
        }
        objwrapcrop.cropName = obj.Name;
        objwrapcrop.cropId = obj.Id;
        objwrapcrop.salesOrgNameCrop = obj.SalesOrg__r.Name;
  
        //objwrapcrop.createdByNameCrop= obj.CreatedById;
        //objwrapcrop.lastModifiedDateNameCrop= obj.LastModifiedById.lastModifiedDate;
        gtmWrapCropList.add(objwrapcrop);
        System.debug('Hiiiii' + gtmWrapCropList);
      }
      return gtmWrapCropList;
    }
  
    @AuraEnabled
    public static void updateProductCategoryMapStatus(String statusmap) {
  
      System.debug('Status Map ' + statusmap);
  
      List < GtmProductCompWrapper > listUpdatesItemIdnew = (List < GtmProductCompWrapper > ) json.deserialize(statusmap, List < GtmProductCompWrapper > .class);
  
      List < Product_Category_Sales_Org_Mapping__c > productCategoryMapStatusUpdated = new List < Product_Category_Sales_Org_Mapping__c > ();
      for (GtmProductCompWrapper pcsms: listUpdatesItemIdnew) {
        Product_Category_Sales_Org_Mapping__c productMapping = new Product_Category_Sales_Org_Mapping__c();
        productMapping.Id = pcsms.productCategorySalesOrgMappingId;
  
        productMapping.Status__c = pcsms.status ? 'Active' : 'Inactive';
  
        productCategoryMapStatusUpdated.add(productMapping);
  
      }
  
      List < Product_Category_Sales_Org_Mapping__c > lstStatusUpdated = [Select ID, Name, Status__c from Product_Category_Sales_Org_Mapping__c];
      for (Product_Category_Sales_Org_Mapping__c obj: lstStatusUpdated) {
  
        if (obj.Status__c == 'Active') {
          System.debug('hello');
        } else {
  
          update productCategoryMapStatusUpdated;
        }
  
      }
  
    }
  
    //System.debug('listUpdatesItemIdnew  = '+listUpdatesItemIdnew );
    // System.debug('listOrderStatusItemIdnew = '+listOrderItemIdnew.size());
  
    // List<Product_Category_Sales_Org_Mapping__c> ProductCategoryMapStatusUpdated = [Select Id, Name, Status__c from Product_Category_Sales_Org_Mapping__c where ID in: pcmIds];
    // List<Id> pcmIds,
    //  ProductCategoryMapStatusUpdated.Status__c = Boolean.valueOf(true) ;
    //    System.debug('Status Map '+ statusmap);
    //   for(Product_Category_Sales_Org_Mapping__c pcsms : ProductCategoryMapStatusUpdated){
    //     pcsms.Status__c = 'Active';
  
    //  }
  
    // if(Schema.sObjectType.Product_Category_Sales_Org_Mapping__c.isUpdateable()){
    //  update ProductCategoryMapStatusUpdated;
    // }
  
    @AuraEnabled
    public static void updateCropStatus(String statusmap) {
  
      System.debug('Status Map ' + statusmap);
  
      List < GtmProductCompWrapper > listUpdatesItemIdnew = (List < GtmProductCompWrapper > ) json.deserialize(statusmap, List < GtmProductCompWrapper > .class);
  
      List < Crop__c > productCropStatusUpdated = new List < Crop__c > ();
      for (GtmProductCompWrapper crop: listUpdatesItemIdnew) {
        Crop__c cropMapping = new Crop__c();
        cropMapping.Id = crop.cropId;
        cropMapping.GTM_Status__c = crop.gtmstatuscrop ? 'Active' : 'Inactive';
        productCropStatusUpdated.add(cropMapping);
  
      }
      update productCropStatusUpdated;
  
    }
  
    public class GtmProductCompWrapper {
  
      @AuraEnabled
      public Boolean status {
        get;
        set;
      }
  
      @AuraEnabled
      public String salesOrgId {
        get;
        set;
      }
  
      @AuraEnabled
      public String productCategorySalesOrgMappingId {
        get;
        set;
      }
  
      @AuraEnabled
      public String salesOrgName {
        get;
        set;
      }
  
      @AuraEnabled
      public String productCategory {
        get;
        set;
      }
  
      @AuraEnabled
      public String productCategoryName {
        get;
        set;
      }
  
      @AuraEnabled
      public String cropName {
        get;
        set;
      }
  
      @AuraEnabled
      public String createdByName {
        get;
        set;
      }
  
      @AuraEnabled
      public Datetime lastModifiedDateName {
        get;
        set;
      }
  
      @AuraEnabled
      public Boolean gtmstatuscrop {
        get;
        set;
      }
  
      @AuraEnabled
      public String cropId {
        get;
        set;
      }
  
      @AuraEnabled
      public String salesOrgNameCrop {
        get;
        set;
      }
  
      //@AuraEnabled
      //public String createdByNameCrop {get;set;}
  
      //  @AuraEnabled
      //  public Datetime lastModifiedDateNameCrop {get;set;}
  
    }
  
  }