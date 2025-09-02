<!--
 * @Author: BecomeBamboo
 * @Date: 2025-09-02 16:48:26
 * @LastEditTime: 2025-09-02 18:03:03
 * @Description: typescript学习
-->


# 目录


# 调试

typescript加断点调试有2种方法：
- 使用tsx直接调试ts
- 使用编译后的dist去执行（pfcs-server）

## 使用tsx直接调试ts

package.json
```json
{
  "name": "my-typescript-study",
  "version": "1.0.0",
  "description": "typescript学习",
  "type": "module",
  "main": "my-typescript-study.ts",
  "private": true,
  "bin": "src/app.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsup",
    "start": "node dist/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@fastify/cors": "^11.1.0",
    "dayjs": "^1.11.18",
    "fastify": "^5.5.0",
    "influx": "^5.10.0",
    "mariadb": "^3.4.5",
    "mqtt": "^5.14.0",
    "redis": "^5.8.2",
    "winston": "^3.17.0"
  },
  "devDependencies": {
    "tsup": "^8.5.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}

```

.vscode/launch.json
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "console": "none",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Debug TS with tsx",
            // 主要是这里
            "runtimeArgs": [
                "--import",
                "tsx"
            ],
            "cwd": "${workspaceFolder}",
            "skipFiles": [
                "<node_internals>/**"
            ],
            // 后盾人
            "program": "${workspaceFolder}/src-hou-dun-ren/chapter-01/viedo06/demo06.ts",
            "env": {
                "NODE_ENV": "development"
            }
        }
    ]
}
```

然后直接加断点调试即可

## 使用编译后的dist调试

参考pfcs-server项目

package.json
```json
{
  "name": "pfcs-server",
  "version": "1.0.0",
  "description": "一次调频子站服务端",
  "type": "module",
  "main": "pfcs-server.ts",
  "private": true,
  "bin": "src/app.js",
  "directories": {
    "test": "test"
  },
  "scripts": {
    "dev": "tsx watch src/app.ts",
    "build": "tsup",
    "start": "node dist/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@fastify/cors": "^11.1.0",
    "dayjs": "^1.11.18",
    "fastify": "^5.5.0",
    "influx": "^5.10.0",
    "mariadb": "^3.4.5",
    "mqtt": "^5.14.0",
    "redis": "^5.8.2",
    "winston": "^3.17.0"
  },
  "devDependencies": {
    "tsup": "^8.5.0",
    "tsx": "^4.20.5",
    "typescript": "^5.9.2"
  }
}

```

.vscode/launch.json
```json
{
    // Use IntelliSense to learn about possible attributes.
    // Hover to view descriptions of existing attributes.
    // For more information, visit: https://go.microsoft.com/fwlink/?linkid=830387
    "version": "0.2.0",
    "console": "none",
    "configurations": [
        {
            "type": "node",
            "request": "launch",
            "name": "Launch Program",
            "skipFiles": [
                "<node_internals>/**"
            ],
            "program": "${workspaceFolder}/src/app.ts",
            // "program": "${workspaceFolder}/src/appHistory.js",


            // "program": "${workspaceFolder}/test/init/init.test.js",
            // "program": "${workspaceFolder}/test/excel/excel.test.js",
            // "program": "${workspaceFolder}/test/yachen/mapping.test.js",
            "env": {
                "NODE_ENV": "development"
            }
        }
    ]
}
```

调试前先执行`npm run build`生成dist，然后在在ts文件里加断点执行