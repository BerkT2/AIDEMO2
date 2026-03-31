({
    processApproval: function(component, status, approvedLimit, rejectionReason) {
        var action = component.get("c.updateFinanceApprovalStatus");
        action.setParams({
            accountId: component.get("v.recordId"),
            newStatus: status,
            approvedLimit: approvedLimit,
            rejectionReason: rejectionReason
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set("v.showApproveModal", false);
                component.set("v.showRejectModal", false);
                component.set("v.rejectionReason", "");
                var msg = status === 'Approved' ?
                    'Account approved and queued for Logo ERP sync.' :
                    'Account rejected. Sales rep has been notified.';
                var toastEvt = $A.get("e.force:showToast");
                toastEvt.setParams({
                    title: status,
                    message: msg,
                    type: status === 'Approved' ? 'success' : 'warning'
                });
                toastEvt.fire();
                component.find("accountRecord").reloadRecord();
            } else {
                var errors = response.getError();
                var toastEvt = $A.get("e.force:showToast");
                toastEvt.setParams({ title: 'Error', message: errors[0].message, type: 'error' });
                toastEvt.fire();
            }
        });
        $A.enqueueAction(action);
    }
})
