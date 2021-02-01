package com.tse.model;


import java.net.URL;

public class ResponseForMyAccountDetailsSerialisation {
    private URL picURL;
    private String userNameFromDb;
    private String country;
    private String address;
    private String gender;

    public ResponseForMyAccountDetailsSerialisation(URL picURL, String userNameFromDb, String country, String address, String gender) {
        this.picURL = picURL;
        this.userNameFromDb = userNameFromDb;
        this.country = country;
        this.address = address;
        this.gender = gender;
    }

    public String getAddress() {
        return address;
    }

    public URL getPicURL() {
        return picURL;
    }

    public String getUserNameFromDb() {
        return userNameFromDb;
    }

    public String getCountry() {
        return country;
    }

    public String getGender() {
        return gender;
    }
}
