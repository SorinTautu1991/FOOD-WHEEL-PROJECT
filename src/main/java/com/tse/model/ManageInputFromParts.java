package com.tse.model;

import javax.servlet.http.Part;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

public class ManageInputFromParts {

    // Manage input from parts to string

    public String manageInput(Part part) throws IOException {
        InputStream in = part.getInputStream();
        StringBuilder sb = new StringBuilder();
        BufferedReader br = new BufferedReader(new InputStreamReader(in));
        String read;
        while ((read=br.readLine()) != null) {
            sb.append(read);
        }
        br.close();
        return sb.toString();
    }
}
