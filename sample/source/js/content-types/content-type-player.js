
V.contentTypes.player = {

	data: function () {

		var schemas = app.data.raw.stats;

		var data = {
			availableStats: []
		};

		for (var i = 0; i < schemas.length; i++) {
			var schema = schemas[i];
			data[schema.id] = app.get('stat', schema);
			data.availableStats.push(schema.id);
		}

		return data;

	},

	computed: {

		isDead: function () {
			return this.nourishment > 0 && this.hydration > 0;
		},

		// Any value dependant on stamina
		staminaMultiplier: function () {
			return this.stamina.value / this.stamina.max;
		},

		reverseStaminaMultiplier: function () {
			return this.stamina.max / this.stamina.value;
		},

		// Minutes
		costPerMove: function () {
			var factor = (this.stamina.value + this.vitality.value); // Something like 5-20 in the beginning
			return 240 - (factor * 4);
		},

		// Grams
		itemCapacity: function () {
			return (20 + (this.stamina.max / 4)) * 1000;
		}

	},

	methods: {}

	// created: function () {},

};
