//  resize image element (-canvas  image source) based  on wantedWidth
export function resizeImageToThumb(imgEl, wantedWidth) {
	const canvas = document.createElement('canvas')
	const ctx = canvas.getContext('2d')

	const aspect = imgEl.width / imgEl.height

	canvas.width = wantedWidth
	canvas.height = wantedWidth / aspect

	ctx.drawImage(imgEl, 0, 0, canvas.width, canvas.height)
	return canvas.toDataURL()
}

export function resizeImage(imgEl, maxWidth = 1200, maxLength = 1200) {
	// Resize the image
	// Currently only maxWidth is used. Pending improvement
	var canvas = document.createElement('canvas')
	var max_size = maxWidth
	var width = imgEl.width
	var height = imgEl.height
	if (width > height) {
		if (width > max_size) {
			height *= max_size / width
			width = max_size
		}
	} else {
		if (height > max_size) {
			width *= max_size / height
			height = max_size
		}
	}
	canvas.width = width
	canvas.height = height
	canvas.getContext('2d').drawImage(imgEl, 0, 0, width, height)
	return canvas.toDataURL('image/jpeg')
}
