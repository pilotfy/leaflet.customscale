L.Control.ScaleNautic = L.Control.Scale.extend({
	options: {
		nautic: false
	},

	_addScales: function(options, className, container) {
		L.Control.Scale.prototype._addScales.call(this, options, className, container);
		L.setOptions(options);
		if (this.options.nautic) {
			this._nScale = L.DomUtil.create('div', className, container);
		}
	},

	_updateScales: function (maxMeters) {
		L.Control.Scale.prototype._updateScales.call(this, maxMeters);
		if (this.options.nautic && maxMeters) {
			this._updateNautic(maxMeters);
		}
	},

	_updateNautic: function (maxMeters) {
		const maxNm = maxMeters / 1852;

		let nm;
		if (maxMeters < 185) {
			nm = Math.round(maxNm * 100) / 100;
		} else if (maxMeters < 1852) {
			nm = Math.round(maxNm * 10) / 10;
		} else {
			nm = this._getRoundNum(maxNm);
		}
		let label = nm + ' nm';

		this._updateScale(this._nScale, label, nm / maxNm);
	}
});

L.control.scalenautic = function (options) {
	return new L.Control.ScaleNautic(options);
};
