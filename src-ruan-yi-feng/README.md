<!--
 * @Author: BecomeBamboo
 * @Date: 2025-09-02 17:04:49
 * @LastEditTime: 2025-09-19 20:38:08
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

变量类型一旦设为`any`，TypeScript 实际上会关闭这个变量的类型检查。即使有明显的类型错误，只要句法正确，都不会报错。

建议不要使用`any`，TypeScript 提供了一个编译选项`noImplicitAny`，打开该选项，只要推断出any类型就会报错。如下

tsconfig.json
```json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,          // 推荐：开启严格模式（包含 noImplicitAny）
    // 或者单独开：
    // "noImplicitAny": true
  }
}
```

any类型的污染问题：
- `any`类型除了关闭类型检查，还有一个很大的问题，就是它会“污染”其他变量。它可以赋值给其他任何类型的变量（因为没有类型检查），导致其他变量出错。
```typescript
let x: any = "hello";
let y: number;

y = x; // 不报错

y * 123; // 不报错
y.toFixed(); // 不报错
```

在使用过程中，应该尽量避免使用`any`类型



### unknown类型

`unkown`可以视为严格版的`any`

`unknown`类型的变量，不能直接赋值给其他类型的变量（除了any类型和unknown类型）。
```typescript
let v: unknown = 123;

let v1: boolean = v; // 报错
let v2: number = v; // 报错
```

其次不能直接调用`unkown`类型变量的方法和属性
```typescript
let v1: unknown = { foo: 123 };
v1.foo; // 报错

let v2: unknown = "hello";
v2.trim(); // 报错

let v3: unknown = (n = 0) => n + 1;
v3(); // 报错
```
如何使用`unkown`？
类型缩小：
- 就是缩小unknown变量的类型范围，确保不会出错。
- 将一个不确定的类型缩小为更明确的类型

```typescript
let a: unknown = 1;

// 这里已经确定了a的实际类型是number，就能用于加法运算了，这就是类型缩小
if (typeof a === "number") {
  let r = a + 10; // 正确
}
```

总之，unknown可以看作是更安全的any。一般来说，凡是需要设为any类型的地方，通常都应该优先考虑设为unknown类型。



### never类型（重点）

never类型就是空类型，不能赋给它任何值
```typescript
// 空类型，不能给x赋值
let x: never;
```

如果1个函数不需要返回值，那么返回值可以写成`never`，即不可能返回任何值
```typescript
function f(): never {
  throw new Error("Error");
}

let v1: number = f(); // 不报错
let v2: string = f(); // 不报错
let v3: boolean = f(); // 不报错
```

为什么`never`类型可以赋值给任意其他类型呢？这也跟集合论有关，空集是任何集合的子集。TypeScript 就相应规定，任何类型都包含了`never`类型。因此，`never`类型是任何其他类型所共有的，TypeScript 把这种情况称为“底层类型”（bottom type）。

总之，TypeScript 有两个“顶层类型”（`any`和`unknown`），但是“底层类型”只有`never`唯一一个。


## 04 类型系统

### 基本类型


JavaScript将值分为8种类型：
- boolean
- string
- number
- bigint
- symbol
- object
- undefined
- null


注意，上面所有类型的名称都是小写字母，首字母大写的`Number`、`String`、`Boolean`等在 JavaScript 语言中都是内置对象，而不是类型名称。

```typescript
// boolean类型
const x: boolean = true;
const y: boolean = false;

// string类型
const x: string = "hello";
const y: string = `${x} world`;

// number类型包含整数和浮点数
const x: number = 123;
const y: number = 3.14;
const z: number = 0xffff;

// bigint包含所有的大整数
const x: bigint = 123n;
const y: bigint = 0xffffn;

// 注意bigyint类型和number类型不兼容
const x: bigint = 123; // 报错
const y: bigint = 3.14; // 报错

// symbol类型，如下Symbol()函数的返回值就是symbol类型，见后面章节
const x: symbol = Symbol();

// object类型包含对象、数组和函数
const x: object = { foo: 123 };
const y: object = [1, 2, 3];
const z: object = (n: number) => n + 1;
```


### 包装对象类型

由于包装对象的存在，导致每一个原始类型的值都有包装对象和字面量两种情况。
```typescript
"hello"; // 字面量
new String("hello"); // 包装对象
```

为了区分这两种情况，TypeScript 对五种原始类型分别提供了大写和小写两种类型。
- `Boolean` 和 `boolean`
- `String` 和 `string`
- `Number` 和 `number`
- `BigInt` 和 `bigint`
- `Symbol` 和 `symbol`


### Object类型与object类型

大写的`Object`类型代表 JavaScript 语言里面的广义对象。所有可以转成对象的值，都是Object类型，这囊括了几乎所有的值，同时空对象`{}`是`Object`类型的简写形式
```typescript
let obj: Object;

obj = true;
obj = "hi";
obj = 1;
obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
```

小写的`object`类型代表 JavaScript 里面的狭义对象，即可以用字面量表示的对象，只包含对象、数组和函数，不包括原始类型的值。
```typescript
let obj: object;

obj = { foo: 123 };
obj = [1, 2];
obj = (a: number) => a + 1;
obj = true; // 报错
obj = "hi"; // 报错
obj = 1; // 报错
```

建议总是使用小写类型`object`，不使用大写类型`Object`


### undefined和null的特殊性

### 值类型



### 联合类型（重点）


使用关键字`|`，联合类型示例：
```typescript
// x既可以是string也可以是number
let x: string | number;

x = 123; // 正确
x = "abc"; // 正确
```

感觉可以用联合类型替代枚举
```typescript
let setting: true | false;

let gender: "male" | "female";

let rainbowColor: "赤" | "橙" | "黄" | "绿" | "青" | "蓝" | "紫";
```

联合类型处理时的通用办法是类型缩小，如下所示：
```typescript
function printId(id: number | string) {
  if (typeof id === "string") {
    console.log(id.toUpperCase());
  } else {
    console.log(id);
  }
}
```


### 交叉类型（重点）

交叉类型关键字`&`
```typescript
// x同时是数值和字符串，这是不可能的，所以TypeScript会认为x的类型是never
let x: number & string;
```

交叉类型的主要用途是对象的合成以及为对象添加新属性
```typescript
// 对象合成
let obj: { foo: string } & { bar: string };

obj = {
  foo: "hello",
  bar: "world",
};

// 对象添加新属性，B是交叉类型，在A的基础上新增了属性bar
type A = { foo: number };

type B = A & { bar: number };
```


### type命令（重点）

`type`命令用来定义一个类型的别名，别名不允许重名
```typescript
// number类型别名是Age
type Age = number;

let age: Age = 55;

// 别名不允许重名
type Color = "red";
type Color = "blue"; // 报错
```

别名的作用域是块级作用域
```typescript
type Color = "red";

// if代码块里面定义的Color别名，和外部的Color是不一样的
if (Math.random() < 0.5) {
  type Color = "blue";
}
```




### typeof运算符（重点，有点没看懂）

typeof 运算符是一个一元运算符，返回一个字符串，代表操作数的类型。
```typescript
typeof undefined; // "undefined"
typeof true; // "boolean"
typeof 1337; // "number"
typeof "foo"; // "string"
typeof {}; // "object"
typeof parseInt; // "function"
typeof Symbol(); // "symbol"
typeof 127n; // "bigint"
```

TypeScript 将`typeof`运算符移植到了类型运算，它的操作数依然是一个值，但是返回的不是字符串，而是该值的 TypeScript 类型。
```typescript
const a = { x: 0 };

type T0 = typeof a; // { x: number }
type T1 = typeof a.x; // number
```

上面示例中，`typeof a`表示返回变量a的 TypeScript 类型`{ x: number }`。同理，`typeof a.x`返回的是属性x的类型`number`。



### 块级类型声明（重点）
```typescript
if (true) {
  // if代码块内，类型T生声明为number
  type T = number;
  let v: T = 5;
} else {
  // else代码块内，T类型声明为string
  type T = string;
  let v: T = "hello";
}
```


### 类型的兼容（重点）


如果类型A的值可以赋值给类型B，那么类型A就称为类型B的子类型（subtype）
```typescript
type T = number | string;

let a: number = 1;
// 类型a是number，类型b是number | string，类型a可以赋值给类型b，a是b的子类型
let b: T = a;


// 示例2
let a: "hi" = "hi";
let b: string = "hello";

// 类型a是”hi“，是string的子类型，所以b = a正确
b = a; // 正确
a = b; // 报错
```


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
