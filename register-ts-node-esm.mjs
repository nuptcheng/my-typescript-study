/*
 * @Author: BecomeBamboo
 * @Date: 2025-09-07 16:07:56
 * @LastEditTime: 2025-09-07 16:08:02
 * @Description: 
 */
// register-ts-node-esm.mjs
import { register } from 'node:module';
import { pathToFileURL } from 'node:url';
register('ts-node/esm', pathToFileURL('./')); // 在当前工程作用域注册 ts-node 的 ESM 加载器
