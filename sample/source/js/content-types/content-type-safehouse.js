
V.contentTypes.safehouse = {

	data: function () {
		return {

			// Primitive properties
			area: '',
			name: '',
			floor: 0,

			// Children
			tags: null,

			// // Collections
			// // Things to secure
			// doors: [],
			// windows: [],

			// // Fixed equipment
			// furniture: [],

			// // Items that can be moved
			// items: []

		};
	},

	computed: {

		isReal: function () {
			return this.area.length && this.name.length && this.outdoorType && this.outdoorType.isReal;
		},

		// hasUnsecuredDoors: function () {
		// 	for (var i = 0; i < this.doors.length; i++) {
		// 		if (!this.doors[i].isSecured) {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// },

		// hasUnsecuredWindows: function () {
		// 	for (var i = 0; i < this.windows.length; i++) {
		// 		if (!this.windows[i].isSecured) {
		// 			return true;
		// 		}
		// 	}
		// 	return false;
		// },

		// isSecured: function () {
		// 	return !this.hasUnsecuredDoors && !this.hasUnsecuredDoors;
		// }

	}

	// methods: {}

	// created: function () {},

	// beforeDestroy: function () {},

	// destroyed: function () {}

};
