({
    doInit: function(component, event, helper) {
        component.find("accountRecord").reloadRecord();
    },

    recordLoaded: function(component, event, helper) {
        component.set("v.isLoading", false);
    },

    openApproveModal: function(component, event, helper) {
        component.set("v.approvedLimit", component.get("v.account.Requested_Limit__c"));
        component.set("v.showApproveModal", true);
    },

    openRejectModal: function(component, event, helper) {
        component.set("v.showRejectModal", true);
    },

    closeModals: function(component, event, helper) {
        component.set("v.showApproveModal", false);
        component.set("v.showRejectModal", false);
        component.set("v.rejectionReason", "");
    },

    confirmApproval: function(component, event, helper) {
        helper.processApproval(component, 'Approved', component.get("v.approvedLimit"), null);
    },

    confirmRejection: function(component, event, helper) {
        var reason = component.get("v.rejectionReason");
        if (!reason || reason.trim() === '') {
            var toastEvt = $A.get("e.force:showToast");
            toastEvt.setParams({ title: 'Error', message: 'Rejection reason is required.', type: 'error' });
            toastEvt.fire();
            return;
        }
        helper.processApproval(component, 'Rejected', null, reason);
    }
})
