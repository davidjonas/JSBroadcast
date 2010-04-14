JSBroadcast.configure({'domain': 'test'});
JSBroadcast.sendMessage('test', 'Hello World!');
document.write(JSBroadcast.lastMessageSent);
