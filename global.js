var arrSurveyQuestions = {
   2: "Which is the most common type of anemia that you see in cancer patients?",
   3: "In your practice, how many patients with cancer related anemia you see in a month?",
   4: "Which is the most preferred type of anemia treatment irrespective of cost?",
   5: "Considering safety & efficacy of iron, which is your most preferred choice of therapy?",
   6: "Which product comes on top of your mind when you think of IV Iron?",
   7: "What is the most common cause behind the side effects of IV iron?",
   8: "Most preferred dose?",
   9: "What is the duration in which iron-deficiency anaemia is treated after administration of FCM?",
   10: "Ferinject allows for controlled delivery of iron in a dose dependent manner. Does this lead to better safety of the product?"
   
};
/*Code by android developers start here*/
var startLoc = null;
//var contentName = '152';
//step 1:-
var contentName = parseInt(localStorage.getItem("currentbrand"));
var currentContentId  = parseInt(localStorage.getItem('currentcontent'));
//ends
var currentContentNSlide ='';

//custom slides changes begins here....

//console.log("+++++currentContentId+++++++"+currentContentId+"+++++++contentName+++++++"+contentName);
	if (typeof(localStorage.getItem("currentcustomslideflag"))!='undefined' &&  localStorage.getItem("currentcustomslideflag") =='true'){
		var custcomslideid1=parseInt(localStorage.getItem("currentcontentcustomslideId"));
		//step 2:

		currentContentNSlide = currentContentId+"_"+contentName+"_"+custcomslideid1;
		//step 2 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",custcomslideid1);

	}else{
		//step 3 :
		currentContentNSlide = currentContentId+"_"+contentName+"_"+'1';
		//step 3 ends here
		localStorage.setItem("current",currentContentNSlide);
		localStorage.setItem("currentslide",'1');
	}
checkClickThrough();

document.getElementById("main_content").addEventListener("touchmove", touchHandler, false);
document.getElementById("main_content").addEventListener("touchstart", touchHandler, false);
function touchHandler(e) {

	if (e.type == "touchstart") {

			 if( e.touches.length == 1 ) { // one finger touch
			 	var touch = e.touches[ 0 ];
			 	startLoc = { x : touch.pageX, y : touch.pageY };
			 }

			} else if (e.type == "touchmove") {
				if( startLoc ) {
					var touch = e.touches[ 0 ];

					if( Math.abs( startLoc.x - touch.pageX ) > Math.abs( startLoc.y - touch.pageY ) )
					{
						e.preventDefault();
					}
					startLoc = null;
				}

			}
		}
		/*Code by android developers ends here*/
		$(document).ready(function(){

			var ua = navigator.userAgent;
	//var event = "touchstart";
	var event = (ua.match(/Ipad/i)) ? "touchstart" : "click";


	$(".left_arrow").click(function(event) {
		go_nav('b');
	});

	$(".right_arrow").click(function(event) {
		go_nav('f');
	});

	$(".slides").click(function(){
		var slideNum =	$(this).index()+1;
		console.log(slideNum);
		open_page("",slideNum);

	});

	$(".reference").removeClass("active");

	$('.reference').on('swipeleft swiperight', function(event) {
		event.stopPropagation();
	});

	$(".box_btn").bind("click",function(){
		$(".reference").toggleClass("active");
	});

	currentSlide();

		$("#main_content").swipe({
	   swipeLeft:function(event, direction, distance, duration, fingerCount) {
		  //step 4:-
		console.log("swipeleft"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 4 ends here
		
		//alert("swipeleft");
		//myconsole("swipeleft");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		//alert("swipeleft"+page_id);
		var last_page_id = $(".slides").length;
		var slide_jumper_open = $(".reference").hasClass("active");
		if(page_id == last_page_id+1)	{
			return
		} else{
			go_nav('f');
		}
	  },

	  swipeRight:function(event, direction, distance, duration, fingerCount) {
		  //step 5:-
		console.log("swiperight"+localStorage.getItem("currentslide"));
		localStorage.setItem("previousslide",localStorage.getItem("currentslide"));
		//step 5 ends here 
		
			//alert("swiperight");
		//myconsole("swiperight");
		var page_id =  parseInt($("#wrapper").attr("rel"));
		var slide_jumper_open = $(".reference").hasClass("active");

		if(page_id == 0){
			//console.log("First Slide");
			//myconsole("First Slide");
			return
		} else {
			go_nav('b');
		}

	  } ,

        //Default is 75px, set to 0 for demo so any distance triggers swipe
         threshold:0
	});


});

//step 6:-
function toCaptureTime(page_id){
	var currentSlideNo = page_id;
	var startTime = Date.now();
	
	//alert("===currentSlideNo===="+currentSlideNo);
	//alert("===startTime===="+startTime);
	var temp = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	if(temp == null){
		if (currentSlideNo!=0){
			localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo ,startTime);
			var startTimeInDBFormat = currentTimeInDatabaseFormat();
			localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+currentSlideNo ,startTimeInDBFormat);
		}
}
else{
	var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
	var newTime = Date.now();
	var newSlideTime = (newTime - existingTime);
	var endTimeInDBFormat = currentTimeInDatabaseFormat();
    var EndTimeNext = localStorage.getItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
		//alert("===newSlideTime===="+newSlideTime);
	//alert("===EndTimeNext===="+EndTimeNext);
    console.log("++++++++EndTimeNext++++++++"+EndTimeNext+"++++++currentContentId+++"+currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo);
   
   if(EndTimeNext == null){
	localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
	localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);
	}

    if (typeof(localStorage.getItem('currentslide'))!='undefined' && localStorage.getItem('currentslide')!='' && localStorage.getItem('currentslide')>= currentSlideNo){
	var nextSlideNo = currentSlideNo;

    }else{
	var nextSlideNo = currentSlideNo + 1 ;
	
 } 
 
	if(nextSlideNo <= 10){//number 3 is number of total slides present
	// alert(nextSlideNo);
	var tempNext = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo);

		if(tempNext == null){
			
			if (nextSlideNo!=0)	{
				var nextSlideStartTime =  Date.now();
				localStorage.setItem(currentContentId+"_"+contentName+"_slideNo_"+nextSlideNo ,nextSlideStartTime);
				localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+nextSlideNo ,0);
				var startTimeNextInDBFormat = currentTimeInDatabaseFormat();
				localStorage.setItem(currentContentId+"_"+contentName+"_StartTime_"+nextSlideNo ,startTimeNextInDBFormat);
			}
		}
	}
}

}
//step ends..

function go_nav(direction) {
var page_id =  parseInt($("#wrapper").attr("rel"));
			
		
var flag=0;
if(direction == 'b') {


	if(page_id >= 0){
		page_id = page_id - 1;
		//alert(page_id);
		//console.log(page_id);
		if(page_id == 0){
            flag=2;
        }
	}
	 if(flag == 2){
        localStorage.setItem("gotoNextPrevBrand" ,2);//if one than next if 2 than prev
        //flag == 0;
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	
		//window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
	}
	
}else {
	
	if(page_id <= 10){
		page_id = page_id + 1;
		//alert(page_id);
		if(page_id == 11){
            flag=1;
        }
	}
	    if(flag == 1){
        localStorage.setItem("gotoNextPrevBrand" ,1);//if one than next if 2 than prev
         flag == 0;
		 var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };


	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
		 //window.location = "js-call:" + "1" + ":" + encodeURIComponent(JSON.stringify({query:'NODATA', type:'brandNavigation', callback:'checkLastPgFn'}));
    }else{
        localStorage.setItem("gotoNextPrevBrand" ,0);
		var objectData={

         "gotoNextPrevBrand": localStorage.getItem("gotoNextPrevBrand"),
          "previousslide": localStorage.getItem("previousslide"),
         "slideId": page_id
         };
  var params = {
  "query" : objectData,
  "type" : "brandNavigation",
  "callback" : "checkLastPgFn"
  };

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe //pageswipe
  
    }


}



$("#wrapper").attr("rel",page_id);

var content="";
if(flag==0){
var pg_content = set_pg_content(page_id);

	$("#main_content").html(pg_content);
}
	//console.log("pg : "+page_id);
	if(page_id==4){
		/* $(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	}); */
		
	}
	 checkClickThrough(page_id);
}

function set_pg_content(pg_id){
$(".reference").removeClass("active");
currentSlide();
var selectedContentPath='';
switch(pg_id){
	case 1:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide1/cover.png" width="1024" height="768"/></div>';
	break;
	case 2:
	content='<link rel="stylesheet" type="text/css" href="slide2/slide1.css" media="screen"/><div class="background"><img src="slide2/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide2/Opt1.png"></div><div class="option2"><img src="slide2/Opt2.png"></div><div class="option3"><img src="slide2/Opt3.png"></div>';
	break;
	case 3:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide3/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide3/Opt1.png"></div><div class="option2"><img src="slide3/Opt2.png"></div><div class="option3"><img src="slide3/Opt3.png"></div><div class="option4"><img src="slide3/Opt4.png"></div><div class="option5"><img src="slide3/Opt5.png"></div>';
	break;
	case 4:
	content='<link rel="stylesheet" type="text/css" href="slide4/slide1.css" media="screen"/><div class="background"><img src="slide4/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide4/Opt1.png"></div><div class="option2"><img src="slide4/Opt2.png"></div><div class="option3"><img src="slide4/Opt3.png"></div>';
	break;
	case 5:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide5/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide5/Opt1.png"></div><div class="option2"><img src="slide5/Opt2.png"></div><div class="option3"><img src="slide5/Opt3.png"></div><div class="option4"><img src="slide5/Opt4.png"></div><div class="option5"><img src="slide5/Opt5.png"></div>';
	break;
	case 6:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide6/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide6/Opt1.png"></div><div class="option2"><img src="slide6/Opt2.png"></div><div class="option3"><img src="slide6/Opt3.png"></div><div class="option4"><img src="slide6/Opt4.png"></div>';
	break;
	case 7:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide7/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide7/Opt1.png"></div><div class="option2"><img src="slide7/Opt2.png"></div><div class="option3"><img src="slide7/Opt3.png"></div><div class="option4"><img src="slide7/Opt4.png"></div>';
	break;
	case 8:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide8/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide8/Opt1.png"></div><div class="option2"><img src="slide8/Opt2.png"></div><div class="option3"><img src="slide8/Opt3.png"></div><div class="option4"><img src="slide8/Opt4.png"></div>';
	break;
	case 9:
	content='<link rel="stylesheet" type="text/css" href="slide1/slide1.css" media="screen"/><div class="background"><img src="slide9/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide9/Opt1.png"></div><div class="option2"><img src="slide9/Opt2.png"></div><div class="option3"><img src="slide9/Opt3.png"></div><div class="option4"><img src="slide9/Opt4.png"></div>';
	break;
	case 10:
	content='<link rel="stylesheet" type="text/css" href="slide10/slide1.css" media="screen"/><div class="background"><img src="slide10/Q1.png" width="1024" height="768"/></div><div class="option1"><img src="slide10/Opt1.png"></div><div class="option2"><img src="slide10/Opt2.png"></div><div class="option3"><img src="slide10/Opt3.png"></div>';
	break;
}

return content;

}

function showDiv() {
   document.getElementById('welcomeDiv').style.display = "block";
}
function showDiv2() {
   document.getElementById('welcomeDiv2').style.display = "block";
}

function open_page(url,page_id){
	count3=2;
    count4=0;
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		//to checked previous slide has god end time...
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);	
	}

	// toCaptureTime(page_id);
	 localStorage.setItem("currentslide",page_id);
	 currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	 localStorage.setItem("current",currentContentNSlide);
	//step 10 ends here
	 $("#wrapper").attr("rel",page_id);
	 var content="";
	 var pg_content = set_pg_content(page_id);

	 	$("#main_content").html(pg_content);

	/*  if(page_id==4){
		$(".box2").click(function(event) {
			open_page("",5)
		});
		$(".box3").click(function(event) {
			open_page("",6)
		});
		$(".box4").click(function(event) {
	 		open_page("",7)
	 	});
		$(".box5").click(function(event) {
	 		open_page("",8)
	 	});
		$(".box6").click(function(event) {
	 		open_page("",9)
	 	});
		$(".box7").click(function(event) {
	 		open_page("",10)
	 	});
		$(".box8").click(function(event) {
	 		open_page("",11)
	 	});
	 } */
	  checkClickThrough();
	}
var count3=2,count4=0;

function open_page2(url,page_id,count){
    count1=0;
    count3=page_id+count-2;
    count4=page_id+1;
	 // alert(page_id);
	if (typeof(localStorage.getItem("currentslide"))!='undefined'){
		var slideid=localStorage.getItem("currentslide");
		toCaptureTime(slideid);
	}
    count2=page_id;
    count1=page_id+count-1;

	localStorage.setItem("currentslide",page_id);
	currentContentNSlide = currentContentId+"_"+contentName+"_"+page_id;
	localStorage.setItem("current",currentContentNSlide);

	$("#wrapper").attr("rel",page_id);
	var content="";
	var pg_content = set_pg_content(page_id);
	$("#main_content").html(pg_content);
	checkClickThrough();
}

	function checkClickThrough(page_id){
	var currentslide=localStorage.getItem("currentslide");
	//alert(currentslide);
	document.getElementById("click_through").innerHTML='';

	if(page_id == 2){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Chemotherapy related anemia"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Solid tumor associated anemia"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Hematologic malignancy associated anemia"/><div class="control_indicator" id="radio03-1" onclick="option3()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,2);endTime1(2);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 3){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="1-5"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="5-15"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="15-30"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="30-50"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value=">50"/><div class="control_indicator" id="radio05" onclick="option5()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,3);endTime1(3);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 4){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="IV Iron"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Oral Iron"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Blood Transfusion"/><div class="control_indicator" id="radio03" onclick="option3()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,4);endTime1(4);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 5){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Iron sucrose"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Iron isomaltoside"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Ferric caroxymaltose"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Oral iron"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Blood transfusion"/><div class="control_indicator" id="radio05" onclick="option5()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,5);endTime1(5);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 6){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Ferinject"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Encicarb"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Feruno"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Others"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,6);endTime1(6);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 7){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Administration related"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Inferior quality of product"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="Uncontrolled release of iron"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="None of the above"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,7);endTime1(7);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 8){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="500mg weekly"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="750mg weekly"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="1000mg weekly"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="1500mg weekly"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,8);endTime1(8);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 9){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="<=2 weeks"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="2-6 weeks"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="6-12 weeks"/><div class="control_indicator" id="radio03-2" onclick="option3()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value=">12 weeks"/><div class="control_indicator" id="radio04" onclick="option4()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,9);endTime1(9);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}
	
	if(page_id == 10){
		document.getElementById("click_through").innerHTML='<div class="slide02_inline_wraper" id="buttons">\
		<div id="slide01_question01_choices01" class="control-group">\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_01" name="checkB01" value="Yes"/><div class="control_indicator" id="radio01" onclick="option1()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="No"/><div class="control_indicator" id="radio02" onclick="option2()"></div></label>\
			<label class="control control_radio"><div class="lbl_pos"></div><input type="radio" id="slide01_radio01_02" name="checkB01" value="May be"/><div class="control_indicator" id="radio03" onclick="option3()"></div></label>\
		</div>\
			<div class="submit_button" onclick="savedata(1,1,10);endTime1(10);hidesubmitonclick();"></div>\
		</div>';
		
		$('#slide01_question01_choices01').delay(10).fadeIn();

		$(document).on("click touchstart", "#slide01_question01_choices01 input[name]", function(){
			if ($("input[name='checkB01']:checked").val()){
				var test = $(this).val();	
			}			
		});

		$(document).on("click", ".submit_button", function(){
			$('.slide01_submit_popup_content').fadeIn();
		});

		$(document).on("click", ".slide01_submit_popup_close_btn_mask", function(){
			$('.slide01_submit_popup_content').fadeOut();
		});
	}

}

	function checkBtns(refNum){
		switch(refNum){
		case 1:
		open_page('',1); //NA
		break;
		
		}
	}

	function currentSlide(){
		var curr_id =  parseInt($("#wrapper").attr("rel"));
		$(".slides").removeClass("active");
		$(".slides:nth-child("+curr_id+")").addClass("active");
	}

	var ln = 0;
	function myconsole(msg){

		var oldMsg = "</br>"+ln+". "+$("#myconsole").html();
		ln++
		$("#myconsole").html(msg+oldMsg);
	}

function currentTimeInDatabaseFormat(){//to get current time in dd-mm-yyyy hh:mm:ss
	var year = new Date().getFullYear();
	var month = new Date().getMonth();
		month = parseInt(month)+1;
	if(month.toString().length==1){
		month="0"+month;
	}

	var date = new Date().getDate();
	if(date.toString().length==1){
		date="0"+date;
	}

	var hour = new Date().getHours();
	if(hour.toString().length==1){
		hour="0"+hour;
	}

	var minutes = new Date().getMinutes();
	if(minutes.toString().length==1){
		minutes="0"+minutes;
	}

	var seconds = new Date().getSeconds();
	if(seconds.toString().length==1){
		seconds="0"+seconds;
	}

	var duration= year+"-"+month+"-"+date+"-"+hour + ":" + minutes + ":" + seconds;
	return duration;
}

// new js

$(document).ready(function(){
	$('body').on('click','.touchbtn',function(){
		$('.right_arrow').trigger( "click" );
	})

	$(document).on('click','.btnshow',function(){
//alert('hi')
		$('.touchbtn').css("display","block");
	})
})


/*--------------------- animation javascript -----------------------*/


function closewindowslide(currentslide)
{
	toCaptureTime(currentslide);
}
function endTime1(currentSlideNo){
		var existingTime = localStorage.getItem(currentContentId+"_"+contentName+"_slideNo_"+currentSlideNo);
		var newTime = Date.now();
		var newSlideTime = (newTime - existingTime);
		localStorage.setItem(currentContentId+"_"+contentName+"_totalTime_slideNo_"+currentSlideNo ,(newSlideTime/1000) );
		var endTimeInDBFormat = currentTimeInDatabaseFormat();
		localStorage.setItem(currentContentId+"_"+contentName+"_EndTime_"+currentSlideNo ,endTimeInDBFormat);

}

function hidesubmitonclick()
{
	$('.submit_button').css("display","none");
}

function option1() {
	$('.option1').css("display","block");
	$('.option2').css("display","none");
	$('.option3').css("display","none");
	$('.option4').css("display","none");
	$('.option5').css("display","none");
	$(".submit_button").css("display","block");
}

function option2() {
	$('.option1').css("display","none");
	$('.option2').css("display","block");
	$('.option3').css("display","none");
	$('.option4').css("display","none");
	$('.option5').css("display","none");
	$(".submit_button").css("display","block");
}

function option3() {
	$('.option1').css("display","none");
	$('.option2').css("display","none");
	$('.option3').css("display","block");
	$('.option4').css("display","none");
	$('.option5').css("display","none");
	$(".submit_button").css("display","block");
}

function option4() {
	$('.option1').css("display","none");
	$('.option2').css("display","none");
	$('.option3').css("display","none");
	$('.option4').css("display","block");
	$('.option5').css("display","none");
	$(".submit_button").css("display","block");
}

function option5() {
	$('.option1').css("display","none");
	$('.option2').css("display","none");
	$('.option3').css("display","none");
	$('.option4').css("display","none");
	$('.option5').css("display","block");
	$(".submit_button").css("display","block");
}

function savedata(answer,type,questionNumber) {
	$('#radio01').css("display","none");
	$('#radio02').css("display","none");
	$('#radio03').css("display","none");
	$('#radio04').css("display","none");
	$('#radio05').css("display","none");
	$(".submit_button").css("display","none");
	
	
	if(questionNumber == 2){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 3){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 4){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 5){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 6){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 7){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 8){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 9){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	else if(questionNumber == 10){
		var selectedAnswer1 = document.querySelector('input[name = "checkB01"]:checked').value;
		var varanswer = selectedAnswer1;
	}
	
	var question = arrSurveyQuestions[questionNumber];
	//localStorage.setItem("surveyQuestion_"+currentContentId+"_"+contentName+"_"+questionNumber,question);
	//localStorage.setItem("surveyAnswer_"+currentContentId+"_"+contentName+"_"+questionNumber,varanswer);
	//alert(question+varanswer);
	
	
	var objectData={
		"question": question,
        "answer": varanswer,
		"questionNumber": questionNumber
    };
	var params = {
		"query" : `${JSON.stringify(objectData)}`,
		"type" : "brandNavigation",
		"callback" : "surveyData"
	};

	//window.messageHandler.postMessage(JSON.stringify(params)); //pageswipe 
}