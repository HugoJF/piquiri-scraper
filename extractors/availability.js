import {itemPropExtractor} from "./abstracts/item-prop.js";

export const availability = (root) => {
    return itemPropExtractor(root, 'availability', 'availability', node => node.getAttribute('content'))
}