<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
    <head>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
        <title>Login</title>
        <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/css/bootstrap.min.css">
        <link rel="stylesheet" href="../css/style.css">
    </head>

    <body>
        <!-- top nav bar -->
        <div class = "navbar navbar-inverse navbar-static-top">
            <div class = "container">
                <div class = "navbar-header">
                    <a href = "# " class = "navbar-brand">User Login</a>
                </div>
            </div>
        </div>

        <div class = "container">
            <div class = "col-md-8 col-md-offset-2">
                <div class="panel panel-default">
                    <div class="panel-heading">Login</div>
                    <div class="panel-body">

                        
                            <div class="alert alert-danger hidden" id="errbox">
                                <strong>Wrong password or username.</strong>
                            </div>

                        <form id="login_form" class="form-horizontal" role="form" method="POST" action="../admin">
                        <input type="hidden" name="action" value="login">

                        <div class="form-group">
                            <label class="col-md-4 control-label">User Name</label>
                            <div class="col-md-6">
                                <input class="form-control" name="username">
                            </div>
                        </div>

                        <div class="form-group">
                            <label class="col-md-4 control-label">Password</label>
                            <div class="col-md-6">
                                <input type="password" class="form-control" name="password">
                            </div>
                        </div>

                        <div class="form-group">
                            <div class="col-md-6 col-md-offset-4">
                                <button type="submit" class="btn btn-primary">Login</button>
                            </div>
                        </div>
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
        <script type="text/javascript" src="https://code.jquery.com/jquery-2.1.3.min.js"></script>
        <script type="text/javascript" src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.2/js/bootstrap.min.js"></script>
        <script>
        function getUrlParameter(sParam)
        {
            var sPageURL = window.location.search.substring(1);
            var sURLVariables = sPageURL.split('&');
            for (var i = 0; i < sURLVariables.length; i++) 
            {
                var sParameterName = sURLVariables[i].split('=');
                if (sParameterName[0] == sParam) 
                {
                    return sParameterName[1];
                }
            }
        }  
        if ( getUrlParameter('err') === "1" ){
        	$('#errbox').removeClass('hidden');
        }
        </script>


    </body>
</html>
