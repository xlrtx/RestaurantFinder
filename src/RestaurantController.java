import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletConfig;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@WebServlet("/Restaurants")
public class RestaurantController extends HttpServlet {

  
  /**
   * 
   */
  private static final long serialVersionUID = 1L;
  private String context;
  
  
  public void init(final ServletConfig config) {
    this.context = config.getServletContext().getRealPath("/");

  }
  
  protected void doGet(
      HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    
    
    
    PrintWriter out = response.getWriter();
    String action = request.getParameter("action");
    Restaurants rsts = new Restaurants(context);
    
    if ( action.equalsIgnoreCase("get") ){
      out.println(rsts.get());
    }else if( action.equalsIgnoreCase("add") ){
      
      
      String item = request.getParameter("item");
      if (rsts.add(item)){
        out.println("{add:ok}");
      }else{
        out.println("{add:notok}");
      }
      
      
    }
    
    
    
  }
  
  
}
