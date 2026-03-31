({
    doInit: function(component, event, helper) {
        helper.loadDashboardData(component);
    },

    navigateToLead: function(component, event, helper) {
        var leadId = event.currentTarget.dataset.id;
        var navEvt = $A.get("e.force:navigateToSObject");
        navEvt.setParams({ "recordId": leadId });
        navEvt.fire();
    },

    navigateToLeadList: function(component, event, helper) {
        var evt = $A.get("e.force:navigateToObjectHome");
        evt.setParams({ "scope": "Lead" });
        evt.fire();
    },

    navigateToActivityList: function(component, event, helper) {
        var evt = $A.get("e.force:navigateToObjectHome");
        evt.setParams({ "scope": "Activity" });
        evt.fire();
    }
})
