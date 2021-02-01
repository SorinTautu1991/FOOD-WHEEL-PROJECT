package com.tse.model;

import java.util.UUID;

public class RandomUUIDGenerator {
    private UUID id;

    public RandomUUIDGenerator() {
        this.id = UUID.randomUUID();
    }

    public UUID getId() {
        return id;
    }
}
