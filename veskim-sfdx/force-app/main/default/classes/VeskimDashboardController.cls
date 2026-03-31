/**
 * VeskimDashboardController
 * Apex controller for the Veskim Home Dashboard Aura component.
 * Provides KPI counts and recent record lists for the home page.
 */
public with sharing class VeskimDashboardController {

    @AuraEnabled(cacheable=true)
    public static Integer getLeadCount() {
        return [SELECT COUNT() FROM Lead WHERE IsConverted = false WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getActiveAccountCount() {
        return [SELECT COUNT() FROM Account WHERE Customer_Status__c = 'Active' WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getPendingApprovalCount() {
        return [SELECT COUNT() FROM Account WHERE Finance_Approval_Status__c = 'Pending' WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static Integer getOpenOpportunityCount() {
        return [SELECT COUNT() FROM Opportunity
                WHERE IsClosed = false WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static List<Lead> getRecentLeads() {
        return [SELECT Id, Name, Company, Status, LeadSource, Veskim_Department__c
                FROM Lead
                WHERE IsConverted = false
                WITH SECURITY_ENFORCED
                ORDER BY CreatedDate DESC
                LIMIT 5];
    }

    @AuraEnabled(cacheable=true)
    public static List<Task> getRecentActivities() {
        return [SELECT Id, Subject, ActivityDate, Type, Status, WhatId
                FROM Task
                WITH SECURITY_ENFORCED
                ORDER BY ActivityDate DESC
                LIMIT 5];
    }
}
