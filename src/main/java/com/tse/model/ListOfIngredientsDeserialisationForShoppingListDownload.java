package com.tse.model;

import java.util.List;
import java.util.Map;

public class ListOfIngredientsDeserialisationForShoppingListDownload {
    private Map<String, List<String>> obj;

    public ListOfIngredientsDeserialisationForShoppingListDownload(Map<String, List<String>> obj) {
        this.obj = obj;
    }

    public Map<String, List<String>> getObj() {
        return obj;
    }
}
