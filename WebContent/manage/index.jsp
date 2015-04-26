<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>


<%

if ( session.getAttribute("admin") == null ){
  ((HttpServletResponse)response).sendRedirect("login.jsp");
}
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Restaurants Manage Page</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="../js/raty/lib/jquery.raty.css">
        <link rel="stylesheet" href="../css/lightbox/lightbox.css">
        <link rel="stylesheet" href="../css/style.css">
    </head>

    <body>
        <!-- top nav bar -->
        <div class = "navbar navbar-inverse navbar-static-top">
            <div class = "container">
                <div class = "navbar-header">
                    <a href = "# " class = "navbar-brand">Restaurants Manage Page</a>
                </div>
                <div class="collapse navbar-collapse">
                    
                    <ul class="nav navbar-nav navbar-right">
                        <li><a href="..">Back</a></li>
                    </ul>
                </div>
            </div>
        </div>

        <div class = "container">
            <div class = "row">
                <!-- google map container -->
                <div class = "col-md-4">
                    <h4>List</h4>
                    <div id="list_box" class="list-group">
                    </div>
                </div>

                <!-- list -->


<div class="col-md-8">
    <h4>Edit</h4>

        <div class="well well-sm">
          <form id="itemForm" class="form-horizontal" action="" method="post">
          <fieldset>
            <legend class="text-center">Item Detail</legend>
    

            <div class="form-group">
              <label class="col-md-3 control-label" for="name">Name</label>
              <div class="col-md-9">
                <input id="name" name="name" required data-minlength="5" type="text" placeholder="Place name" class="form-control">
                <div class="help-block with-errors"></div>
              </div>
            </div>
    

            <div class="form-group">
              <label class="col-md-3 control-label">Vicinity</label>
              <div class="col-md-9">
                <input id="vicinity" name="vicinity" required data-minlength="5" type="text" placeholder="Vicinity" class="form-control">
                <div class="help-block with-errors"></div>
              </div>
            </div>


            <div class="form-group">
              <label class="col-md-3 control-label" for="message">Rating</label>
              <div class="col-md-9">
                <input id="rating" type="hidden">
                <div id="myEditRating"></div>
              </div>
            </div>

            <div class="row">
                <label class="col-md-3 control-label" for="message">Coordinates</label>
                
                <div class="col-md-9">
                    
		            <div class="form-group col-xs-4">
                      <input type="text" class="form-control" id="lat" name="lat" required data-isfloat="foo" placeholder="Lat">
                      <div class="help-block with-errors"></div>
		            </div>
		            <div class="col-xs-1"></div>
	                <div class="form-group col-xs-4">
                      <input type="text" class="form-control" id="lng" name="lng" required data-isfloat="foo" placeholder="Lng">
                      <div class="help-block with-errors"></div>
	                </div>
	                
                </div>
                
            </div>
            
            
         

            <div class="form-group">
              <label class="col-md-3 control-label" for="message">More Info</label>
              <div class="col-md-9">
                <textarea class="form-control" id="moreinfo" name="moreinfo" placeholder="Please enter detail here..." rows="5"></textarea>
              </div>
            </div>
    

            <div class="form-group">
              <div class="col-md-12 text-right">
                <button onclick="addItem()" type="submit" class="btn btn-primary">Add</button>
                <button onclick="saveItem()" type="submit" class="btn btn-primary">Save</button>
              </div>
            </div>
          </fieldset>
          </form>
        </div>

</div>


            </div>
        </div>


        <!-- bottom nav bar -->
        <div class = "navbar navbar-default navbar-fixed-bottom">
            <div class = "container">
                <p class = "navbar-text">by rongtian li s4337746</p>
            </div>
        </div>


        <script type="text/javascript" src="http://maps.googleapis.com/maps/api/js?libraries=places&amp;key=AIzaSyC7U9kfq2P4t8x1JjqXeQg-HvyYCoM0Pdc&amp;sensor=true"></script>
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
        <script type="text/javascript" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>

        <script type="text/javascript" src="../js/raty/lib/jquery.raty.js"></script>
        <script type="text/javascript" src="../js/lightbox/lightbox.min.js"></script>
        <script type="text/javascript" src="../js/validator.js"></script>
        <script type="text/javascript" src="../js/script_manage.js"></script>

        
    </body>
</html>
