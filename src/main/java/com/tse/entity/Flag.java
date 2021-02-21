// This class was used in production to simplify the process of adding data to db

package com.tse.entity;
import java.net.URL;
import java.util.UUID;

public class Flag {
    private UUID id;
    private String nameOfCountry;
    private URL flagUrl;

    public Flag(URL flagUrl, String nameOfCountry) {
        this.id = UUID.randomUUID();
        this.nameOfCountry = nameOfCountry;
        this.flagUrl = flagUrl;
    }

    public UUID getId() {
        return id;
    }

    public URL getFlagUrl() {
        return flagUrl;
    }

    public String getNameOfCountry() {
        return nameOfCountry;
    }
}
