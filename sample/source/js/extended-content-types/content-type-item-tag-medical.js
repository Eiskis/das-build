
V.contentTypes.itemTagMedical = {

	// FLAG: can this be a callback function?
	// mixins: [V.contentTypes.itemTag],
	// mixins: function () {
	// 	return [V.contentTypes.itemTag];
	// },

	data: function () {
		return {

			medicalPower: 0,

			actions: {
				useOnSelf: {
					label: 'Use on yourself',
					callback: this.useOnSelf,
					args: []
				}
			}

		};
	},

	// computed: {},

	methods: {

		useOnSelf: function () {
			if (this.medicalPower > 0) {
				l('Using medical item');
			}
		}

	}

	// created: function () {},

};
