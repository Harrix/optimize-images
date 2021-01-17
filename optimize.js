const imagemin = require("imagemin");
const mozjpeg = require("imagemin-mozjpeg");
const pngquant = require("imagemin-pngquant");
const giflossy = require("imagemin-giflossy");
const svgo = require("imagemin-svgo");
const webp = require("imagemin-webp");

(async () => {
  let path = process.argv.slice(2)[0];
  path = !!path ? path : "images/";
  if (path.substr(-1) != "/") path += "/";

  destinationPath = path + "/optimized/";

  const files = await imagemin([path + "*.{jpg,jpeg,png,gif,svg,webp}"], {
    destination: destinationPath,
    plugins: [
      mozjpeg({ quality: 90, progressive: true }),
      pngquant(),
      giflossy(),
      svgo({
        plugins: [{ removeUnknownsAndDefaults: false }, { removeRasterImages: true }, { cleanupIDs: { force: true } }],
      }),
      //webp({ quality: 95 }),
    ],
  });

  console.log(files);
})();
