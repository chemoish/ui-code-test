if (typeof Object.create !== 'function') {
    Object.create = function (o) {
        function F() {}
        F.prototype = o;
        return new F();
    };
}

(function ($) {
	var FormModal = Object.create({
		clearValidation: function ($modal) {
			$modal.find('fieldset > .required').removeClass('required');
		},

		onClose: function (event) {
			var $element = $(event.currentTarget),
				$modal = $element.closest('.modal');

			$modal.hide();
		},

		onSubmit: function (event) {
			this.validate(event);

			event.preventDefault();
		}
	});

	var SignInModal = Object.create(FormModal);

	SignInModal.init = function () {
		this.$modal = $('#sign_in_modal');
		this.$modal.on('click', '.close', $.proxy(this.onClose, this));
		this.$modal.find('form').on('submit', $.proxy(this.onSubmit, this));
	};

	SignInModal.open = function () {
		this.clearValidation(this.$modal);

		this.$modal.show();
	};

	SignInModal.validate = function (event) {
		var $form = $(event.currentTarget),
			$input_email = $form.find('#email'),
			$input_password = $form.find('#password');

		if ($.trim($input_email.val()) == '') {
			$input_email.closest('div').addClass('required');
		} else {
			$input_email.closest('div').removeClass('required');
		}

		if ($.trim($input_password.val()) == '') {
			$input_password.closest('div').addClass('required');
		} else {
			$input_password.closest('div').removeClass('required');
		}
	};

	var SignUpModal = Object.create(FormModal);

	SignUpModal.init = function () {
		this.$modal = $('#sign_up_modal');
		this.$modal.on('click', '.close', this.onClose);
		this.$modal.find('form').on('submit', $.proxy(this.onSubmit, this));
	};

	SignUpModal.open = function () {
		this.clearValidation(this.$modal);

		this.$modal.show();
	};

	SignUpModal.validate = function (event) {
		var $form = $(event.currentTarget),
			$input_name = $form.find('#name'),
			$input_email = $form.find('#email'),
			$input_password = $form.find('#password');

		if ($.trim($input_name.val()) == '') {
			$input_name.closest('div').addClass('required');
		} else {
			$input_name.closest('div').removeClass('required');
		}

		if ($.trim($input_email.val()) == '') {
			$input_email.closest('div').addClass('required');
		} else {
			$input_email.closest('div').removeClass('required');
		}

		if ($.trim($input_password.val()) == '') {
			$input_password.closest('div').addClass('required');
		} else {
			$input_password.closest('div').removeClass('required');
		}

		event.preventDefault();
	};

	$('.sign-in').on('click', function () {
		var $modals = $('.modal');

		$modals.hide();

		SignInModal.open();
	});

	$('.sign-up').on('click', function () {
		var $modals = $('.modal');

		$modals.hide();
		
		SignUpModal.open();
	});

	SignInModal.init();
	SignUpModal.init();
}(jQuery));