({
    doInit: function(component, event, helper) {
        helper.loadAddresses(component, 'All');
    },

    filterAll: function(component, event, helper) {
        component.set('v.filterType', 'All');
        helper.loadAddresses(component, 'All');
    },

    filterShipping: function(component, event, helper) {
        component.set('v.filterType', 'Shipping Address');
        helper.loadAddresses(component, 'Shipping Address');
    },

    filterBilling: function(component, event, helper) {
        component.set('v.filterType', 'Billing Address');
        helper.loadAddresses(component, 'Billing Address');
    },

    openNewAddressModal: function(component, event, helper) {
        component.set('v.newAddress', {
            Account__c: component.get('v.recordId'),
            Country__c: 'Turkey',
            Is_Active__c: true
        });
        component.set('v.showNewAddressModal', true);
    },

    closeModal: function(component, event, helper) {
        component.set('v.showNewAddressModal', false);
        component.set('v.newAddress', {});
    },

    saveAddress: function(component, event, helper) {
        helper.saveNewAddress(component);
    }
})
