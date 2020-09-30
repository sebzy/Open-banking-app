/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
//  chrome.exe --disable-web-security --user-data-dir="C:\Windows\System32\"
// var controller = null
var app = {
  
  initialize: function() {
  document.addEventListener('deviceready',this.onDeviceReady.bind(this), false);
  },
  onDeviceReady: function() {
  console.log("received deviceready");

       //signing into the app event listener
  document.getElementById("signIn").addEventListener("click",this.signIn);


   //get accounts held at bank
   document.getElementById("signIn").addEventListener("click",this.GetAccountsHeldAtBank);

  $("#body").hide();
  // document.getElementById("hellobutton").addEventListener("click",
  // this.printhello);

  
       
 
  },

  
 
     //sign into the app function
     signIn: function () 
     {
                /**
      * Handles the sign in button press.
      */
 
      //get the email and password
     var email = document.getElementById('email').value;
     var password = document.getElementById('password').value;
 
      
     let config = {
       headers: {
         "Content-Type": "application/json",
         'Access-Control-Allow-Origin': '*',
         }
       }
       
   console.log("running");

   //show the loader
  //  $(".ui-loader").show();
   $( ".selector" ).loader( "show" );

   $.ajax({  
     //
     url: "https://psd2-api.openbankproject.com/my/logins/direct",
       // url: "https://psd2-api.openbankproject.com//obp/v3.0.0/banks/at02-bank-x--01",
       // url: "https://psd2-api.openbankproject.com//obp/v3.0.0/banks/at02-0019--01/accounts-held",
       // url: "https://psd2-api.openbankproject.com//obp/v3.0.0/banks/at02-0019--01/accounts/12/owner/transactions",
       type: "POST",
       mode: '*cors',
       // any additional options can be set here
       beforeSend: function(xhr) {
 // DirectLogin username="robert.xuk.x@example.com",password="5232e7", consumer_key="erpuqskldnwhgyxgnq04jipbwj50xydxctpu1fgj"'
           // xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
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
       // executed if request is successful (success HTTP message is received back from server)
        //show the loader
   $(".ui-loader").hide();
      //  console.log(data,"     ",textStatus);
      var token = data.token;
 
 console.log(token);
 
       //call the function to get all banks
       $.ajax({  
        url: "https://psd2-api.openbankproject.com//obp/v4.0.0/banks",
        type: "GET",
        mode: '*cors',
        // any additional options can be set here
        beforeSend: function(xhr) {
          // using the token for authentication
        xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
        
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
        console.log(data.banks);
        // console.log(data.banks);
        var length = data.banks.length;

        var bank_data = data.banks;
  
          //append bank data to the drop down menu
          $("#banks").append("select below");
          for (var i = 0; i < length; i++) {

              var banks = '';

                  banks = bank_data[i].id;
                  

            $(".banks").append("<option value='" + banks + "'>" + banks + "</option>");
                }
  if (textStatus =="success") {
    
    
  }else{
      alert("Wrong input!");
  }
  
        },
        error: function( jqXhr, textStatus, errorThrown ){
            // executed if request failed (error HTTP message is received back from server)
            }
            }); 
 
 
 
 if (textStatus =="success") {
     // location.href = "app.html";
    
       $("#login").hide();
    
 
       $("#body").show();
   
 }else{
     alert("Wrong input!");
 }
 
       },
       error: function( jqXhr, textStatus, errorThrown ){
           // executed if request failed (error HTTP message is received back from server)
           }
           }); 
     },


       //Get Account Held At Bank
       GetAccountsHeldAtBank: function () 
       {

        var token = "eyJhbGciOiJIUzI1NiJ9.eyIiOiIifQ.0Wbv2Kq_NYzXDPFng9XXTUoZFntEpPMTuqqm8REPeD0";
        $.ajax({  
          //
          // url: "https://psd2-api.openbankproject.com/my/logins/direct",
            // url: "https://psd2-api.openbankproject.com//obp/v3.0.0/banks/at02-bank-x--01",
            url: "https://psd2-api.openbankproject.com/obp/v4.0.0/banks/psd201-bank-x--uk/accounts/private",
            // url: "https://psd2-api.openbankproject.com//obp/v3.0.0/banks/at02-0019--01/accounts/12/owner/transactions",
            type: "GET",
            mode: '*cors',
            // any additional options can be set here
            beforeSend: function(xhr) {
      
                xhr.setRequestHeader("Authorization", 'DirectLogin token=' + token);
                // xhr.setRequestHeader("Authorization", 'DirectLogin username="robert.xuk.x@example.com",password="5232e7", consumer_key="erpuqskldnwhgyxgnq04jipbwj50xydxctpu1fgj"');
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
            },
            error: function( jqXhr, textStatus, errorThrown ){
                // executed if request failed (error HTTP message is received back from server)
                }
                }); 
       },
  



     


  
  };
  app.initialize();