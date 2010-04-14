<html>
	<head>
		<title>Hello World</title>
        <script language="javascript" src="js/jquery-1.4.2.min.js"> </script>
	    <script language="javascript" src="js/JSBroadcast.js"> </script>
	    <script language="javascript" src="js/chat.js"> </script>
	</head>
	<body>
    	<div id="chatWindow">
        	loading chat window......
        </div>
        <form name="chat" onSubmit="sendMessage(); return false;">
        	<input type="text" id="chatMsg" size="100" />
            <input type="button" value="Send" onClick="sendMessage()" >
        </form>
    	<script language="javascript">
        	runChat();
        </script>
        
	</body>
</html>
