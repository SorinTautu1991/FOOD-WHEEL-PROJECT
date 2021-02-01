package com.tse.model;

import java.net.URL;

public class UsernameLastNamePictureDeserialisation {
    private String name;
    private URL cloud_url;
    private String userName;

    public UsernameLastNamePictureDeserialisation(String name, URL cloud_url, String userName) {
        this.name = name;
        this.cloud_url = cloud_url;
        this.userName = userName;
    }

    public String getName() {
        return name;
    }

    public URL getCloud_url() {
        return cloud_url;
    }

    public String getUserName() {
        return userName;
    }
}
