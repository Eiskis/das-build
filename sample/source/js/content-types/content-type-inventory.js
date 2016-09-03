
V.contentTypes.inventory = {

	data: function () {
		return {
			items: []
		};
	},

	computed: {

		addItem: function (item) {
			this.items.push(item);
		},

		loadItem: function (itemData) {
			this.items.push(app.get('item', itemData));
		}

	},

	methods: {
		onLoad: function () {
			var items = [];
			for (var i = 0; i < _.random(2, 9); i++) {
				items.push(app.get('item', app.data.raw.items[_.random(0, app.data.raw.items.length-1)]));
			}
			this.items = items;
		}
	}

	// created: function () {},

};
