({
    doInit: function(component, event, helper) {
        helper.loadRecentActivities(component);
        // Set today's date as default
        var today = new Date();
        var dateStr = today.getFullYear() + '-' +
                      String(today.getMonth() + 1).padStart(2, '0') + '-' +
                      String(today.getDate()).padStart(2, '0');
        component.set('v.activityDate', dateStr);
    },

    openLogModal: function(component, event, helper) {
        component.set('v.showLogModal', true);
    },

    closeModal: function(component, event, helper) {
        component.set('v.showLogModal', false);
        component.set('v.subject', '');
        component.set('v.description', '');
    },

    saveActivity: function(component, event, helper) {
        helper.createActivity(component);
    }
})
