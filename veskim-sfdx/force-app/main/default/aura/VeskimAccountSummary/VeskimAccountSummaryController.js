({
    doInit: function(component, event, helper) {
        component.find("accountRecord").reloadRecord();
    },

    recordLoaded: function(component, event, helper) {
        component.set("v.isLoading", false);
    }
})
