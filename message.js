var Message = (function () {

	function Message(container, data) {
		this.container = container;

		if (data) {
			this.data = data;
			this.appendToContainer();
		}
	}

	Message.prototype.draw = function () {
		/*$message = $('<div/>', {class: 'col-xs-10'})
			.html('message');

		$username = $('<div/>', {class: 'col-xs-2'})
			.html('username');

		$row = $('<div/>', {class: 'row'});

		$row.append($username);
		$row.append($message);

		return $row;*/


		return $('<div/>', {class: 'row'}).append(
			$('<div/>', {class: 'col-xs-2'})
				.html(this.data.username),
			$('<div/>', {class: 'col-xs-10'})
				.html(this.data.message)	
		);
	};

	Message.prototype.appendToContainer = function () {
		if (this.container) {
			this.container.append(this.draw());
		}
	};


	return Message;
})();

