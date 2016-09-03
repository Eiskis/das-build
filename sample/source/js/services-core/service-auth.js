
V.services.auth = {

	data: function () {
		return {
			hello: app.plugins.hello,
			serviceConfig: app.options.auth.services,
			eventNames: {
				login: 'auth.login'
			}
		};
	},

	computed: {

		services: function () {
			if (this.hello) {
				return this.consumeHelloService(this.hello.services);
			}
			return {};
		}

	},

	methods: {

		// Helpers

		// Hello service object will be passed through here
		consumeHelloService: function (service) {
			return service;
		},



		// Life cycle

		onInit: function () {

			if (this.serviceConfig.google && this.serviceConfig.google.clientId) {

				// Set up auth provider credentials
				hello.init({
					google: this.serviceConfig.google.clientId
				}, { redirect_uri: '/' });

				// Listen for login events
				if (this.hello) {
					this.hello.on(this.eventNames.login, function (auth) {

						// Call user information, for the given network
						hello(auth.network).api('me').then(function (response) {
							console.log('Logged in!', auth, response);
						});

					});
				}

			}

		}

	}

};
