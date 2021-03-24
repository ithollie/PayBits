"use strict"
const  Model =  {};//Model
const  View =  {};//view
const  Controller =  {};//Controller
const  Objects    =  {};//Objects 

Controller.initialize  =  function(eventObject){

  View.phone          = document.getElementById("phone");
  View.amount         = document.getElementById("amount");

  View.jframe         = document.querySelector("#jframe");
  View.youtubes       = document.querySelector(".youtube");
  View.topnav         = document.querySelector(".topnav");
  View.delete         = document.querySelector(".delete");
  View.sittings       = document.querySelector(".sittings")

  View.show_to_nav    = document.getElementById("show_to_nav");
  View.vidclips       = document.querySelectorAll(".vidclip")
  View.send           = document.querySelectorAll("#send");

  View.saysend        = document.getElementById("sendsay");
  View.holder         = document.querySelectorAll(".holder");
  View.commentfirst   = document.getElementById("fname");
  View.commentlast    = document.getElementById("lname");
  View.commentSubject = document.getElementById("suject");
  View.sendBits       = document.getElementById("Bits");
  View.subject  = document.getElementById("subject");
  View.comdiv =   document.getElementById("comdiv");
  View.likes =    document.getElementById("likes");
  View.dislikes = document.getElementById("dislikes");
  View.comments = document.getElementById("comments");
  View.insertComments =  document.getElementById("insertComment");
  View.popup = document.getElementById("myPopup");
  View.requests  =  document.querySelector("#requests");
  
  View.titles     =  document.querySelectorAll("#title");
  View.titlesNum    =  document.querySelectorAll("#spcomments");
 
  View.commentAll = document.querySelectorAll("#comments");
  View.requestAll = document.querySelectorAll("#requests");
  View.likesAll   = document.querySelectorAll('#likes');
  View.dislikesAll = document.querySelectorAll('#dislikes');
 View.createRequestsAll = document.querySelectorAll("#createRequests");
 View.tubs  = document.querySelectorAll(".tub");

 //View.comments.addEventListener('click',Controller.comments);
 //View.youtubes.addEventListener('click',Controller.automate);
 //View.show_to_nav.addEventListener('click', Controller.show_to_nav);
 View.sendBits.addEventListener('click' , Controller.sendBits);
 //View.sittings.addEventListener('click', Controller.sittings);

 View.send.forEach(elements=>{
    elements.addEventListener('click', Controller.sendComment);
 })
 View.vidclips.forEach(elements=>{
    elements.addEventListener('click', Controller.vidclip);
 })
 //View.saysend.addEventListener('click',Controller.saysomething);

  View.createRequestsAll.forEach(elements=>{
     elements.addEventListener('click',  Controller.message);
 })

  View.commentAll.forEach(elements=>{
      elements.addEventListener('click',Controller.message);
 })
 
   View.likesAll.forEach(elements=>{
      
      elements.addEventListener('click', Controller.likes)
  })
  
   View.dislikesAll.forEach(elements=>{
      elements.addEventListener('click', Controller.dislikes)
  })
  
   View.requestAll.forEach(element=>{
      element.addEventListener("click",Controller.requests);
  })
  
   View.tubs.forEach(element=>{
      element.addEventListener("click", Controller.reacte);
  })
}
//END OF  INITIATION
Controller.sendBits = function(event){
      let phone = View.phone.value;
      let amount = View.amount.value;

      if(phone != ""  &&  amount != ""){
          console.log("The phone " + phone);
          console.log("The amount " +amount) ;
          $.ajax({
              type: "POST",
              url: "/sendBits",
              data: JSON.stringify({
              "phone":View.phone.value,
              "amount":View.amount.value

              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                  alert(JSON.stringify(data['phone']));
              }
           })
           event.preventDefault();
      }else{

        console.log("one or two  field  is  empty");
      }
}
Controller.deleteContent = function(event){
    console.log("The paragrah function  has been clicked");
    console.log(event);
}

Controller.vidclip = function(event){
    console.log(event);
    alert("vidclips been cliked")
}
Controller.show_to_nav = function(){
    alert("I have been  clicked")
    View.topnav.style.visibility="visible"
    View.topnav.style.height="80px"
}
Controller.change  = function(title,number){
	View.titles.forEach(likes=>{
		if(likes.childNodes[1].childNodes[5].attributes[1].value ==  title){
		   likes.childNodes[1].childNodes[5].childNodes[1].childNodes[1].innerText= number+1;
        }
	})
}
Controller.myFunction =  function(event){
    console.log("hello Ibrahim There is no doubt that  life  is black and  white");
    let show = document.getElementById("myPopup");
    show.classList.toggle("show");
}
Controller.sendComment = function(event){
    
    var li = document.createElement("li");
    var inputValue  =  event.target.parentNode.childNodes[1].value;
    var infor       =  event.target.parentNode.childNodes[1].value;
    var title       =  event.target.parentNode.attributes[0].value;
 
    var t = document.createTextNode(inputValue);
    li.appendChild(t);
    
    if (inputValue === '') {
        alert("You must write something!");
    }
    if (inputValue !=""){
    var num  = parseInt(document.getElementById(event.target.attributes[3].value+"_blogcomment").innerText);
    num =+1

    var new_number = parseInt(document.getElementById(event.target.attributes[3].value+"_blogcomment").innerText) + num;
    document.getElementById(event.target.attributes[3].value+"_blogcomment").innerText = new_number
    console.log("This is the blog tile id "+new_number);
       $.ajax({
              type: "POST",
              url: "/commentor",
              data: JSON.stringify({
              "blog_title":event.target.attributes[3].value,
              "blog_email":event.target.attributes[4].value,
              "blog_comment":infor,
              "blog_id":event.target.attributes[5].value,
              
              "_user":$(".iden")[0].innerText,
              "_email":$("#header")[0].attributes[1].value, 
              "_id":$("#header")[0].attributes[2].value,
               
              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                    console.log(data);
              }
          })
        event.preventDefault();    
        for(let i = 0; i < View.holder.length; i++){
            if (View.holder[i].attributes[1].value == title){   
                View.holder[i].appendChild(li);
                event.target.parentNode.childNodes[1].value ="";
                
           }
       }
    }
    
   
    
}
Controller.saysomething = function(event){

    console.log($(".iden")[0].innerText);
    console.log($("#header")[0].attributes[1].value);
    console.log($("#header")[0].attributes[2].value);
    let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
    if (saysomething_comment === '') {
        alert("You must write something!");
    }
    if(saysomething_comment !="" && document.getElementById("ithollie@yahoo.comparagraph") == null){
        
        let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
        
       $.ajax({
              type: "POST",
              url: "/saysomething",
              data: JSON.stringify({
        
              "_user":$(".iden")[0].innerText,
              "_email":$("#header")[0].attributes[1].value, 
              "_id":$("#header")[0].attributes[2].value,
              "_text":saysomething_comment

               
              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                    console.log(data);
              }
          })
        event.preventDefault();
        document.getElementById($("#header")[0].attributes[1].value+"_comment").value = ""
        
        for(let i = 0; i < View.holder.length; i++){
            if (View.holder[i].attributes[1].value == title){   
                View.holder[i].appendChild(li);
                event.target.parentNode.childNodes[1].value ="";
                
           }
       }
    }
    if (saysomething_comment !="" && document.getElementById("ithollie@yahoo.comparagraph").innerHTML !=""){
    
        let saysomething_comment = document.getElementById($("#header")[0].attributes[1].value+"_comment").value;
        document.getElementById("ithollie@yahoo.comparagraph").innerHTML = saysomething_comment;
       $.ajax({
              type: "POST",
              url: "/saysomething",
              data: JSON.stringify({
        
              "_user":$(".iden")[0].innerText,
              "_email":$("#header")[0].attributes[1].value, 
              "_id":$("#header")[0].attributes[2].value,
              "_text":saysomething_comment

               
              } ),
              contentType: "application/json; charset=utf-8",
              dataType: "json",
              success: function (data) {
                    console.log(data);
              }
          })
        event.preventDefault();
        document.getElementById($("#header")[0].attributes[1].value+"_comment").value = ""
        for(let i = 0; i < View.holder.length; i++){
            if (View.holder[i].attributes[1].value == title){   
                View.holder[i].appendChild(li);
                event.target.parentNode.childNodes[1].value ="";
                
           }
       }
    }
    
   
    
}
Controller.dislikes =  function(event){
   console.log(event);
   console.log("number" + event.path[1].childNodes[1].innerText);
   console.log("email" +  event.path[2].attributes[2].nodeValue);
   console.log("title" +  event.path[2].attributes[1].nodeValue)
   console.log("_id"  +   event.path[2].attributes[3].nodeValue)
   
   let y = parseInt(event.path[1].childNodes[1].innerText) + 1;
   event.path[1].childNodes[1].innerText = y;
      
      $.ajax({
          type: "POST",
          url: "/dislikes",
          data: JSON.stringify({
          "title":event.path[2].attributes[1].nodeValue,
          "email":event.path[2].attributes[2].nodeValue, 
          "_id":event.path[2].attributes[3].nodeValue,
           "current_num":parseInt(event.path[1].childNodes[1].innerText)
          } ),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
              alert(JSON.stringify(data['title']));
          }
       })
       event.preventDefault();
}
Controller.likes    =  function(event){
    console.log(event);
    console.log("number" + event.path[1].childNodes[1].innerText);
    console.log("email" +  event.path[2].attributes[2].nodeValue);
    console.log("title" +  event.path[2].attributes[1].nodeValue)
    console.log("_id"  +   event.path[2].attributes[3].nodeValue)
    
    let y = parseInt(event.path[1].childNodes[1].innerText) + 1;
    event.path[1].childNodes[1].innerText = y;
       
     $.ajax({
           type: "POST",
           url: "/likes",
           data: JSON.stringify({
           "title":event.path[2].attributes[1].nodeValue,
           "email":event.path[2].attributes[2].nodeValue, 
           "_id":event.path[2].attributes[3].nodeValue,
            "current_num":parseInt(event.path[1].childNodes[1].innerText)
           } ),
           contentType: "application/json; charset=utf-8",
           dataType: "json",
           success: function (data) {
               alert(JSON.stringify(data['title']));
           }
        })
        event.preventDefault();
 }
Controller.requests =  function(event){
    
    console.log(event.path[2].attributes);
    console.log($('#wrapper'))
    console.log($("#wrapper")[0].attributes[1])
    console.log($("#wrapper")[0].attributes[2])
    console.log($("#wrapper")[0].attributes[3])

    console.log($('#contents'))
    console.log($("#contents")[0].attributes[1])
    console.log($("#contents")[0].attributes[3])
    console.log($("#contents")[0].attributes[4])

    $.ajax({
          type: "POST",
          url: "/user_request",
          data: JSON.stringify({
          //login user information
           "login_name":$("#wrapper")[0].attributes[3].value,
           "login_email":$("#wrapper")[0].attributes[2].value,
           "login_id":$("#wrapper")[0].attributes[1].value,
           
           "post_name":$("#contents")[0].attributes[1].value,
           "post_email":$("#contents")[0].attributes[3].value,
           "post_id":$("#contents")[0].attributes[4].value,
           
           
           "button_state":"clicked",
           "accept":0,
           "count":1
           
          } ),
          contentType: "application/json; charset=utf-8",
          dataType: "json",
          success: function (data) {
            alert(JSON.stringify(data));
              
          }
       })
       event.preventDefault();
}

