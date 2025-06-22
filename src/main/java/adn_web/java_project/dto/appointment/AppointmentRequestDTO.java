package adn_web.java_project.dto.appointment;

import java.time.LocalDateTime;

public class AppointmentRequestDTO {
    // private Long testTypeId;
    private String testTypeName;
    private LocalDateTime appointmentDate;
    private String notes;

    // Getters and Setters
    // public Long getTestTypeId() {
    //     return testTypeId;
    // }
    // public void setTestTypeId(Long testTypeId) {
    //     this.testTypeId = testTypeId;
    // }
    public String getTestTypeName() {
        return testTypeName;
    }
    public void setTestTypeName(String testTypeName) {
        this.testTypeName = testTypeName;
    }

    public LocalDateTime getAppointmentDate() {
        return appointmentDate;
    }

    public void setAppointmentDate(LocalDateTime appointmentDate) {
        this.appointmentDate = appointmentDate;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }
} 