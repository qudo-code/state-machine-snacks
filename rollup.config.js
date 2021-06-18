import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const inputDir = "src";

const {
    name,
    main,
    module : esm,
} = require("./package.json");

export default {
    input  : `${inputDir}/index.js`,
    output : [
        {
            file   : esm,
            format : "es",
        },
        {
            file   : main,
            format : "cjs",
            name,
        },
    ],
    plugins : [
        resolve({
            browser : false,
        }),
        commonjs(),
        terser(),
    ],
};
