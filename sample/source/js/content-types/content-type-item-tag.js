
V.contentTypes.itemTag = {

	data: function () {
		return {

			// Primitive properties
			id: '',
			categoryName: '',
			tagName: ''

		};
	},

	computed: {

		isReal: function () {
			return this.id.length && this.tagName.length;
		},

		icon: function () {
			return this.id;
		}

	}

	// methods: {}

	// created: function () {}

	// destroyed: function () {}

};
