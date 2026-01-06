step1 --> npm init -y
step2 --> npm install typescript ts-node @types/node @tsconfig/node-lts --save-dev
step3 --> npx tsc --init
config
{
"extends": "@tsconfig/node-lts/tsconfig.json",
"compilerOptions": {
"rootDir": ".",
"outDir": "./dist",

    "target": "ES2022",

    "module": "NodeNext",
    "moduleResolution": "NodeNext",

    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "forceConsistentCasingInFileNames": true,
    "isolatedModules": true,

    "skipLibCheck": true

},
"include": ["src/**/*.ts", "tests/**/*.ts"],
"exclude": ["node_modules", "dist"]
}

step4 --> npm install --save-dev jest ts-jest @types/jest
step5 --> npm init jest@latest

jest.config.cjs
/\*_ @type {import('jest').Config} _/
module.exports = {
preset: "ts-jest",

testEnvironment: "node",
roots: ["<rootDir>/tests"],
transform: {
"^.+\\.ts$": "ts-jest",
  },
  clearMocks: true,
  collectCoverage: true,
  coverageDirectory: "coverage",
  coverageProvider: "v8",
  testRegex: ["/tests/.*\\.(test|spec)?\\.(ts)$"],
moduleFileExtensions: ["ts", "js", "json", "node"],
};

in package json
"scripts": {

    "test": "jest",
    "test-watch": "jest --watchAll"

},

add this two

step6 --> npm init @eslint/config@latest
step7 --> npm install -D jiti
step8 --> npm install --save-dev eslint-plugin-jest




now main backend package setup
npm install express mongoose cors
npm install -D @types/express @types/cors @types/node
