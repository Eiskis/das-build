
V.contentTypes.stat = {

	data: function () {
		return {
			id: '',
			abbr: '',
			name: '',
			isReverse: false, // Lower is better

			// This will be serialized
			value: 0,
			min: 0,
			max: 10

		};
	},

	computed: {

		isReal: function () {
			return this.id.length & this.name.length;
		},

		offset: function () {
			return this.value / (this.max - this.min);
		},

		isSevere: function () {
			if (this.isReverse) {
				return this.value >= (0.65 * (this.max - this.min));
			}
			return this.value <= (0.35 * (this.max - this.min));
		},

		isCritical: function () {
			if (this.isReverse) {
				return this.value >= (0.9 * (this.max - this.min));
			}
			return this.value <= (0.1 * (this.max - this.min));
		}

	},

	methods: {

		setTo: function (value) {
			if (value < this.min) {
				this.value = this.min;
			} else if (value > this.max) {
				this.value = this.max;
			} else {
				this.value = value;
			}
			return this;
		}

	}

	// created: function () {},

	// beforeDestroy: function () {},

	// destroyed: function () {}

};
