var initial = {
		"catalog":"date-desc-rank",
		"products":"on"
}

console.log(initial);

var storageState=false;


function loading(state){
	if(!storageState){
		console.log("second time")
		storageState=true;
		chrome.storage.sync.set(initial);
	}
	switch(state){
		case "catalog":
			chrome.storage.sync.get(initial,function(){});
			return initial.catalog;
			break;
		case "product":
			chrome.storage.sync.get(initial,function(){});	
			return initial.products;
			break;
		case "be":
			chrome.storage.sync.get(initial,function(){});
			console.log(initial);
			return initial;
			break;
	}
}

chrome.runtime.onMessage.addListener(function(request,sender,sendResponse){
	console.log(request)
	var reply;
		switch(request.state){
			case "catalog":
				sendResponse(loading("catalog"));
				break;
			case "product":
				sendResponse(loading("product"));
				break;
			case "loading":
				sendResponse(loading("be"));
				break;
			case "catalogChange":
				initial.catalog=request.detail;
				chrome.storage.sync.set(initial,function(){});
				console.log("come")
				sendResponse("success");
				break;
			case "productChange":
				chrome.storage.sync.set("product",request.detail);
				sendResponse("success");
				break;
		}
});


chrome.storage.onChanged.addListener(function(changes, namespace) {
        for (key in changes) {
          var storageChange = changes[key];
          console.log('Storage key "%s" in namespace "%s" changed. ' +
                      'Old value was "%s", new value is "%s".',
                      key,
                      namespace,
                      storageChange.oldValue,
                      storageChange.newValue);
        }
});