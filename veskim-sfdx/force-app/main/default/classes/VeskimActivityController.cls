/**
 * VeskimActivityController
 * Apex controller for the Veskim Activity Logger Aura component.
 * Handles activity retrieval and creation for accounts and leads.
 */
public with sharing class VeskimActivityController {

    @AuraEnabled(cacheable=true)
    public static List<Task> getRecentActivitiesForRecord(Id recordId, Integer limitCount) {
        Integer lim = (limitCount != null && limitCount > 0) ? limitCount : 10;
        return [SELECT Id, Subject, ActivityDate, Type, Status, Description, WhoId, WhatId, OwnerId
                FROM Task
                WHERE WhatId = :recordId
                WITH SECURITY_ENFORCED
                ORDER BY ActivityDate DESC
                LIMIT :lim];
    }

    @AuraEnabled
    public static String logActivity(Id recordId, String subject, String activityType,
                                     String activityDate, String description) {
        try {
            Task t = new Task();
            t.Subject = subject;
            t.Type = activityType;
            t.ActivityDate = Date.valueOf(activityDate);
            t.Description = description;
            t.WhatId = recordId;
            t.Status = 'Completed';
            t.Priority = 'Normal';
            insert t;
            return t.Id;
        } catch (Exception e) {
            throw new AuraHandledException('Error logging activity: ' + e.getMessage());
        }
    }
}
