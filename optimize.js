const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminWebp = require("imagemin-webp");
const imageminSvgo = require('imagemin-svgo');
const {extendDefaultPlugins} = require('svgo');

let path = process.argv.slice(2)[0];
path = !!path ? path : "images/";
if (path.substr(-1) != "/") path += "/";

destinationPath = path + "/optimized/";

function optimizeFiles(extension, imageminPlugin) {
  (async () => {
    const imagemin = (await import("imagemin")).default;
    const files = await imagemin([path + extension], {
      destination: destinationPath,
      plugins: [imageminPlugin],
    });
    console.log(extension + ":");
    console.log(files);
  })();
}

optimizeFiles("*.{jpg,jpeg}", imageminMozjpeg({ quality: 90, progressive: true }));
// optimizeFiles("*.{jpg,jpeg}", imageminWebp({ quality: 80, method: 6 }));
optimizeFiles("*.png", imageminPngquant());
optimizeFiles("*.gif", imageminGifsicle());
optimizeFiles("*.webp", imageminWebp({ quality: 80, method: 6 }));
optimizeFiles("*.svg", imageminSvgo({
  plugins: extendDefaultPlugins([
    { name: "removeUnknownsAndDefaults", active: false },
    { name: "removeRasterImages", active: true },
    { name: "cleanupIDs", force: true },
  ]),
}));
