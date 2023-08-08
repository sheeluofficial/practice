1. npm init -y
2. npm i -g typescript
3. tsc -v/ npm list -g
4. npx tsc --init => Create tsconfig file 

```
{
  "compilerOptions": {
    "target": "es5",                  // Set the ECMAScript target version
    "module": "commonjs",             // Specify module code generation
    "outDir": "build",                 // Output directory for compiled files
    "rootDir": "src",                 // Root directory for source files
    "strict": true,                   // Enable strict type checking
    "esModuleInterop": true,         // Enable compatibility with CommonJS modules
    "declaration": true,
    "sourceMap": true
  },
  "include": ["src"],                 // Specify the source files to include in the compilation
  "exclude": ["node_modules"]
}

```
5. In package.json add script 
    "build" : "tsc --watch"
6. Create a file index.ts within src
7. Run npm run build 