var response={};
console.log("execute!")
var times = {}
	times.state = true;
/* catalog page sorting*/
var regCatalog=/https?:\/\/[w]+\.amazon\.co\.jp\/[b|s|gp|dp]\/*/
if(document.URL.match(regCatalog)){
	var page = new Array();
		page.push("<div id=\"pagn\" class=\"pagnHy\"><span class=\"pagnLA\"> <a title=\"前のページ\" id=\"pagnPrevLink\" class=\"pagnPrev\" href=\"");
		page.push("\"target=\"_self\"><span class=\"srSprite pagnPrevArrow\"></span><span id=\"pagnPrevString\">前</span></a>");
		page.push("<span class=\"pagnRA\"> <a title=\"次のページ\" id=\"pagnNextLink\" class=\"pagnNext\" href=\"");
		page.push("\" target=\"_self\"><span id=\"pagnNextString\">次</span><span class=\"srSprite pagnNextArrow\"></span></a></span><br clear=\"all\"></div>");
	if(document.URL.match(/pg_[0-9]+/)==null){
		var url = new Array();
			url.push(document.URL);
		var x = document.getElementById("pagnNextString").parentNode;
			x = x.getAttribute("href");
			x = "http://www.amazon.co.jp" + x + "target=\"_blank\"";
			url.push(x)
			console.log(url)
		var pager = page[0] + url[0] + page[1] + page[2] + url[1] + page[3];
		var div = document.createElement("div");
			div.innerHTML = pager;
		var elements = div.childNodes;
		var infoBar = document.getElementById("nav-subnav");
		infoBar.insertBefore(elements[0],infoBar.childNodes[infoBar.length-1]);
		response.state="catalog";
	}else{
		var reg = /([0-9]+)/;
		var url = new Array();
		var num = document.URL.match(reg);
			console.log(num[0])
			url.push(document.URL.replace(reg,parseInt(num[1])-1));
			url.push(document.URL.replace(reg,parseInt(num[1])+1));
		var pager = page[0] + url[0] + page[1] + page[2] + url[1] + page[3];
		var div = document.createElement("div");
			div.innerHTML = pager;
		var elements = div.childNodes;
		var infoBar = document.getElementById("nav-subnav");
		infoBar.insertBefore(elements[0],infoBar.childNodes[infoBar.length-1]);
		response.state="catalog";
	}
	chrome.runtime.sendMessage(response,function(reply){
		console.log(reply)
		var sort = document.getElementById("sort");
		var option = sort.getElementsByTagName("option");
		console.log(sort.value!==reply)
		if(sort.value!==reply){
			switch(reply){
				case "featured-rank":
					sort.value = "featured-rank";
					sort.form.submit();
					break;
				case "date-desc-rank":
					sort.value = "date-desc-rank";
					sort.form.submit();
					break;
				case "review-rank":
					sort.value = "review-rank";
					sort.form.submit();
					break;
			}
		}
	})
	document.getElementById("pagnNextString").addEventListener("click",function(){
		var previous = document.getElementsByClassName("pagnLA");
		var next = document.getElementsByClassName("pagnRA");
		console.log("clicked")
			for(var i=0; i<previous.length; i++){
				previous[i] = document.URL;
				if(document.URL.match(/[0-9]+/)==null){
					next[i] = document.getElementsByClassName("pagnLink");
					next[i] = next[i].getAttribute("href");
					console.log(next[i])
				}else{
					/*for nextString*/
					var reg = /([0-9]+)/;
					var aTag = next[i].getElementsByTagName("a");
					var url = aTag[0].getAttribute("href");
					var num = url.match(reg);
					var number = url.match(/page=([0-9]+)/);
						number[0] = "page=" + (parseInt(number[1])+1);
						aTag[0].setAttribute("href",url.replace(/page=[0-9]/,number[0]));
						url = aTag[0].getAttribute("href");
						aTag[0].setAttribute("href",url.replace(reg,parseInt(num[1])+1))
					/*for previous string*/
					   aTag1 = previous[i].getElementsByTagName("a");
					   url = aTag[0].getAttribute("href");
					   console.log(url)
					   num = url.match(reg);
					   number = url.match(/page=([0-9]+)/);
					   number[0] = "page=" + (parseInt(number[1])-2);
					   console.log(number[0])
					   aTag1[0].setAttribute("href",url.replace(/page=[0-9]+/,number[0]));
						url = url.replace(/page=[0-9]+/,number[0])
						aTag1[0].setAttribute("href",url.replace(reg,parseInt(num[1])-2))
						console.log(aTag1[0])
				}
				/* can rewrite with a function*/
			}
	})
	document.getElementById("pagnPrevString").addEventListener("click",function(){
		var previous = document.getElementsByClassName("pagnLA");
		var next = document.getElementsByClassName("pagnRA");
		console.log("clicked")
			for(var i=0; i<previous.length; i++){
				previous[i] = document.URL;
				if(document.URL.match(/[0-9]+/)==null){
					next[i] = document.getElementsByClassName("pagnLink");
					next[i] = next[i].getAttribute("href");
					console.log(next[i])
				}else{
					/*for nextString*/
					var reg = /([0-9]+)/;
					var aTag = previous[i].getElementsByTagName("a");
					var url = aTag[0].getAttribute("href");
					var num = url.match(reg);
					var number = url.match(/page=([0-9]+)/);
						number[0] = "page=" + (parseInt(number[1]-1));
						aTag[0].setAttribute("href",url.replace(/page=[0-9]/,number[0]));
						url = aTag[0].getAttribute("href");
						aTag[0].setAttribute("href",url.replace(reg,parseInt(num[1])-1))
					/*for previous string*/
					   aTag1 = next[i].getElementsByTagName("a");
					   url = aTag[0].getAttribute("href");
					   console.log(url)
					   num = url.match(reg);
					   number = url.match(/page=([0-9]+)/);
					   number[0] = "page=" + (parseInt(number[1])+2);
					   console.log(number[0])
					   aTag1[0].setAttribute("href",url.replace(/page=[0-9]+/,number[0]));
						url = url.replace(/page=[0-9]+/,number[0])
						aTag1[0].setAttribute("href",url.replace(reg,parseInt(num[1])+2))
						console.log(aTag1[0])
				}
				/* can rewrite with a function*/
			}
	})
}

/* for replacing details in products page*/
if(document.getElementById("productTitle")!==null){
	response.state = "product"
	chrome.runtime.sendMessage(response,function(reply){
		switch(reply){
			case "on":
			var details = document.getElementById("productDetailsTable")||document.getElementById("detail_bullets_id")||document.getElementById("prodDetails").getElementsByClassName("section techD")[1];;
			var parent = document.getElementById("rightCol");
				parent.insertBefore(details,parent.childNodes[0]);
			break;
			case "off":
			break;
		}
	})
}


http://z-ecx.images-amazon.com/images/G/01/AUIClients/RetailSearchAssets-02a3cebfef3a3c613f1072714cbe863

var x = document.getElementById("pagn");
 	x.setAttribute("onclick",function(){
 		alert("amazon")
 	})