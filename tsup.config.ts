/*
 * @Author: BecomeBamboo
 * @Date: 2025-08-30 11:42:41
 * @LastEditTime: 2025-08-30 12:57:19
 * @Description:
 */
import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/app.ts"],
  outDir: "dist",
  format: ["esm"], // 产物用 ESM
  outExtension: () => ({ js: ".js" }), // 产物名就是 app.js
  platform: "node",
  target: "node18",
  sourcemap: true, // 生产可关掉以减小体积
  clean: true,
  minify: true,
  splitting: false, // 单文件
  treeshake: true,
  dts: false,
  // 关键：给 ESM 产物注入可用的 require（解决动态 require 报错）
  banner: {
    js: `
import { createRequire } from "module";
const require = createRequire(import.meta.url);
// 如需 __dirname / __filename，也可一起注入：
// import { fileURLToPath } from "url"; import { dirname } from "path";
// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
    `.trim(),
  },
});
