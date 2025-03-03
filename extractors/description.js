import {itemPropExtractor} from "./abstracts/item-prop.js";

export const description = (root) => {
    return itemPropExtractor(root, 'description', 'description', node => node.text.trim())
}