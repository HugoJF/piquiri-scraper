import {unique} from "../helpers/array.js";

export const images = (root) => {
    const images = root.querySelectorAll('[itemprop=image]')

    const src = images.map(image => image.getAttribute('src'))

    return {images: unique(src)}
}