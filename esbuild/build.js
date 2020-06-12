const { build } = require('esbuild');

build({
    stdio: 'inherit',
    entryPoints: ['./main.ts'],
    outfile: './main1.js',
    minify: true,
    bundle: false,
    target: 'es2015'
}).catch(() => process.exit(1))
