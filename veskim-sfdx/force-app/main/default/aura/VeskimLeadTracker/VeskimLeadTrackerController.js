({
    doInit: function(component, event, helper) {
        component.find("leadRecord").reloadRecord();
    },

    recordLoaded: function(component, event, helper) {
        component.set("v.isLoading", false);
    },

    convertLead: function(component, event, helper) {
        // Navigate to standard Lead Convert page
        var leadId = component.get("v.recordId");
        var evt = $A.get("e.force:navigateToURL");
        evt.setParams({ "url": "/lead/convertlead.jsp?id=" + leadId });
        evt.fire();
    }
})
