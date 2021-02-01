package com.tse.model;

public class PasswordChangeDeserialisation {
    private String user;
    private String password;
    private String confirmedPsw;

    public PasswordChangeDeserialisation(String user, String password, String confirmedPsw) {
        this.user = user;
        this.password = password;
        this.confirmedPsw = confirmedPsw;
    }

    public String getUser() {
        return user;
    }

    public String getPassword() {
        return password;
    }

    public String getConfirmedPsw() {
        return confirmedPsw;
    }
}
