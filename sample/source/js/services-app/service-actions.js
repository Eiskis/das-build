
V.services.actions = {

	data: function () {
		return {

			itemActions: {

				consume: function (item) {
					if (item.isConsumable) {
						if (item.uses) {
							item.uses--;
							alert('Used consumable ' + item.name);
						}
					} else {
						alert('Used ' + item.name);
					}
				}

			}

		};
	},

	// computed: {},

	methods: {
	}

};
