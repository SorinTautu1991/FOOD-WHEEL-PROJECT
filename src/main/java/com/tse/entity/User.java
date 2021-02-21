package com.tse.entity;

import java.net.URL;
import java.util.UUID;

public class User {
    private UUID id;
    private String firstName;
    private String lastName;
    private String address;
    private String country;
    private String email;
    private String password;
    private String dateOfBirth;
    private String gender;
    private String userName;
    private String avatar;
    private URL cloud_url;

    public User(String firstName, String lastName, String address, String country, String email, String password, String dateOfBirth, String gender, String userName, String avatar, URL cloud_url) {
        if(firstName == null || firstName.equals("")){
            throw new NullPointerException("First name cannot be empty!");
        }else{
            this.firstName = firstName;
        }
        if(lastName == null || lastName.equals("")){
            throw new NullPointerException("Last name cannot be empty");
        } else {
            this.lastName = lastName;
        }
        if(address == null || address.equals("")){
            throw new NullPointerException("Address field cannot be empty");
        } else {
            this.address = address;
        }
        if(country == null || country.equals("")){
            throw new NullPointerException("Country field cannot be empty.");
        } else {
            this.country = country;
        }
        if(email == null || email.equals("")){
            throw new NullPointerException("Email field cannot be empty.");
        } else {
            this.email = email;
        }
        if(password == null || password.equals("")){
            throw new NullPointerException("Password field cannot be empty");
        } else {
            this.password = password;
        }
        if(dateOfBirth == null || dateOfBirth.equals("")){
            throw new NullPointerException("Birth date field cannot be empty");
        } else {
            this.dateOfBirth = dateOfBirth;
        }
        if(gender == null || gender.equals("")){
            throw new NullPointerException("Gender field cannot be empty.");
        } else {
            this.gender = gender;
        }
        if(userName == null || userName.equals("")){
            throw new NullPointerException("Username field cannot be empty");
        } else {
            this.userName = userName;
        }
        if(avatar == null || avatar.equals("")){
            throw new NullPointerException("Avatar field cannot be empty");
        } else {
            this.avatar = avatar;
        }
        if(cloud_url == null){
            throw new NullPointerException("URL field cannot be null");
        } else {
            this.cloud_url = cloud_url;
        }
        this.id = UUID.randomUUID();
    }

    public User(String email, String password){
        this.email = email;
        this.password = password;
    }

    public User(UUID id, String firstName, String lastName, String address, String country, String email, String password, String dateOfBirth, String gender, String userName, String avatar, URL cloud_url){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.country = country;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.userName = userName;
        this.avatar = avatar;
        this.cloud_url = cloud_url;
    }

    public User(UUID id, String firstName, String lastName, String address, String country, String email, String password, String dateOfBirth, String gender, String userName, String avatar){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.address = address;
        this.country = country;
        this.email = email;
        this.password = password;
        this.dateOfBirth = dateOfBirth;
        this.gender = gender;
        this.userName = userName;
        this.avatar = avatar;
    }

    public UUID getId() {
        return id;
    }

    public String getAvatar() {
        return avatar;
    }

    public void setId(UUID id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getAddress() {
        return address;
    }

    public void setAddress(String address) {
        this.address = address;
    }

    public String getCountry() {
        return country;
    }

    public void setCountry(String country) {
        this.country = country;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public String getDateOfBirth() {
        return dateOfBirth;
    }

    public void setDateOfBirth(String dateOfBirth) {
        this.dateOfBirth = dateOfBirth;
    }

    public String getGender() {
        return gender;
    }

    public void setGender(String gender) {
        this.gender = gender;
    }

    public String getUserName() {
        return userName;
    }

    public void setUserName(String userName) {
        this.userName = userName;
    }

    public void setCloud_url(URL cloud_url) {
        this.cloud_url = cloud_url;
    }

    public URL getCloud_url() {
        return cloud_url;
    }
}
