export const alpha = (color: string, alpha: number) => {
  const hexRegExp = /^#[\w\d]{6}$/

  if (hexRegExp.test(color)) {
    const r = `0x${color[1]}${color[2]}`
    const g = `0x${color[3]}${color[4]}`
    const b = `0x${color[5]}${color[6]}`

    return rgbToHslAlpha(+r, +g, +b, alpha)
  }

  if (color.startsWith('rgb(')) {
    const [r, g, b] = color.slice(4, -1).split(', ')

    return rgbToHslAlpha(+r, +g, +b, alpha)
  }

  if (color.startsWith('hsl(')) {
    const [h, s, l] = color.slice(4, -1).split(', ')

    return `hsla(${h}, ${s}, ${l}, ${alpha})`
  }

  throw new Error('Unsupported color. Delete alpha function, or change color')
}

function rgbToHslAlpha(r: number, g: number, b: number, alpha: number) {
  // Make r, g, and b fractions of 1
  // eslint-disable-next-line no-param-reassign
  r /= 255
  // eslint-disable-next-line no-param-reassign
  g /= 255
  // eslint-disable-next-line no-param-reassign
  b /= 255

  // Find greatest and smallest channel values
  const cmin = Math.min(r, g, b)
  const cmax = Math.max(r, g, b)
  const delta = cmax - cmin
  let h = 0
  let s = 0
  let l = 0

  // Calculate hue
  // No difference
  if (delta === 0) h = 0
  // Red is max
  else if (cmax === r) h = ((g - b) / delta) % 6
  // Green is max
  else if (cmax === g) h = (b - r) / delta + 2
  // Blue is max
  else h = (r - g) / delta + 4

  h = Math.round(h * 60)

  // Make negative hues positive behind 360°
  if (h < 0) h += 360

  // Calculate lightness
  l = (cmax + cmin) / 2

  // Calculate saturation
  s = delta === 0 ? 0 : delta / (1 - Math.abs(2 * l - 1))

  // Multiply l and s by 100
  s = +(s * 100).toFixed(1)
  l = +(l * 100).toFixed(1)

  return `hsla(${h}, ${s}%, ${l}%, ${alpha})`
}
