import {itemPropExtractor} from "./abstracts/item-prop.js";

export const name = (root) => {
    return itemPropExtractor(root, 'name', 'name', node => node.text)
}