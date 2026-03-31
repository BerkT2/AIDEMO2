({
    loadRecentActivities: function(component) {
        component.set('v.isLoading', true);
        var action = component.get('c.getRecentActivitiesForRecord');
        action.setParams({
            recordId: component.get('v.recordId'),
            limitCount: 10
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.recentActivities', response.getReturnValue());
            }
            component.set('v.isLoading', false);
        });
        $A.enqueueAction(action);
    },

    createActivity: function(component) {
        var action = component.get('c.logActivity');
        action.setParams({
            recordId: component.get('v.recordId'),
            subject: component.get('v.subject'),
            activityType: component.get('v.activityType'),
            activityDate: component.get('v.activityDate'),
            description: component.get('v.description')
        });
        action.setCallback(this, function(response) {
            if (response.getState() === 'SUCCESS') {
                component.set('v.showLogModal', false);
                component.set('v.subject', '');
                component.set('v.description', '');
                var toastEvt = $A.get('e.force:showToast');
                toastEvt.setParams({
                    title: 'Success',
                    message: 'Activity logged successfully.',
                    type: 'success'
                });
                toastEvt.fire();
                this.loadRecentActivities(component);
            } else {
                var errors = response.getError();
                var toastEvt = $A.get('e.force:showToast');
                toastEvt.setParams({
                    title: 'Error',
                    message: errors[0].message,
                    type: 'error'
                });
                toastEvt.fire();
            }
        });
        $A.enqueueAction(action);
    }
})
