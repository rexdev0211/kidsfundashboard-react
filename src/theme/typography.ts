function pxToRem(value: number) {
	return `${value / 16}rem`
}
const typography = {
	h1: {
		fontWeight: 500,
		fontSize: 35,
		letterSpacing: '-0.24px',
		textTransform: 'capitalize',
	},
	h2: {
		fontWeight: 500,
		fontSize: 29,
		letterSpacing: '-0.24px',
		textTransform: 'capitalize',
	},
	h3: {
		fontWeight: 500,
		fontSize: 24,
		letterSpacing: '-0.06px',
		textTransform: 'capitalize',
	},
	h4: {
		fontWeight: 500,
		fontSize: 20,
		letterSpacing: '-0.06px',
		textTransform: 'capitalize',
	},
	h5: {
		fontWeight: 500,
		fontSize: 16,
		letterSpacing: '-0.05px',
		textTransform: 'capitalize',
	},
	h6: {
		fontWeight: 500,
		fontSize: 14,
		letterSpacing: '-0.05px',
		textTransform: 'capitalize',
	},
	subtitle1: {
		fontWeight: 400,
		lineHeight: 1.75,
		textTransform: 'capitalize',
	},
	subtitle2: {
		fontWeight: 'bold', //'200'
		fontSize: '9px',
		lineHeight: 1.25,
		paddingBottom: '2px',
		textTransform: 'capitalize',
	},
	caption: {
		lineHeight: 1.5,
		fontSize: pxToRem(12),
		paddingRight: '5px',
	},
	overline: {
		fontWeight: 500,
	},
}
export default typography
