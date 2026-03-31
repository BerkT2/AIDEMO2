/**
 * VeskimAddressController
 * Apex controller for the Veskim Address Manager Aura component.
 * Handles address retrieval and creation for customer accounts.
 */
public with sharing class VeskimAddressController {

    @AuraEnabled(cacheable=true)
    public static List<Address__c> getAddressesByAccount(Id accountId, String addressType) {
        if (String.isBlank(addressType)) {
            return [SELECT Id, Name, Address_Type__c, Address_Line_1__c, Address_Line_2__c,
                           City__c, District__c, Neighborhood__c, Postal_Code__c,
                           Contact_Name__c, Address_Phone__c, Address_Email__c,
                           Is_Active__c, External_ID__c, Country__c
                    FROM Address__c
                    WHERE Account__c = :accountId
                    WITH SECURITY_ENFORCED
                    ORDER BY Address_Type__c, Name];
        } else {
            return [SELECT Id, Name, Address_Type__c, Address_Line_1__c, Address_Line_2__c,
                           City__c, District__c, Neighborhood__c, Postal_Code__c,
                           Contact_Name__c, Address_Phone__c, Address_Email__c,
                           Is_Active__c, External_ID__c, Country__c
                    FROM Address__c
                    WHERE Account__c = :accountId
                    AND Address_Type__c = :addressType
                    WITH SECURITY_ENFORCED
                    ORDER BY Name];
        }
    }

    @AuraEnabled
    public static String createAddress(String addressData) {
        try {
            Map<String, Object> dataMap = (Map<String, Object>) JSON.deserializeUntyped(addressData);
            Address__c addr = new Address__c();
            if (dataMap.containsKey('Account__c')) addr.Account__c = (Id) dataMap.get('Account__c');
            if (dataMap.containsKey('Name')) addr.Name = (String) dataMap.get('Name');
            if (dataMap.containsKey('Address_Type__c')) addr.Address_Type__c = (String) dataMap.get('Address_Type__c');
            if (dataMap.containsKey('Address_Line_1__c')) addr.Address_Line_1__c = (String) dataMap.get('Address_Line_1__c');
            if (dataMap.containsKey('Address_Line_2__c')) addr.Address_Line_2__c = (String) dataMap.get('Address_Line_2__c');
            if (dataMap.containsKey('City__c')) addr.City__c = (String) dataMap.get('City__c');
            if (dataMap.containsKey('District__c')) addr.District__c = (String) dataMap.get('District__c');
            if (dataMap.containsKey('Neighborhood__c')) addr.Neighborhood__c = (String) dataMap.get('Neighborhood__c');
            if (dataMap.containsKey('Postal_Code__c')) addr.Postal_Code__c = (String) dataMap.get('Postal_Code__c');
            if (dataMap.containsKey('Contact_Name__c')) addr.Contact_Name__c = (String) dataMap.get('Contact_Name__c');
            if (dataMap.containsKey('Address_Phone__c')) addr.Address_Phone__c = (String) dataMap.get('Address_Phone__c');
            if (dataMap.containsKey('Address_Email__c')) addr.Address_Email__c = (String) dataMap.get('Address_Email__c');
            if (dataMap.containsKey('Country__c')) addr.Country__c = (String) dataMap.get('Country__c');
            addr.Is_Active__c = true;
            insert addr;
            return addr.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error creating address: ' + e.getMessage());
        }
    }
}
