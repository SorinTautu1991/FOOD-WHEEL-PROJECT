package com.tse.model;

import java.util.List;

public class ListOfIngredientsDeserialisationSimple {
    private List<String> arr;

    public ListOfIngredientsDeserialisationSimple(List<String> arr) {
        this.arr = arr;
    }

    public List<String> getListIngr() {
        return arr;
    }
}
