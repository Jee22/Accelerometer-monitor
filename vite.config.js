// vite.config.js
export default {
    // Specify the entry point for your application
    // The entry point is the JavaScript file that Vite will use to build your application
    // You can also specify the entry point in the "index.html" file using a script tag
    // and Vite will automatically detect it
    entry: 'src/main.js',
    

    // Specify the output directory and file name for the production build
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        minify: true,
        sourcemap: false,
    },

    // Configure plugins for Vite
    plugins: [
        // Add plugins here
    ],
};
