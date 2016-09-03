
V.services.game = {

	data: function () {
		return {
			time: 0,
			player: null,
			inventory: null
		};
	},

	// data: {},

	computed: {

		isLoaded: function () {
			if (
				!app.data.isLoading &&
				app.map.currentNode,
				this.hasState &&
				this.timer &&
				this.weather &&
				this.weather.data
			) {
				return true;
			}
			return false;
		},

		hasState: function () {
			if (
				this.time > 0 &&
				this.player &&
				this.inventory
			) {
				return true;
			}
			return false;
		},

		dateObject: function () {
			if (this.hasState) {
				return new Date(this.time);
			}
			return null;
		},

		dateObjectTomorrow: function () {
			if (this.hasState) {
				var d = new Date(this.time);
				d.setDate(this.dateObject.getDate() + 1);
				return d;
			}
			return null;
		},

		weather: function () {
			if (this.hasState) {
				return app.get('weather', {
					dateString: app.util.composeDateString(this.dateObject)
				});
			}
			return null;
		},

		weatherTomorrow: function () {
			if (this.hasState) {
				return app.get('weather', {
					dateString: app.util.composeDateString(this.dateObjectTomorrow)
				});
			}
			return null;
		},

		timer: function () {
			if (this.hasState) {

				return app.get('timer', {
					time: this.time,
					sunriseString: this.weather.data.sunrise,
					sundownString: this.weather.data.sundown,
					tomorrowSunriseString: this.weatherTomorrow.data.sunrise
				});

			}
			return null;
		}

	},

	methods: {



		// State handling

		getAvailableStats: function () {
			return _.map(app.data.raw.stats, function (stat) {
				return stat.id;
			});
		},

		// 1st load
		getInitialState: function () {

			// Basic format
			var state = {
				time: 1,
				playerStats: {}
			};

			var availableStats = this.getAvailableStats();

			// FLAG: debug, generate random time
			// state.time = _.random(0, (365*24*60*60*1000));

			// FLAG: debug, generate random stats
			for (var i = 0; i < availableStats.length; i++) {
				var id = availableStats[i];
				var statData = app.data.getByProperty('stats', 'id', id);

				// Generate state based on CSV config
				state.playerStats[id] = {
					value: (_.random(statData.min + 1, statData.max)),
					max: statData.max,
					min: statData.min
				};

			}

			l('initial state', state);

			return state;
		},

		collectState: function () {

			// Basic format
			var state = {
				time: this.time,
				playerStats: {}
			};

			// Each player core stat
			for (var i = 0; i < this.player.availableStats.length; i++) {
				var stat = this.player[this.player.availableStats[i]];
				state.playerStats[stat.id] = {
					value: stat.value,
					min: stat.min,
					max: stat.max
				};
			}

			return state;
		},

		loadState: function (state) {

			// Time
			this.time = state.time;

			// Player stats
			for (var key in state.playerStats) {
				var s = state.playerStats[key];
				this.player[key].min = s.min;
				this.player[key].max = s.max;
				this.player[key].setTo(s.value);
			}

			return state;
		},

		storeState: function () {
			return app.storage.set('game', this.collectState());
		},

		fetchState: function () {
			return app.storage.get('game');
		},



		// Life cycle

		afterLoad: function () {

			// Player stats
			this.player = app.get('player');

			// Generate inventory
			this.inventory = app.get('inventory');

			// Load initial state (should look for a save as well)
			var state;
			if (true) {
				state = this.getInitialState();
			}
			this.loadState(state);

		}

	}

};
