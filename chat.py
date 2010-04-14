import cgi
import os
import memcache

def index(req):
	req.content_type = "text/plain"
	mem = memcache.Client(["127.0.0.1:11211"])
	
	getParse = req.args.split("=")
	message = getParse[1]
	rest = mem.get("chat")
	
	if rest is not None:
		fullMessage = rest + "</BR>" + message.replace("%20", " ")
	else:
		fullMessage = message.replace("%20", " ")
		
	mem.delete("chat")
	mem.set("chat", fullMessage)

	return "success"

def get(req):
	req.content_type = "text/html"
	mem = memcache.Client(["127.0.0.1:11211"])
	return mem.get("chat")