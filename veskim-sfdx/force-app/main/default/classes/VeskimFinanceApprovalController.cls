/**
 * VeskimFinanceApprovalController
 * Apex controller for the Veskim Finance Approval Aura component.
 * Handles finance approval and rejection of new account records.
 * On approval, triggers the Logo ERP integration sync.
 */
public with sharing class VeskimFinanceApprovalController {

    @AuraEnabled
    public static void updateFinanceApprovalStatus(Id accountId, String newStatus,
                                                    Decimal approvedLimit, String rejectionReason) {
        Account acc = [SELECT Id, Name, Finance_Approval_Status__c, Customer_Status__c,
                               Approved_Limit__c, Rejection_Reason__c, OwnerId
                        FROM Account WHERE Id = :accountId WITH SECURITY_ENFORCED LIMIT 1];

        acc.Finance_Approval_Status__c = newStatus;

        if (newStatus == 'Approved') {
            acc.Approved_Limit__c = approvedLimit;
            acc.Customer_Status__c = 'Active';
            acc.Rejection_Reason__c = null;
        } else if (newStatus == 'Rejected') {
            acc.Rejection_Reason__c = rejectionReason;
            acc.Customer_Status__c = 'Pending Approval';
        }

        update acc;

        // Send notification to account owner on rejection
        if (newStatus == 'Rejected') {
            sendRejectionNotification(acc);
        }
    }

    private static void sendRejectionNotification(Account acc) {
        // This would use Salesforce Notification framework or Custom Notification
        // Implementation depends on org notification setup
        // Placeholder for notification logic
    }
}
