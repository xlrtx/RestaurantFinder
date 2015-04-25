import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.Iterator;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;

public class Restaurants {
  private JSONObject jsonObject;
  private String path;
  
  
  public static void main( String[] args ){
    Restaurants rst = new Restaurants("/WebContent/map/data.json");
    System.out.println(rst.get());
  }
  
  
  public Restaurants(String path) {
    ///WebContent/map/data.json
    this.path = path + "map/data.json";
    loadJsonFromFile(this.path);
  }
  
  
  void loadJsonFromFile(String path){
    
    
    JSONParser parser = new JSONParser();

    try {     
        Object obj = parser.parse(new FileReader(path));

        this.jsonObject =  (JSONObject) obj;
    }catch ( Exception e ){
      e.printStackTrace();
    }
    
  }
  
  String get(){

    return jsonObject.toJSONString();

  }
  
  @SuppressWarnings("unchecked")
  boolean add(String itemJson){
    JSONParser parser = new JSONParser();
    try {
      JSONObject newItem = (JSONObject)parser.parse(itemJson);
      JSONArray results = (JSONArray)this.jsonObject.get("results");
      results.add(newItem);
      
      this.jsonObject.remove("results");
      this.jsonObject.put("results", results);
      
      FileWriter out = new FileWriter(this.path);
      out.write(this.jsonObject.toJSONString());
      out.close();
      return true;
      
    } catch (ParseException e) {
      e.printStackTrace();
      return false;
    } catch (IOException e) {
      // TODO Auto-generated catch block
      e.printStackTrace();
      return false;
    }
  }
  
  
  void parseExample(String path) {
    JSONParser parser = new JSONParser();
    path = "WebContent/map/data.json";
    try {     
        Object obj = parser.parse(new FileReader(path));

        JSONObject jsonObject =  (JSONObject) obj;

        //String results = (String) jsonObject.get("results");
        //System.out.println(results);

        // loop array
        JSONArray results = (JSONArray) jsonObject.get("results");
        @SuppressWarnings("unchecked")
        Iterator<JSONObject> iterator = results.iterator();
        while (iterator.hasNext()) {
          JSONObject result = iterator.next();
          System.out.println(result.get("icon"));
        }
    } catch (FileNotFoundException e) {
        e.printStackTrace();
    } catch (IOException e) {
        e.printStackTrace();
    } catch (org.json.simple.parser.ParseException e) {
      e.printStackTrace();
    }
  }
  
}
