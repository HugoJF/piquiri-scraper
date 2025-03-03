export const itemPropExtractor = (root, name, itemPropName, extractor) => {
    const node = root.querySelector(`[itemprop=${itemPropName}]`)
    const attribute = extractor(node);

    return {[name]: attribute}
}