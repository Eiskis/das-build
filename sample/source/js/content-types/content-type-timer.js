
V.contentTypes.timer = {

	data: function () {
		return {
			time: 0,
			sunriseString: '',
			sundownString: '',
			tomorrowSunriseString: ''
		};
	},

	computed: {

		isReal: function () {
			return this.dateObject ? true : false;
		},

		dateObject: function () {
			return new Date(this.time);
		},



		// Times

		seconds: function () {
			if (this.isReal) {
				return this.dateObject.getSeconds();
			}
			return null;
		},

		minutes: function () {
			if (this.isReal) {
				return this.dateObject.getMinutes();
			}
			return null;
		},

		hours: function () {
			if (this.isReal) {
				return this.dateObject.getHours();
			}
			return null;
		},

		day: function () {
			if (this.isReal) {
				return this.dateObject.getDate();
			}
			return null;
		},

		weekDay: function () {
			if (this.isReal) {
				return this.dateObject.getDay();
			}
			return null;
		},

		month: function () {
			if (this.isReal) {
				return 1 + this.dateObject.getMonth();
			}
			return null;
		},

		year: function () {
			if (this.isReal) {
				return this.dateObject.getFullYear();
			}
			return null;
		},

		// Time until next sunrise or sundown
		timeLeft: function () {
			if (this.isReal) {
				var time = 0;

				// Morning
				if (this.isBeforeSunrise) {
					time = app.util.timeDiffReverse(this.sunriseString, this.timeString);

				// Day time
				} else if (!this.isAfterSundown) {
					time = app.util.timeDiffReverse(this.sundownString, this.timeString);

				// Night, calculate until tomorrow morning
				// FLAG: WRONG!!
				} else {
					var time1 = app.util.timeDiffReverse('24:00', this.timeString);
					var time2 = app.util.timeDiffReverse(this.tomorrowSunriseString, '00:00');
					time = Math.abs(time1) + Math.abs(time2);
				}

				// Minutes
				return Math.abs(time);
			}
			return 0;
		},

		// FLAG inaccurate method, doesn't split days at midnight
		dayOffset: function () {
			if (this.isReal) {
				var oneDay = 24*60*60*1000;
				var dayZero = new Date(0);
				return 1 + Math.floor(Math.abs((dayZero.getTime() - this.time) / (oneDay)));
			}
			return null;
		},



		// Sundown/rise

		isAfterSunrise: function () {
			return app.util.timeIsAfter(this.timeString, this.sunriseString);
		},

		isBeforeSunrise: function () {
			return !this.isAfterSunrise;
		},

		isAfterSundown: function () {
			return app.util.timeIsAfter(this.timeString, this.sundownString);
		},

		isNight: function () {
			return this.isAfterSundown || this.isBeforeSunrise;
		},



		// Strings

		dateString: function () {
			if (this.isReal) {
				return app.util.composeDateString(this.year, + this.month, + this.day);
			}
			return '';
		},

		timeString: function () {
			if (this.isReal) {
				return app.util.composeTimeString(this.hours, + this.minutes);
			}
			return '';
		},

		timeLeftString: function () {
			if (this.isReal && this.timeLeft > 0) {
				return app.util.formatDuration(this.timeLeft);
			}
			return '';
		}

	},

	methods: {

		// API

		advance: function (minutes) {
			this.time = this.time + (minutes * 60 * 1000);
			return this;
		}

	}

	// created: function () {}

};
