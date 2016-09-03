
V.views['game'] = {

	// Incoming
	// props: [],

	// Properties
	data: function () {
		return {

			activeOverlays: [],
			activeCards: [],

			// Reverse indexes
			activeOverlayIndex: -1,
			activeCardIndex: 0

		};
	},

	// Computed properties
	computed: {

		self: function () {
			return this;
		},

		activeOverlay: function () {
			return this.activeOverlays[this.activeOverlayIndex];
		},

		isOverlayed: function () {
			return this.activeOverlay ? true : false;
		},

		activeCard: function () {
			return this.activeCards[this.activeCardIndex];
		},

		statusHeaderIsActive: function () {

			if (this.showSplash) {
				return false;
			}

			// Status header is shown always
			return true;
		},

		state: function () {
			return {
				showSplash: this.showSplash,
				isOverlayed: this.isOverlayed,
				statusHeaderIsActive: this.statusHeaderIsActive
			};
		},

		classes: function () {
			var classes = [];

			// State classes
			for (var key in this.state) {
				var className = _.kebabCase(key.substr(0, 2) == 'is' ? key.substr(2) : key);
				classes.push((this.state[key] ? 'is-' : 'not-') + className);
			}

			if (this.activeCards.length) {

				// Card classes
				for (var i = 0; i < this.activeCards.length; i++) {
					classes.push('has-' + this.activeCards[i].id);
				}

				// Active card
				classes.push('is-on-' + this.activeCards[this.activeCardIndex].id);

			}

			return classes.join(' ');
		}

	},

	// Behavior
	methods: {



		// Overlays
		// FLAG: mostly duplication from card handling, these can be merged later if thye don't diverge more during development

		// Show a new overlay
		// NOTE: this could have all the fanciness of the card management, but there's not really need for it
		overlayOpen: function (viewId, viewProps) {

			// Normalize input (allow passing entire card object)
			if (_.isPlainObject(viewId)) {
				viewProps = viewId.props;
				viewId = viewId.id;
			}

			// Kill any lingering overlays before pushing more of them
			this.killInactiveOverlays();

			// Check if card is already next in stack
			this.activeOverlays.push({
				id: viewId,
				props: (viewProps ? viewProps : {})
			});

			// Let card enter DOM, then activate
			_.delay(this.overlayNext, 25);

			return this;
		},

		overlayNext: function () {
			if (this.activeOverlays.length > this.activeOverlayIndex + 1) {
				this.activeOverlayIndex++;
			}
			return this;
		},

		// NOTE: this allows backtracking to non-existent index
		overlayBack: function () {
			if (this.activeOverlayIndex > -1) {
				this.activeOverlayIndex--;
			}
			return this;
		},

		killInactiveOverlays: function () {
			var offset = this.activeOverlays.length - (this.activeOverlayIndex + 1);

			// Remove correct number of array items from end
			// FLAG: can't I pop them all at once? Need to leave the existing ones as they are though
			if (offset > 0) {
				for (var i = 0; i < offset; i++) {
					this.activeOverlays.pop();
				}
			}

			return this;
		},



		// Card management

		getNextCard: function () {
			if (this.activeCards.length) {
				return this.activeCards[this.activeCardIndex + 1];
			}
			return null;
		},

		getInitialCard: function () {
			return {
				id: 'card-area'
			};
		},

		// Show a card
		open: function (viewId, viewProps) {

			// Normalize input (allow passing entire card object)
			if (_.isPlainObject(viewId)) {
				viewProps = viewId.props;
				viewId = viewId.id;
			}

			// Only open if this is not already in use
			if (
				!this.activeCards.length ||
				this.activeCards[this.activeCardIndex].id != viewId ||
				this.activeCards[this.activeCardIndex].props != viewProps
			) {

				// Check if card is already next in stack
				var next = this.getNextCard();
				if (
					!next ||
					next.id != viewId ||
					next.props != viewProps
				) {

					// Clean up
					this.killInactiveCards();

					// Fetch new card
					this.activeCards.push({
						id: viewId,
						props: (viewProps ? viewProps : {})
					});

					// Let card enter DOM, then activate
					// FLAG: is there a reliable way to do this?
					// this.$nextTick(this.next);
					_.delay(this.next, 25);

				// Card is already the next one
				} else {
					_.defer(this.next);
				}

			}

			return this;
		},

		next: function () {
			if (this.activeCards.length > this.activeCardIndex + 1) {
				this.activeCardIndex++;
			}
			return this;
		},

		back: function () {
			if (this.activeCardIndex > 0) {
				this.activeCardIndex--;
			}
			return this;
		},

		killInactiveCards: function () {
			var offset = this.activeCards.length - (this.activeCardIndex + 1);

			// Remove correct number of array items from end
			// FLAG: can't I pop them all at once? Need to leave the existing ones as they are though
			if (offset > 0) {
				for (var i = 0; i < offset; i++) {
					this.activeCards.pop();
				}
			}

			return this;
		}

	},

	mounted: function () {

		// FLAG: this should maybe be set up differently for lazy loading...
		var vm = this;
		_.defer(function () {
			vm.open(vm.getInitialCard());
		});

	}

};
