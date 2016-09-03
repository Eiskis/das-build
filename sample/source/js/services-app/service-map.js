
V.services.map = {

	data: function () {
		return {

			// 175 nodes
			maxColumnCount: 14,
			rowCount: 13,

			// Properties
			nodes: [],
			currentNode: null

		};
	},

	computed: {

		safeHouse: function () {
			return this.currentNode ? this.currentNode.safehouse : null;
		}

	},

	methods: {



		// Movement API

		goTo: function (x, y) {
			var nodeIndex = this.getNodeIndex(x, y);

			if (nodeIndex) {
				return this.goToNode(nodeIndex);
			}

			return null;
		},

		goToNode: function (nodeIndex) {
			var node = this.nodes[nodeIndex];

			if (node) {

				if (node.isTraversable) {
					this.currentNode = node;
					this.currentNode.setVisited();
					return this;
				}

			}

			return null;
		},

		canStep: function (deltaX, deltaY) {
			var i = this.getRelativeNodeIndex(deltaX, deltaY);
			var node = this.nodes[i];
			return node && node.isTraversable ? true : false;
		},

		step: function (deltaX, deltaY) {
			if (this.canStep(deltaX, deltaY)) {
				return this.goToNode(this.getRelativeNodeIndex(deltaX, deltaY));
			}
			return null;
		},



		// Helpers

		getRelativeNodeIndex: function (deltaX, deltaY) {
			return this.getNodeIndex(this.currentNode.x + deltaX, this.currentNode.y + deltaY);
		},

		getNodeIndex: function (x, y) {

			for (var i = 0; i < this.nodes.length; i++) {
				var node = this.nodes[i];
				if (node.x == x && node.y == y) {
					return i;
				}
			}

			return null;
		},



		// Life cycle

		afterLoad: function () {
			var nodes = [];

			// Generate rows and columns
			for (var i = 0; i < this.rowCount; i++) {
				for (var j = 0; j < (!(i % 2) ? this.rowCount : this.maxColumnCount); j++) {

					// Generate map node with the right coordinates
					var data = app.data.raw.mapNodes[0];
					data.y = i;
					data.x = j;

					// Add to list
					nodes.push(app.get('mapNode', data));

				}
			}

			this.nodes = nodes;

			// Pick random map node as current
			this.currentNode = this.nodes[_.random(0, this.nodes.length-1)];
			this.currentNode.setVisited();

		}

	}

};
