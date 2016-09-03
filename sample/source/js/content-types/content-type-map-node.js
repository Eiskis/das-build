
V.contentTypes.mapNode = {

	data: function () {
		return {

			// Primitive properties
			id: '',
			name: '',
			x: 0,
			y: 0,
			monsterDensity: 0,
			visited: false,

			// Children
			outdoorType: null,

			// Collections
			items: []

		};
	},

	computed: {

		isReal: function () {
			return this.id.length && this.name.length && this.outdoorType && this.outdoorType.isReal;
		},

		water: function () {
			return (!_.random(0, 8) ? true : false);
		},

		safehouse: function () {
			return app.data.getByProperty('safehouses', 'mapNodeId', this.id);
		},

		isOdd: function () {
			return (this.y % 2) ? true : false;
		},

		isTraversable: function () {
			return !this.water ? true : false;
		}

	},

	methods: {

		setVisited: function () {
			this.visited = true;
			return this;
		}

	}

};
