const imageminMozjpeg = require("imagemin-mozjpeg");
const imageminPngquant = require("imagemin-pngquant");
const imageminGifsicle = require("imagemin-gifsicle");
const imageminWebp = require("imagemin-webp");
const imageminSvgo = require("imagemin-svgo");

function optimizeFiles(extension, imageminPlugin) {
  let path = process.argv.slice(2)[0];
  path = !!path ? path : "images/";
  if (path.substr(-1) != "/") path += "/";

  destinationPath = path + "/optimized/";

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
optimizeFiles(
  "*.svg",
  imageminSvgo({
    plugins: [
      {
        name: "preset-default",
        params: {
          overrides: {
            cleanupIDs: {
              force: true,
            },
          },
        },
      },
    ],
  })
);
