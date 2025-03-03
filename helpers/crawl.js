import {parse} from "node-html-parser";

export async function crawlUrl(href, extractors) {
    const response = await fetch(href);
    const text = await response.text();

    const root = parse(text);

    const extracted = extractors.map(extractor => extractor(root));
    const merged = extracted.reduce((acc, obj) => ({...acc, ...obj}), {});

    console.log(href, merged)

    return {
        ...merged,
        url: href,
    };
}