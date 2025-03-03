import fs from "fs";
import {availability} from "./extractors/availability.js";
import {crawlUrl} from "./helpers/crawl.js";
import {PHASE_3_AUGMENTED_MANUALLY} from "./constants/filenames.js";

const raw = fs.readFileSync(PHASE_3_AUGMENTED_MANUALLY);
const malts = JSON.parse(raw);


console.log(malts)

const updateRunExtractors = [
    availability,
];

const refreshedData = [];
for await (const malt of malts) {
    console.log('Crawling URL', malt);
    const data = await crawlUrl(malt.url, updateRunExtractors);
    refreshedData.push({
        ...malt,
        ...data,
    });
}

fs.writeFileSync('data/4-stocks.json', JSON.stringify(refreshedData, null, 2))