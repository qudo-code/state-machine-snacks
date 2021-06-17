import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const { readdirSync } = require('fs');

const pkg = require("./package.json");

const inputDir = "src";
const outputDir = "dist";
const pluginsInputDir = `${inputDir}/plugins`;
const pluginsOutputDir = `${outputDir}/plugins`;

// Run these on everything
const plugins = [
    resolve({
        browser : false,
    }),
    commonjs(),
    terser(),
];

const pluginConfigs = readdirSync(pluginsInputDir, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory() && !dirent.name.startsWith("_"))
    .map(({ name }) => ({
            input : `./src/plugins/${name}/index.js`,

            output : [
                {
                    file   : `${pluginsOutputDir}/${name}/index.mjs`,
                    format : "es",
                },
                {
                    file   : `${pluginsOutputDir}/${name}/index.js`,
                    format : "cjs",
                    name   : "state-machine-ui",
                },
            ],

            plugins
        }));

const mainConfig = {
    input  : `${inputDir}/index.js`,
    output : [
        {
            file   : pkg.module,
            format : "es",
        },
        {
            file   : pkg.main,
            format : "cjs",
            name   : "state-machine-ui",
        },
    ],
    
    plugins,
};


export default [
    mainConfig,
    ...pluginConfigs,
]