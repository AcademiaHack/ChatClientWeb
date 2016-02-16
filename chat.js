var Chat = (function () {

	function Chat(container, socket) {
		this.container = container;
		this.socket = socket;
		this.user = {};
	}

	Chat.prototype.draw = function () {
		return $('<div/>').append(
			$('<div/>', {id: 'messages'}),
			$('<div/>', {class: 'row'}).append(
				$('<div/>', {class: 'col-xs-4'}).append(
					$('<input/>', {type: 'text', class:'form-control', id: 'username', placeholder: 'username'})
				),
				$('<div/>', {class: 'col-xs-6'}).append(
					$('<input/>', {type: 'text', class:'form-control hidden', id: 'message', placeholder: 'message'})
				),
				$('<div/>', {class: 'col-xs-2'}).append(
					$('<button/>', {type: 'button', class:'btn btn-primary hidden', id: 'connect'}).html('Conectar'),
					$('<button/>', {type: 'button', class:'btn btn-primary hidden', id: 'send'}).html('Enviar')
				)
			)
		);
	};

	Chat.prototype.appendToContainer = function () {
		if (this.container) {
			this.container.append(this.draw());
			this.addEvents();
		}
	};

	Chat.prototype.addEvents = function () {

		var self = this;

		$(document).on('click', '#send', function () {
			var $message = $('#message');

			var $container = $('#messages');
			new Message($container, {
				username: self.user.username, 
				message: $message.val()
			});

			self.socket.emit('message', {
				userId: self.user.id, 
				message: $message.val()
			});

			$message.val('');
		});
	
		/*function meEjecutare(chat) {
			
			function esteEsElClick() {
				console.log(chat);
			}

			return esteEsElClick;
		}

		var acaQuedaraLaFirmaDelClick = meEjecutare(this);

		$(document).on('click', '#connect', acaQuedaraLaFirmaDelClick);*/

		$(document).on('click', '#connect', function () {
			var username = $('#username').val();
			
			console.log(self);	
			self.socket.emit('join', {
				username: username
			});
		});

		this.socket.on('joined', function (userJoined) {
			self.user = userJoined;

			$('#connect').addClass('hidden');
			$('#message').removeClass('hidden');
			$('#send').removeClass('hidden');
			$('#username').attr('disabled', true);
		});

		this.socket.on('connect', function(){
			$('#connect').removeClass('hidden');

		});

		this.socket.on('sms', function (message) {
			if (message.user.username !== self.user.username) {
		    	console.log(message.user.username + '> ' + message.message);  
		  		var $container = $('#messages');
					new Message($container, {
						username: message.user.username, 
						message: message.message
					});
		  	}
		});

		this.socket.on('disconnect', function(){
			$('#connect').addClass('hidden');
		});

	}

	return Chat;
})();