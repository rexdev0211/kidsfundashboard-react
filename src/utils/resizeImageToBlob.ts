import dataUriFromFormFile from 'src/utils/dataUriFromFile'
import { resizeImageToThumb, resizeImage } from 'src/utils/resizeImage'
import { dataURItoBlob } from 'src/utils/dataURItoBlob'

export function getThumbImageToBlob(file: File) {
	return new Promise(async (resolve) => {
		const result = await dataUriFromFormFile(file)
		const imgEl = document.createElement('img')
		imgEl.onload = () => {
			const resizedDataUri = resizeImageToThumb(imgEl, 300)

			resolve(dataURItoBlob(resizedDataUri))
		}
		imgEl.src = result as string

		//console.log('resiezedDataUri', resizedDataUri)
	})
}

export function resizeImageToBlob(file: File) {
	return new Promise(async (resolve) => {
		const result = await dataUriFromFormFile(file)
		const imgEl = document.createElement('img')
		imgEl.onload = () => {
			if (imgEl.width <= 1400 && imgEl.height <= 1400) {
				resolve(file)
			} else {
				const resizedDataUri = resizeImage(imgEl, 1400, 1400) // reduce image  file  size to  maximum width  1400

				resolve(dataURItoBlob(resizedDataUri))
			}
		}
		imgEl.src = result as string

		//console.log('resiezedDataUri', resizedDataUri)
	})
}
// widhth:Length ratio: 4:3
export function resizeImageToBlobMobile(
	file: File,
	maxWidth = 480,
	maxLength = 900
) {
	return new Promise(async (resolve) => {
		const result = await dataUriFromFormFile(file)
		const imgEl = document.createElement('img')
		imgEl.onload = () => {
			if (imgEl.width <= maxWidth && imgEl.height <= maxLength) {
				resolve(file)
			} else {
				const resizedDataUri = resizeImage(imgEl, maxWidth, maxLength) // reduce image  file  size to  maximum width  1400

				resolve(dataURItoBlob(resizedDataUri))
			}
		}
		imgEl.src = result as string

		//console.log('resiezedDataUri', resizedDataUri)
	})
}
