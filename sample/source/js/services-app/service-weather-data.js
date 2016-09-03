
V.services.weatherData = {

	data: function () {
		return {
			cache: {},
			lastIndex: {}
		};
	},

	computed: {},

	methods: {

		// Helpers

		normalizeDateString: function (dateString) {

			// Allow passing in a date object
			if (_.isDate(dateString)) {
				dateString = app.util.composeDateString(
					dateString.getFullYear(),
					(1 + dateString.getMonth()),
					dateString.getDate()
				);
			}

			return dateString;
		},

		// FLAG: fully aware of how hacky this is...
		get: function (dateString) {
			dateString = this.normalizeDateString(dateString);

			// Make getting a day again "really" fast
			if (this.cache[dateString]) {
				return this.cache[dateString];
			}

			// Make getting next day "really" fast
			if (this.lastIndex) {
				for (var j = this.lastIndex; j < app.data.raw.weather.length; j++) {
					if (app.data.raw.weather[j].date == dateString) {

						// Hacks
						this.lastIndex = j;
						this.cache[dateString] = app.data.raw.weather[j];

						return app.data.raw.weather[j];
					}
				}
			}

			// Look for date in all data
			for (var i = 0; i < app.data.raw.weather.length; i++) {
				if (app.data.raw.weather[i].date == dateString) {

					// Hacks
					this.lastIndex = i;
					this.cache[dateString] = app.data.raw.weather[i];

					return app.data.raw.weather[i];
				}
			}

			return null;
		}

	}

};
