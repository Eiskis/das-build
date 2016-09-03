
V.contentTypes.weather = {

	data: function () {
		return {
			dateString: ''
		};
	},

	computed: {

		isReal: function () {
			return this.dateString ? true : false;
		},

		data: function () {
			return app.weatherData.get(this.dateString);
		},

		// FLAG: shouldn't have to do this here, CSV shit is none of our business
		events: function () {
			if (this.data && !_.isEmpty(this.data.events)) {
				return app.util.explodeCsvString(this.data.events);
			}
			return [];
		},

		summary: function () {
			return this.getWeatherSummary(this.events);
		}

	},

	methods: {

		getWeatherSummary: function (dayEvents) {
			if (_.includes(dayEvents, 'snow')) {
				return 'snow';
			} else if (_.includes(dayEvents, 'thunder')) {
				return 'thunder';
			} else if (_.includes(dayEvents, 'rain')) {
				return 'rain';
			} else if (_.includes(dayEvents, 'fog')) {
				return 'fog';

			// Cloudy days every 4 days
			} else if (!_.random(0, 3)) {
				return 'cloudy';
			}

			// Default to sunny
			return 'sunny';
		}

	}

	// created: function () {},


};
