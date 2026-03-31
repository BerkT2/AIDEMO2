({
    loadDashboardData: function(component) {
        component.set('v.isLoading', true);

        // Load Lead count
        var leadAction = component.get("c.getLeadCount");
        leadAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.leadCount", response.getReturnValue());
            }
        });

        // Load Active Account count
        var accountAction = component.get("c.getActiveAccountCount");
        accountAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.activeAccountCount", response.getReturnValue());
            }
        });

        // Load Pending Approval count
        var pendingAction = component.get("c.getPendingApprovalCount");
        pendingAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.pendingApprovalCount", response.getReturnValue());
            }
        });

        // Load Open Opportunity count
        var oppAction = component.get("c.getOpenOpportunityCount");
        oppAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.openOpportunityCount", response.getReturnValue());
            }
        });

        // Load Recent Leads
        var recentLeadsAction = component.get("c.getRecentLeads");
        recentLeadsAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.recentLeads", response.getReturnValue());
            }
        });

        // Load Recent Activities
        var recentActivitiesAction = component.get("c.getRecentActivities");
        recentActivitiesAction.setCallback(this, function(response) {
            if (response.getState() === "SUCCESS") {
                component.set("v.recentActivities", response.getReturnValue());
                component.set("v.isLoading", false);
            }
        });

        $A.enqueueAction(leadAction);
        $A.enqueueAction(accountAction);
        $A.enqueueAction(pendingAction);
        $A.enqueueAction(oppAction);
        $A.enqueueAction(recentLeadsAction);
        $A.enqueueAction(recentActivitiesAction);
    }
})
