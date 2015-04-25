import java.io.IOException;
import java.io.PrintWriter;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;


@WebServlet("/admin")
public class AdminController extends HttpServlet {
  /**
   * 
   */
  private static final long serialVersionUID = 1L;

  protected void doPost(
      HttpServletRequest request, HttpServletResponse response)
          throws ServletException, IOException {
    
    PrintWriter out = response.getWriter();
    String action = request.getParameter("action");
    HttpSession session = request.getSession();
    
    if ( action.equalsIgnoreCase("login") ){
     
      String un = request.getParameter("username");
      String pw = request.getParameter("password");
      
      
      if ( un.equalsIgnoreCase("admin") && pw.equals("password") ) {
        session.setAttribute("admin", "1");
        ((HttpServletResponse)response).sendRedirect("/RestaurantFinder/manage");
        out.println("login success");
      }else{
        //Wrong pass
        ((HttpServletResponse)response).sendRedirect("/RestaurantFinder/manage/login.jsp?err=1");
      }
      
    }else if ( action.equalsIgnoreCase("logout") ){
      
      session.invalidate();
      out.println("logout success");
    }
    
  }
  
  
}
