var response={};
var product;
var catalog;

function loading(){
	response.state = "loading";
	chrome.runtime.sendMessage(response,function(response){
		console.log("received message");
		console.log(response)
			product.value = response.products;
			catalog.value = response.catalog;
	})
	onchange();
}

/*get user selections for product, catalog*/

function onchange(){
	product.addEventListener("change",function(){
		console.log("changed")
			response.state="productChange";
			response.detail=this.value;
		chrome.runtime.sendMessage(response,function(){
			alert("changing is saved");
		});
	});
	catalog.addEventListener("change",function(){
			response.state="catalogChange";
			response.detail=this.value;
		chrome.runtime.sendMessage(response,function(){
			alert("changing is saved");
		});
	});
}

window.onload=function(){
	product = document.getElementById("forProduct");
	catalog = document.getElementById("forCatalog");
	loading();
}

