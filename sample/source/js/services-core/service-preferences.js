
// NOTE: add support for merging local storage data and user profile data

V.services.preferences = {

	data: function () {
		return {
			sounds: true
		};
	},

	computed: {},

	methods: {

		toggleSounds: function () {
			if (this.sounds) {
				this.sounds = false;
			} else {
				this.sounds = true;
			}
			return this;
		}

	}

};
