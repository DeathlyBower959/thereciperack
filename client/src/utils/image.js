export const resizeBase64Img = (base64, newWidth, newHeight) => {
    return new Promise((resolve, reject) => {
        var canvas = document.createElement('canvas')
        canvas.style.width = newWidth.toString() + 'px'
        canvas.style.height = newHeight.toString() + 'px'
        let context = canvas.getContext('2d')
        let img = document.createElement('img')
        img.src = base64
        img.onload = function () {
            context.scale(newWidth / img.width, newHeight / img.height)
            context.drawImage(img, 0, 0)
            const dataURL = canvas.toDataURL()
            canvas.remove()
            resolve(dataURL)
        }
    })
}

export const byteSize = (string, unit) => {
    const size = new Blob([string]).size
    
    
    if (unit == 'kb') return size * 0.001
    if (unit == 'mb') return size * 0.000001

    return size
}
