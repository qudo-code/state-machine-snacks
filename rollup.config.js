import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

const pkg = require("./package.json");

export default {
    input  : "src/index.js",
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

    plugins : [
        resolve({
            browser : false,
        }),
        commonjs(),
        terser(),
    ],
};
