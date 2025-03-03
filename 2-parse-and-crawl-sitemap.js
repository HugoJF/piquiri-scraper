import fs from "fs";
import {parse} from "node-html-parser";
import {availability} from "./extractors/availability.js";
import {images} from "./extractors/images.js";
import {name} from "./extractors/name.js";
import {description} from "./extractors/description.js";
import {JSONPath} from "jsonpath-plus";
import {crawlUrl} from "./helpers/crawl.js";
import {PHASE_1_SITEMAP, PHASE_2_MALTS} from "./constants/filenames.js";

const raw = fs.readFileSync(PHASE_1_SITEMAP);
const sitemap = JSON.parse(raw);

const urls = JSONPath({
    json: sitemap,
    path: '$.urlset.children[*].url.children[*].loc.content'
})

const malts = urls
    .filter(url => url.includes('malt'))
    .filter(url => !url.endsWith('malte-'))
    .filter(url => url.includes('100g'))
;

// Extrato
// aveia
// maltodextrina


console.log(malts)
console.log('Crawl total of', malts.length, 'malts')

const firstRunExtractors = [
    name,
    description,
    images,
    availability,
];

const maltData = [];
for await (const malt of malts) {
    console.log('Crawling URL', malt);
    const data = await crawlUrl(malt, firstRunExtractors);
    maltData.push(data);
}

fs.writeFileSync(PHASE_2_MALTS, JSON.stringify(maltData, null, 2))