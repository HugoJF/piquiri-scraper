import fs from 'fs';
import xml from "simple-xml-to-json";
import {PHASE_1_SITEMAP} from "./constants/filenames.js";

const url = 'https://www.piquiribrewshop.com.br/sitemap.xml';

const response = await fetch(url);
const json = xml.convertXML(await response.text())

fs.writeFileSync(PHASE_1_SITEMAP, JSON.stringify(json, null, 2))