package com.tse.model;

public class EmailAndPasswordDeserialisation {
    private String email;
    private String password;

    public EmailAndPasswordDeserialisation(String email, String password) {
        this.email = email;
        this.password = password;
    }

    public String getEmail() {
        return email;
    }

    public String getPassword() {
        return password;
    }
}
