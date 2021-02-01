package com.tse.model;

public class UserPassword {
    private String email;
    private String password;

    public UserPassword(String email, String password) {
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
