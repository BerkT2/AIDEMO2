({
    loadAddresses: function(component, filterType) {
        component.set('v.isLoading', true);
        var action = component.get('c.getAddressesByAccount');
        action.setParams({
            accountId: component.get('v.recordId'),
            addressType: filterType === 'All' ? null : filterType
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.addresses', response.getReturnValue());
            } else {
                var errors = response.getError();
                this.showToast(component, 'Error', errors[0].message, 'error');
            }
            component.set('v.isLoading', false);
        });
        $A.enqueueAction(action);
    },

    saveNewAddress: function(component) {
        var action = component.get('c.createAddress');
        action.setParams({
            addressData: JSON.stringify(component.get('v.newAddress'))
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.showNewAddressModal', false);
                this.showToast(component, 'Success', 'Address saved successfully.', 'success');
                this.loadAddresses(component, component.get('v.filterType'));
            } else {
                var errors = response.getError();
                this.showToast(component, 'Error', errors[0].message, 'error');
            }
        });
        $A.enqueueAction(action);
    },

    showToast: function(component, title, message, type) {
        var toastEvt = $A.get('e.force:showToast');
        toastEvt.setParams({ title: title, message: message, type: type });
        toastEvt.fire();
    }
})
