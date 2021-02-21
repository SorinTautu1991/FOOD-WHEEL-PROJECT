package com.tse.model;

import org.json.JSONObject;
import java.util.List;

public class NutrientsDeserialisation {
    private String food_name;
    private double nf_saturated_fat;
    private JSONObject metadata;
    private double nf_cholesterol;
    private String sub_recipe;
    private String nix_brand_id;
    private double nf_potassium;
    private double meal_type;
    private double nf_total_fat;
    private double nf_sugars;
    private double nf_protein;
    private double source;
    private String nix_item_id;
    private double ndb_no;
    private String serving_unit;
    private List<JSONObject> alt_measures;
    private double nf_p;
    private String lat;
    private String lng;
    private String consumed_at;
    private String nix_item_name;
    private String upc;
    private JSONObject photo;
    private String brand_name;
    private double serving_weight_grams;
    private double nf_total_carbohydrate;
    private List<JSONObject> full_nutrients;
    private JSONObject tags;
    private String nix_brand_name;
    private double serving_qty;
    private double nf_calories;
    private double nf_sodium;
    private double nf_dietary_fiber;

    public NutrientsDeserialisation(String food_name, double nf_saturated_fat, JSONObject metadata, double nf_cholesterol, String sub_recipe, String nix_brand_id, double nf_potassium, double meal_type, double nf_total_fat, double nf_sugars, double nf_protein, double source, String nix_item_id, double ndb_no, String serving_unit, List<JSONObject> alt_measures, double nf_p, String lat, String lng, String consumed_at, String nix_item_name, String upc, JSONObject photo, String brand_name, double serving_weight_grams, double nf_total_carbohydrate, List<JSONObject> full_nutrients, JSONObject tags, String nix_brand_name, double serving_qty, double nf_calories, double nf_sodium, double nf_dietary_fiber) {
        this.food_name = food_name;
        this.nf_saturated_fat = nf_saturated_fat;
        this.metadata = metadata;
        this.nf_cholesterol = nf_cholesterol;
        this.sub_recipe = sub_recipe;
        this.nix_brand_id = nix_brand_id;
        this.nf_potassium = nf_potassium;
        this.meal_type = meal_type;
        this.nf_total_fat = nf_total_fat;
        this.nf_sugars = nf_sugars;
        this.nf_protein = nf_protein;
        this.source = source;
        this.nix_item_id = nix_item_id;
        this.ndb_no = ndb_no;
        this.serving_unit = serving_unit;
        this.alt_measures = alt_measures;
        this.nf_p = nf_p;
        this.lat = lat;
        this.lng = lng;
        this.consumed_at = consumed_at;
        this.nix_item_name = nix_item_name;
        this.upc = upc;
        this.photo = photo;
        this.brand_name = brand_name;
        this.serving_weight_grams = serving_weight_grams;
        this.nf_total_carbohydrate = nf_total_carbohydrate;
        this.full_nutrients = full_nutrients;
        this.tags = tags;
        this.nix_brand_name = nix_brand_name;
        this.serving_qty = serving_qty;
        this.nf_calories = nf_calories;
        this.nf_sodium = nf_sodium;
        this.nf_dietary_fiber = nf_dietary_fiber;
    }

    public String getFood_name() {
        return food_name;
    }

    public double getNf_saturated_fat() {
        return nf_saturated_fat;
    }

    public JSONObject getMetadata() {
        return metadata;
    }

    public double getNf_cholesterol() {
        return nf_cholesterol;
    }

    public String getSub_recipe() {
        return sub_recipe;
    }

    public String getNix_brand_id() {
        return nix_brand_id;
    }

    public double getNf_potassium() {
        return nf_potassium;
    }

    public double getMeal_type() {
        return meal_type;
    }

    public double getNf_total_fat() {
        return nf_total_fat;
    }

    public double getNf_sugars() {
        return nf_sugars;
    }

    public double getNf_protein() {
        return nf_protein;
    }

    public double getSource() {
        return source;
    }

    public String getNix_item_id() {
        return nix_item_id;
    }

    public double getNdb_no() {
        return ndb_no;
    }

    public String getServing_unit() {
        return serving_unit;
    }

    public List<JSONObject> getAlt_measures() {
        return alt_measures;
    }

    public double getNf_p() {
        return nf_p;
    }

    public String getLat() {
        return lat;
    }

    public String getLng() {
        return lng;
    }

    public String getConsumed_at() {
        return consumed_at;
    }

    public String getNix_item_name() {
        return nix_item_name;
    }

    public String getUpc() {
        return upc;
    }

    public JSONObject getPhoto() {
        return photo;
    }

    public String getBrand_name() {
        return brand_name;
    }

    public double getServing_weight_grams() {
        return serving_weight_grams;
    }

    public double getNf_total_carbohydrate() {
        return nf_total_carbohydrate;
    }

    public List<JSONObject> getFull_nutrients() {
        return full_nutrients;
    }

    public JSONObject getTags() {
        return tags;
    }

    public String getNix_brand_name() {
        return nix_brand_name;
    }

    public double getServing_qty() {
        return serving_qty;
    }

    public double getNf_calories() {
        return nf_calories;
    }

    public double getNf_sodium() {
        return nf_sodium;
    }

    public double getNf_dietary_fiber() {
        return nf_dietary_fiber;
    }
}
