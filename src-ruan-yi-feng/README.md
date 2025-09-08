<!--
 * @Author: BecomeBamboo
 * @Date: 2025-09-02 17:04:49
 * @LastEditTime: 2025-09-07 16:14:24
 * @Description: 阮一峰TypeScript教程
-->

# 教程资料

教程文档：
- TypeScript教程文档：[TypeScript教程文档](https://typescript.p6p.net/typescript-tutorial/interface.html)
- ES6教程文档：[Es6教程文档](https://wangdoc.com/es6/)

TypeScript在线编译界面：
https://www.typescriptlang.org/play/


# 教程

## 01 简介


## 02 基本用法

### 类型推断

类型推断：类型声明并不是必需的，如果没有，TypeScript 会自己推断类型。
- 变量类型推断
- 函数返回值类型推断


### 类型编译

TypeScript 项目里面，其实存在两种代码，一种是底层的“值代码”，另一种是上层的“类型代码”。前者使用 JavaScript 语法，后者使用 TypeScript 的类型语法。

TypeScript 的编译过程，实际上就是把“类型代码”全部拿掉，只保留“值代码”。（个人理解就是将TypeScript代码编译成JavaScript代码）

### tsc编译器

```shell
# 查看tsc帮助
tsc -h

# 查看完整帮助信息
tsc --all

# 编译ts文件
tsc file1.ts file2.ts file3.ts

# 将多个ts文件编译成1个js, --outFile参数
tsc file1.ts file2.ts --outFile app.js

# --outDir指定保存目录
tsc app.ts --outDir dist

# tsc默认编译的js版本较低，建议使用es2015或更新版本
# 使用--target
tsc --target es2015 app.ts

# tsc默认即使编译报错还是能生成dist，因为初衷是让用户自己处理，如果希望一旦报错就停止编译，不生成编译产物，可以使用--noEmitOnError参数
tsc --noEmitOnError app.ts

# 只检查类型是否正确，不生成 JavaScript 文件
tsc --noEmit app.ts
```

上面所有配置项都可以在配置文件tsconfig.json中指定，如下
```json
{
  "files": ["file1.ts", "file2.ts"],
  "compilerOptions": {
    "outFile": "dist/app.js"
  }
}
```

### ts-node模块和tsx模块

#### ts-node模块

npm安装ts-node后，这是一个ESM严格类型校正，直接执行命令为
```shell
# node --loader ts-node/esm ./src-ruan-yi-feng/chapter-01/demo.ts

# 增加node20 register钩子
node --import ./register-ts-node-esm.mjs ./src-ruan-yi-feng/chapter-01/demo.ts
```

对应的launch.json为
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug TS (ts-node ESM)",
  "program": "${workspaceFolder}/src-hou-dun-ren/chapter-01/viedo06/demo06.ts",
  "runtimeArgs": ["--loader", "ts-node/esm"],
  "env": { "NODE_ENV": "development" },
  "cwd": "${workspaceFolder}",
  "skipFiles": ["<node_internals>/**"]
}
```


#### tsx模块（极速型，不如ts-node严格）

直接执行命令为
```shell
node --import tsx ./src-hou-dun-ren/chapter-01/viedo06/demo06.ts
```

launch.json
```json
{
  "type": "node",
  "request": "launch",
  "name": "Debug TS (tsx)",
  "program": "${workspaceFolder}/src-hou-dun-ren/chapter-01/viedo06/demo06.ts",
  "runtimeArgs": ["--import", "tsx"],
  "env": { "NODE_ENV": "development" },
  "cwd": "${workspaceFolder}",
  "skipFiles": ["<node_internals>/**"]
}
```

## 03 any 类型

### any类型

### unknown类型

### never类型


## 04 类型系统

## 05 数组

## 06 元组

## 07 symbol 类型

## 08 函数

## 09 对象

## 10 interface

## 11 类

## 12 泛型

## 13 Enum 类型

## 14 类型断言

## 15 模块

## 16 namespace

## 17 装饰器

## 18 declare 关键字

## 19 d.ts 类型声明文件

## 20 运算符

## 21 类型映射

## 22 类型工具

## 23 注释指令

## 24 tsconfig.json 文件

## 25 tsc 命令

## 26 React 支持
