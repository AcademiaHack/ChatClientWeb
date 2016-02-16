$(function () {

	var socket = io('http://192.168.0.106:3000');

	var $container = $('.container');
	var chat = new Chat($container, socket);
	chat.appendToContainer();




	
});
