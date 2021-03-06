JSBroadcast = {};

JSBroadcast.timer = null;
JSBroadcast.registeredReceivers = [];
JSBroadcast.values = [];
JSBroadcast.registeredFunctions = [];
JSBroadcast.domain = null;
JSBroadcast.server = "";
JSBroadcast.lastMessageExchanged = 0;
JSBroadcast.activeRequests = 0;
JSBroadcast.maxRequests = 2;

JSBroadcast.configure = function(attr)
{
	if(typeof( attr.server ) != "undefined")
	{
		JSBroadcast.server = attr.server;
	}
	else
	{
		JSBroadcast.server = "";
	}
	if(typeof( attr.domain ) != "undefined")
	{
		JSBroadcast.domain = attr.domain;
	}
	else
	{
		throw "DomainNotDefined";
	}
};

JSBroadcast.registerReceiver = function(key)
{	
	JSBroadcast.registeredReceivers[JSBroadcast.registeredReceivers.length] = key;
	JSBroadcast.values[key] = null;
};

JSBroadcast.registerFunction = function(key, func)
{
	JSBroadcast.registeredFunctions[key] = func;
};

JSBroadcast.unregisterReceiver = function(key)
{
	delete JSBroadcast.registeredReceivers[key];
};

JSBroadcast.unregisterFunction = function(key)
{
	delete JSBroadcast.registeredFunctions[key];
};

JSBroadcast.call = function (key)
{
	var sendData = {'domain': JSBroadcast.domain, 'key': key};
	if(JSBroadcast.activeRequests < JSBroadcast.maxRequests)
	{
		JSBroadcast.activeRequests++;
		$.ajax({
		   url: JSBroadcast.server + "JSBroadcastServer.py/get", 
		   dataType: 'json',
		   data: sendData,
		   async: true,
		   cache: false,
		   success:function(data){
							JSBroadcast.values[key] = data;
							JSBroadcast.activeRequests--;
		   }});
	}
};

JSBroadcast.sendMessage = function(key, msg)
{
	var sendData = {'domain': JSBroadcast.domain, 'key': key, 'msg': msg};
	$.getJSON(JSBroadcast.server + "JSBroadcastServer.py/send", sendData, function(data){JSBroadcast.lastMessageExchanged = data;});
};

JSBroadcast.get = function(key)
{
	if (typeof( JSBroadcast.values[key] ) != "undefined")
	{
		return JSBroadcast.values[key];
	}
	else
	{
		return null;
	}
};

JSBroadcast.run = function(interval)
{
	if(JSBroadcast.timer === null)
	{
		JSBroadcast.timer = setInterval(JSBroadcast.step, interval);
	}
	else
	{
		clearInterval(JSBroadcast.timer);
		JSBroadcast.timer = setInterval(JSBroadcast.step, interval);
	}
};

JSBroadcast.pause = function ()
{
	if(JSBroadcast.timer !== null)
	{
		clearInterval(JSBroadcast.timer);
		JSBroadcast.timer = null;
	}
};

JSBroadcast.step = function ()
{
	for(var i in JSBroadcast.registeredReceivers)
	{
		if (JSBroadcast.registeredReceivers.hasOwnProperty(i)) 
		{
			JSBroadcast.call(JSBroadcast.registeredReceivers[i]);
		}
	}
	
	for (var j in JSBroadcast.registeredFunctions)
	{
		if (JSBroadcast.registeredFunctions.hasOwnProperty(j)) 
		{
			JSBroadcast.registeredFunctions[j]();
		}
	}
};

JSBroadcast.store = function (key, value)
{
	var sendData = {'key': key, 'value': value};
	$.getJSON(JSBroadcast.server + "JSBroadcastServer.py/store", sendData);
};

JSBroadcast.retrieve = function (key)
{
	var value = ''; 
	var sendData = {'domain': JSBroadcast.domain, 'key': key, 'timestamp': JSBroadcast.lastMessageSent};
	$.getJSON(JSBroadcast.server + "JSBroadcastServer.py/retrieve", sendData, function(data){value = data;});

	return value;
};
