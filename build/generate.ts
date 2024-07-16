import path from 'path';
import {readFile, writeFile} from 'fs/promises';
import {emptyDir} from 'fs-extra';
import camelcase from 'camelcase';
import glob from 'fast-glob';
import type {BuiltInParserName} from 'prettier';
import {format} from 'prettier';
import chalk from 'chalk';
import {pathSrc, pathSvg} from './paths';
import {XMLBuilder, XMLParser} from 'fast-xml-parser';

const prefix = 'Icon';

const getSvgFiles = async () => {
    return glob('*.svg', {cwd: pathSvg, absolute: true});
};

const getName = (file: string) => {
    const filename = path.basename(file).replace('.svg', '');
    const componentName = camelcase(filename, {pascalCase: true});
    return {
        filename,
        componentName,
    };
};

const formatCode = (code: string, parser: BuiltInParserName = 'typescript') =>
    format(code, {
        parser,
        semi: false,
        singleQuote: true,
    });

const isObject = (o: any) => Object.prototype.toString.call(o) === '[object Object]';

const recursionInsertFill = (json: any, skip = false): void => {
    if (Array.isArray(json)) {
        json.forEach(item => recursionInsertFill(item));
    } else if (isObject(json)) {
        if (!skip && !('@_fill' in json)) {
            json['@_fill'] = 'currentColor';
        }
        for (const key in json) {
            if (!key.startsWith('@_')) {
                recursionInsertFill(json[key]);
            }
        }
    }
};

const insertFillAttribute = (json: any): void => {
    if (isObject(json)) {
        if ('svg' in json) {
            if (Array.isArray(json.svg)) {
                json.svg.forEach((svg: any) => recursionInsertFill(svg, true));
            } else if (isObject(json.svg)) {
                recursionInsertFill(json.svg, true);
            }
        } else throw new Error('No svg tag');
    }
};

const transformToVueComponent = async (file: string) => {
    let content = await readFile(file, 'utf-8');
    const parser = new XMLParser({ignoreAttributes: false});
    const svgJson = parser.parse(content);
    // console.log(svgJson)
    insertFillAttribute(svgJson);
    const builder = new XMLBuilder({ignoreAttributes: false});
    content = builder.build(svgJson);
    const {filename, componentName} = getName(file);
    const vue = await formatCode(
        `
<template>
${content}
</template>
<script lang="ts">
  import { defineComponent } from "vue";
  
  export default defineComponent({
    name: "${componentName}",
  });
</script>`,
        'vue'
    );
    await writeFile(path.resolve(pathSrc, `${filename}.vue`), vue, 'utf-8');
};

const generateEntry = async (files: string[]) => {
    const code = await formatCode(
        files
            .map(file => {
                const {filename, componentName} = getName(file);
                return `export { default as ${prefix}${componentName} } from "./${filename}.vue";`;
            })
            .join('\n')
    );
    await writeFile(path.resolve(pathSrc, 'index.ts'), code, 'utf-8');
};

(async () => {
    console.info(chalk.blue('generating vue components'));
    await emptyDir(pathSrc);
    const files = await getSvgFiles();
    console.info(chalk.blue('generating vue files'));
    await Promise.all(files.map(file => transformToVueComponent(file)));
    console.info(chalk.blue('generating entry file'));
    await generateEntry(files);
})();
