new App({
	canvas: document.querySelector('#canvas'),

	colorPicker: new ColorPicker({
		element: document.querySelector('#color-picker')
	}),

	colorPalette: new ColorPalette({
		element: document.querySelector('#color-palette'),
		colors: [
			{red: 252, green: 76, blue: 79},
			{red: 79, green: 163, blue: 252},
			{red: 104, green: 178, blue: 91},
			{red: 233, green: 178, blue: 91},
			{red: 104, green: 38, blue: 91},
			{red: 104, green: 38, blue: 22},
			{red: 11, green: 200, blue: 120},
			{red: 56, green: 38, blue: 91}
		]
	})
	
});