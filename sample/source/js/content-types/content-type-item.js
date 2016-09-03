
V.contentTypes.item = {

	data: function () {
		return {

			// Primitive properties
			id: '',
			name: '',
			description: '',
			needsExternalPower: '',
			weight: 0,
			isConsumable: 1,
			uses: 0,

			// Children
			tagsString: null

		};
	},

	computed: {

		isReal: function () {
			return this.id.length && this.name.length;
		},

		// Return tag objects
		// FLAG: maybe we should keep a collection of tags in a service, here each item has its own objects
		tags: function () {
			if (this.tagsString) {
				return _.map(app.util.explodeCsvString(this.tagsString), function (value, index, collection) {
					var itemData = app.data.getByProperty('itemTags', 'id', value);
					return app.get('itemTag', itemData);
				});
			}
			return [];
		},

		icon: function () {

			// Icon is the icon of first tag
			if (this.tags.length) {
				for (var i = 0; i < this.tags.length; i++) {
					if (this.tags[i].icon) {
						return this.tags[i].icon;
					}
					break;
				}
			}

			return null;
		}

	},

	methods: {

		do: function (itemAction) {
			return app.actions.itemActions[itemAction](this);
		},

		isTaggedWith: function (tagId) {
			for (var i = 0; i < this.tags.length; i++) {
				if (this.tags[i].id == tagId) {
					return true;
				}
				return false;
			}
		}

	}

	// created: function () {},

};
