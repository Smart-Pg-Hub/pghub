package com.backend.enums;

public enum RoomType {

    SINGLE(1),
    TWO_SHARING(2),
    THREE_SHARING(3),
    FOUR_SHARING(4);

    private final int capacity;

    RoomType(int capacity) {
        this.capacity = capacity;
    }

    public int getCapacity() {
        return capacity;
    }
}