//////////////////////////////////////////////////// RELATED TO KEEN.IO ////////////////////////////////////////

!function(name,path,ctx){
  var latest,prev=name!=='Keen'&&window.Keen?window.Keen:false;ctx[name]=ctx[name]||{ready:function(fn){var h=document.getElementsByTagName('head')[0],s=document.createElement('script'),w=window,loaded;s.onload=s.onerror=s.onreadystatechange=function(){if((s.readyState&&!(/^c|loade/.test(s.readyState)))||loaded){return}s.onload=s.onreadystatechange=null;loaded=1;latest=w.Keen;if(prev){w.Keen=prev}else{try{delete w.Keen}catch(e){w.Keen=void 0}}ctx[name]=latest;ctx[name].ready(fn)};s.async=1;s.src=path;h.parentNode.insertBefore(s,h)}}
}('Keen','https://d26b395fwzu5fz.cloudfront.net/keen-tracking-1.1.4.min.js',this);


// THE BIG DATA MODEL!

//
//  var key = document.getElementsByTagName("wt_id")[0].innerHTML;
 Keen.ready(function(){
	 Keen.debug = true;


 var client = new Keen({
	projectId: '5930539e95cfc93b3abe8d10', // String (required always)
	writeKey: '259AEA9C1617C5C27AF2E4EF02D21B8275F393B1153755CEA0E6ADC68FBE958F4E60BF8D584947619CFBD5CB9AEF213E881DDA37D51834F6071E9ABC1F1257F8EC3802C2CBE09CBA65FA64BBDE015338F859A5E35C0EB97E07B385660FFBE6F7'
 });

 var sessionCookie = Keen.utils.cookie('wt-cookie');
 if (!sessionCookie.get('user_id')) {
 	sessionCookie.set('user_id', Keen.helpers.getUniqueId());
 }

 var sessionTimer = Keen.utils.timer();
 sessionTimer.start();
var time = sessionTimer.value();
console.log(time);


client.extendEvents(function(){
	return {
		page: {
			title: document.title,
			url: document.location.href
			// info: {} (add-on)
		},
		referrer: {
			url: document.referrer
			// info: {} (add-on)
		},
		tech: {
			browser: Keen.helpers.getBrowserProfile(),
			// info: {} (add-on)
			ip: '${keen.ip}',
			ua: '${keen.user_agent}'
		},
		time: Keen.helpers.getDatetimeIndex(),
		visitor: {
			id: sessionCookie.get('user_id'),
			time_on_page: sessionTimer.value()
		},
		// geo: {} (add-on)
		keen: {
			timestamp: new Date().toISOString(),
			addons: [
				{
					name: 'keen:ip_to_geo',
					input: {
						ip: 'tech.ip'
					},
					output: 'geo'
				},
				{
					name: 'keen:ua_parser',
					input: {
						ua_string: 'tech.ua'
					},
					output: 'tech.info'
				},
				{
					name: 'keen:url_parser',
					input: {
						url: 'page.url'
					},
					output: 'page.info'
				},
				{
					name: 'keen:referrer_parser',
					input: {
						page_url: 'page.url',
						referrer_url: 'referrer.url'
					},
					output: 'referrer.info'
				}
			]
		}
	};
});

client.recordEvent('pageview');

//
// var uniqueId = Keen.helpers.getUniqueId();
// alert(uniqueId);
//
//
// var sessionCookie = Keen.utils.cookie('user');
// sessionCookie.set('user_id', uniqueId);
//
//
//
// 	// ===== Method to set cookie in the browser if does not exists ===== //
// 	function setCookie(cname, cvalue, exdays) {
// 		var d = new Date();
// 		d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
// 		var expires = "expires="+d.toUTCString();
// 		document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
// 	}
//
// 	// ===== Method to get cookie from browser ===== //
// 	function getCookie(cname) {
// 		var name = cname + "=";
// 		var ca = document.cookie.split(';');
// 		for(var i = 0; i < ca.length; i++) {
// 			var c = ca[i];
// 			while (c.charAt(0) == ' ') {
// 				c = c.substring(1);
// 			}
// 			if (c.indexOf(name) == 0) {
// 				return c.substring(name.length, c.length);
// 			}
// 		}
// 		return "";
// 	}
//
// 	// ===== Method to check for cookie in browser ===== //
// 	function checkCookie(cname) {
// 		var wt = getCookie(cname);
// 		if (wt != "") {
// 			console.log("Cookie Exists time to go back");
// 		} else {
// 			console.log("Cookie does not exists");
// 			if (wt != "" || wt != null) {
// 				setCookie(cname, createHash(), 365);
// 			}
// 		}
// 		return "";
// 	}
// 	function createHash(){
//
// 		return calculateHash()+""+calculateHash()+""+calculateHash()+""+calculateHash();
// 	}
// 	function calculateHash(){
//
// 		var time = new Date().toISOString();
// 		var url = window.location.href;
// 		var random = Math.random();
// 		var hash = 0;
// 		var str = url+""+time+""+random;
// 		for(var i=0;i<str.length;i++){
//
// 			var ch = str.charAt(i);
// 			hash = ((hash<<5)-hash)+ch;
// 			hash = hash & hash;
// 		}
// 		return hash;
// 	}
//
//
//
// function findMobile(){
//
// 	if( navigator.userAgent.match(/Android/i))
// 		return "Android";
// 	else if(navigator.userAgent.match(/webOS/i))
// 		return "webOS";
// 	else if(navigator.userAgent.match(/iPhone/i))
// 		return "iPhone";
// 	else if(navigator.userAgent.match(/iPad/i))
// 		return "iPad";
// 	else if(navigator.userAgent.match(/iPod/i))
// 		return "iPod";
// 	else if(navigator.userAgent.match(/BlackBerry/i))
// 		return "BlackBerry";
// 	else if(navigator.userAgent.match(/Windows Phone/i))
// 		return "Windows Phone";
// 	else
// 		return "No Mobile device identified";
// }
// function browserType(){
//
// 	if(window.opr)
// 		return "Opera";
// 	else if(typeof InstallTrigger !== 'undefined')
// 		return "Firefox";
// 	else if(navigator.vendor !== '')
// 		return navigator.vendor;
// 	else if(!!window.StyleMedia)
// 		return "IE";
// 	else
// 		return "Other";
// }
//
//
// jQuery(document).scroll(function(){
//
// 	var scrl = 0;
// 	if(browserType() === "Firefox")
// 		scrl = document.documentElement.scrollTop;
// 	else
// 		scrl = document.body.scrollTop;
// 	if(localStorage.getItem("scroll")<scrl)
// 		localStorage.setItem("scroll",scrl);
// });
//
// var scrl = 0;
// if(browserType() == "Firefox")
// 	scrl = document.documentElement.scrollTop;
// else
// 	scrl = document.body.scrollTop;
// localStorage.setItem("scroll",scrl);
// jQuery('a').click(function()
// {
// 	localStorage.setItem("nextUrl", this.href);
// });
//
//
// var startDateObject = new Date();
// var startTime = startDateObject.getTime();
//
// window.onbeforeunload = function (event) {
//   var endDateObject = new Date();
//   var endTime = endDateObject.getTime();
//   var timeSpent =  endTime - startTime;
//
//   var timeSpentOnPage = {
//     timeSpent: timeSpent,
// 		page: window.location.href,
//     page_title: document.title,
// 		scrolled: (parseInt(localStorage.getItem("scroll"))/(jQuery(document).height() - jQuery(window).height()))*100,
// 		nextUrl: localStorage.getItem("nextUrl"),
// 		cookie: getCookie("WT")
//   }
//   // This sends the above data to Keen and records it as an event.
//   client.addEvent("time_spent", timeSpentOnPage);
// }
//
// //
// // var userData = {
// // 		page: window.location.href,
// //  	  platform: navigator.platform,
// //  	  vendor: browserType(),
// // 		title: document.title,
// // 		nextUrl: localStorage.getItem("nextUrl"),
// //  	  language: navigator.language,
// //  	  languages: navigator.languages,
// //  	  referrer: document.referrer,
// //  	  web_id: document.getElementsByTagName("wt_id")[0].innerHTML,
// //  	  mobile: findMobile(),
// //  	  scrolled: (parseInt(localStorage.getItem("scroll"))/(jQuery(document).height() - jQuery(window).height()))*100,
// //  	  cookie: getCookie("WT"),
// //
// //
// // 	"ip_address": ipadd,
// // 	  "keen": {
// // 		"addons": [{
// // 		  "name": "keen:ip_to_geo",
// // 		  "input": {
// // 			"ip": "ip_address"
// // 		  },
// // 		  "output": "ip_geo_info"
// // 		},
// // 		{
// //
// // 			"name": "keen:date_time_parser",
// // 			"input": {
// // 			  "date_time": "keen.timestamp"
// // 			},
// // 			"output": "timestamp_info"
// // 		}]
// // 	  }
// // };
// //
// // client.recordEvent("testing_im",userData, function(err, res){
// //   if (err) {
// // 		console.log(err);
// // 	}
// //   else {
// // 		console.log('recorded');
// // 	}
// // });
//
//
//
});
