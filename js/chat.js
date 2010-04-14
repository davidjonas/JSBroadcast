JSChat = {};
JSChat.chatRoom = 'JSBroadcastChat';
JSChat.updateChat = function()
{
	var messages = JSBroadcast.get(JSChat.chatRoom);
	if (messages !== null)
	{
		for(var msg in messages)
		{	
			$(document.getElementById('chatWindow')).append("<br />" + messages[msg].usr + " - " + messages[msg].msg);
		}
	}
};

JSBroadcast.configure({'domain': 'chat'});
JSBroadcast.registerReceiver(JSChat.chatRoom);
JSBroadcast.registerFunction("updateChat", JSChat.updateChat);

function sendMessage()
{	
	var chatMsg = document.getElementById('chatMsg');
	var msg = chatMsg.value;
	JSBroadcast.sendMessage(JSChat.chatRoom, msg);
	chatMsg.value = "";
	chatMsg.focus();
	$(document.getElementById('chatWindow')).append("<br /> you - " + msg);
}



function runChat()
{
	JSBroadcast.run(30);
}