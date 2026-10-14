package com.finserve.dto;

public class CaseUpdateRequest {
    private String status;
    private String priority;
    private Long assignedAnalystId;
    private String notes;
    private String performedByRole = "MANAGER";

    public CaseUpdateRequest() {}

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getPriority() { return priority; }
    public void setPriority(String priority) { this.priority = priority; }

    public Long getAssignedAnalystId() { return assignedAnalystId; }
    public void setAssignedAnalystId(Long assignedAnalystId) { this.assignedAnalystId = assignedAnalystId; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public String getPerformedByRole() { return performedByRole; }
    public void setPerformedByRole(String performedByRole) { this.performedByRole = performedByRole; }
}
