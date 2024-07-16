import path from "path";
import {fileURLToPath} from 'url';

const __filenameBase = fileURLToPath(import.meta.url);
const __dirnameBase = path.dirname(__filenameBase);

export const pathRoot = path.resolve(__dirnameBase, "..");
export const pathSvg = path.resolve(pathRoot, "src", "assets", "icons");
export const pathSrc = path.resolve(pathRoot, "src", "icons");
