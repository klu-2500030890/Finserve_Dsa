package com.finserve.dto;

public class OtpVerificationResponse {
    private boolean verified;
    private String message;
    private String generatedOtp;
    private String phone;
    private boolean userDetailsMatched;
    private String customerName;

    public OtpVerificationResponse() {}

    public OtpVerificationResponse(boolean verified, String message, String generatedOtp, String phone, boolean userDetailsMatched, String customerName) {
        this.verified = verified;
        this.message = message;
        this.generatedOtp = generatedOtp;
        this.phone = phone;
        this.userDetailsMatched = userDetailsMatched;
        this.customerName = customerName;
    }

    public static Builder builder() {
        return new Builder();
    }

    public static class Builder {
        private boolean verified;
        private String message;
        private String generatedOtp;
        private String phone;
        private boolean userDetailsMatched;
        private String customerName;

        public Builder verified(boolean verified) { this.verified = verified; return this; }
        public Builder message(String message) { this.message = message; return this; }
        public Builder generatedOtp(String generatedOtp) { this.generatedOtp = generatedOtp; return this; }
        public Builder phone(String phone) { this.phone = phone; return this; }
        public Builder userDetailsMatched(boolean userDetailsMatched) { this.userDetailsMatched = userDetailsMatched; return this; }
        public Builder customerName(String customerName) { this.customerName = customerName; return this; }

        public OtpVerificationResponse build() {
            return new OtpVerificationResponse(verified, message, generatedOtp, phone, userDetailsMatched, customerName);
        }
    }

    public boolean isVerified() { return verified; }
    public void setVerified(boolean verified) { this.verified = verified; }

    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }

    public String getGeneratedOtp() { return generatedOtp; }
    public void setGeneratedOtp(String generatedOtp) { this.generatedOtp = generatedOtp; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public boolean isUserDetailsMatched() { return userDetailsMatched; }
    public void setUserDetailsMatched(boolean userDetailsMatched) { this.userDetailsMatched = userDetailsMatched; }

    public String getCustomerName() { return customerName; }
    public void setCustomerName(String customerName) { this.customerName = customerName; }
}
