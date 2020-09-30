var app = angular.module('app',[]);

//angular app controller
app.controller('appController', ['$scope', '$http', '$filter','$timeout' ,function ($scope, $http, $filter,$timeout) {
 
  //hide the message div
  $('#msg').hide();
  

  $scope.email ="";
   $scope.password="";


  //stored password for the user
    $scope.pw = "43ca4d"

    // autofill function
    $scope.autofillPw = function () {
        if ($scope.email =="susan.xuk.x@example.com") {
            $scope.password = $scope.pw;
        }
    }

   //sign in function on the scope
   $scope.signIn = function(){
  

               /**
     * Handles the sign in button press. */

     //get the email and password
    var email = $scope.email;
    var password = $scope.password;

    //email validation
    function validate_form() {

      //pattern variable to check if email is valid
      var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+.([a-zA-Z])+([a-zA-Z])+/;
      // test is the function that checks the email
      var isValid = pattern.test(email);

   
      // getting ids for the output incase of wrong input for data
      var $email_result = $("#email_result");
      var $password_result = $("#password_result");
     
      $email_result.text("");
      $password_result.text("");
      $timeout(function() {}, 0);

      // if statment is to check if fields aren't empty or have invalid inputs
      if ($scope.email =="") {
        $email_result.text("email field is empty)");
       
      } else if (isValid !== true) {
        $email_result.text("Please enter valid email :(");
      
      } 
        else if(password ==""){
        $password_result.text("password field is empty !)");
        
      }else{
        // call ajax login function incase inputted data is valid
        OBP_login();
      }
      }
      
      // call the vailade function 
      validate_form();
    
      function OBP_login() {
           //ajax call for sign in 
              $.ajax({  
                url: "https://psd2-api.openbankproject.com/my/logins/direct",
                  type: "POST",
                  mode: '*cors',
                  // any additional options can be set here
                  beforeSend: function(xhr) {
                      xhr.setRequestHeader("Authorization", 'DirectLogin username='+email+',password='+password+'", consumer_key="erpuqskldnwhgyxgnq04jipbwj50xydxctpu1fgj"');
                  // setting any HTTP headers before message is sent
                },
                dataType:"json",
                crossDomain: true,
                cache: false,
                contentType:"application/json; charset=utf-8",
                'Access-Control-Allow-Origin': '*',
                xhrFields: {
                withCredentials: true
                },
                success: function( data, textStatus, jQxhr ){
                  
              console.log(data);
            // executed if request is successful (success HTTP message is received back from server)
            $scope.token = data.token;

            console.log($scope.token);

            //call the function to get all banks
              $scope.getAllBanks();


            // condition upon successful login authentication
              if (textStatus =="success") {
                //hide hide login div
                    $("#login").hide();
                // show the body
                    $("#body").show();
                
              }else{
                  alert("Wrong input!");
              }

            },
            error: function( jqXhr, textStatus, errorThrown ){
                //hide the message div
                  $('#message').show();
             
                // executed if request failed (error HTTP message is received back from server)
                alert(jqXhr.responseJSON.message);
                
                $scope.message =jqXhr.responseJSON.message;
                $("#message").text(jqXhr.responseJSON.message);
                }
            }); 
      }

 
  

  }
  
//get current user details
// /obp/v4.0.0/users/current

// Defining function to get all banks
$scope.getAllBanks = function () {
    $.ajax({  
        url: "https://psd2-api.openbankproject.com//obp/v4.0.0/banks",
        type: "GET",
        mode: '*cors',
        // any additional options can be set here
        beforeSend: function(xhr) {
          // using the token for authentication
        xhr.setRequestHeader("Authorization", 'DirectLogin token=' + $scope.token);
        
        },
        dataType:"json",
        crossDomain: true,
        cache: false,
        contentType:"application/json; charset=utf-8",
        'Access-Control-Allow-Origin': '*',
        xhrFields: {
        withCredentials: true
        },
        success: function( data, textStatus, jQxhr )
        {
                  // executed if request is successful (success HTTP message is received back from server)
                  console.log(data.banks);

          
                  var bank_data = data.banks;
                  $scope.bank_data = data.banks;
                  var length = data.banks.length;
                  
            if (textStatus =="success")
            {
                //append bank data to the drop down menu
                $("#bank_id").append("select below");
                for (var i = 0; i < length; i++) 
                {
                    var banks = '';
                    banks = bank_data[i].id;
                        
                  // append values to the drop down element 
                  $("#bank_id").append("<option value='" + banks + "'>" + banks + "</option>");
                  }
              
              }else
                  {
                     alert("Wrong input!");
                  }
  
        },
        error: function( jqXhr, textStatus, errorThrown ){
            // executed if request failed (error HTTP message is received back from server)
            console.log(jqXhr.responseJSON.message);

            }
         }); 
}


//get account held at bank by the user
$scope.getAccountHeldAtBank = function (id) {
    // search for specific bank id
    var bank_icon = $filter('filter')($scope.bank_data, {id:id});

    // bank full name
    $scope.full_name =bank_icon[0].full_name;
    // bank icon
    $scope.bank_icon =bank_icon[0].logo;

    //use the id of the bank selected to get the account at bank
   $scope.bank_id = id;

  //  url for the ajax request
   var url ="https://psd2-api.openbankproject.com/obp/v4.0.0/banks/"+$scope.bank_id+"/accounts"

    $.ajax({  
          // url
          url: url,
          type: "GET",
          mode: '*cors',
          // any additional options can be set here
          beforeSend: function(xhr) {
    
              xhr.setRequestHeader("Authorization", 'DirectLogin token=' + $scope.token);
          // setting any HTTP headers before message is sent
          
          },
          dataType:"json",
          crossDomain: true,
          cache: false,
          contentType:"application/json; charset=utf-8",
          'Access-Control-Allow-Origin': '*',
          xhrFields: {
          withCredentials: true
          },
          success: function( data, textStatus, jQxhr ){
          // executed if request is successful (success HTTP message is received back from server)
          console.log(data);
          // account data scope variable
          $scope.account_data =data;

            var account_data = data;
            // get the array length for the for loop to iterate
            var length = data.length;

          if (textStatus =="success") {
            //append bank data to the drop down menu
            $("#account_id").append("select below");
            for (var i = 0; i < length; i++) {
       
            var  accounts = account_data[i].id;
                    
              $("#account_id").append("<option value='" + accounts + "'>" + accounts + "</option>");
                  }
           
         }else{
             alert("Wrong input or user has no account at selected bank!");
         }
          },
          error: function( jqXhr, textStatus, errorThrown ){
              // executed if request failed (error HTTP message is received back from server)
              console.log(jqXhr.responseJSON.message);
              }
              }); 
}

//get transactions for selected account
$scope.getTransactions = function (id) {

   $scope.account_id = id;

   var transactions_url ="https://psd2-api.openbankproject.com/obp/v4.0.0/banks/"+$scope.bank_id+"/accounts/"+$scope.account_id+"/owner/transaction-requests";
   console.log(transactions_url);
 
  $scope.transaction_data = '';//to clear the table
    $.ajax({  
          url: transactions_url,
          type: "GET",
          mode: '*cors',
          // any additional options can be set here
          beforeSend: function(xhr) {
    
              xhr.setRequestHeader("Authorization", 'DirectLogin token=' + $scope.token);
          },
          dataType:"json",
          crossDomain: true,
          cache: false,
          contentType:"application/json; charset=utf-8",
          'Access-Control-Allow-Origin': '*',
          xhrFields: {
          withCredentials: true
          },
          success: function( data, textStatus, jQxhr ){
          // executed if request is successful (success HTTP message is received back from server)
          $scope.transaction_data = data.transaction_requests_with_charges;
          console.log(jQxhr);
           $timeout(function() {}, 0);

          if (data.transaction_requests_with_charges ==0) {
            alert($scope.account_id+" has no transactions");
          }
          },
          error: function( jqXhr, textStatus, errorThrown ){
              // executed if request failed (error HTTP message is received back from server)
              alert(jqXhr.responseJSON.message);
              }
              }); 
}
}]);