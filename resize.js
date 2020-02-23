const Jimp = require('jimp');
const glob = require('glob');  // yarn add glob

/**
 * Resizes images in the directory. Only operates on .png, .jpg, and .bmp.
 * @param {string} dirPath - Path to directory. Can be relative or absolute.
 * @param {Object} options
 * @param {int|Jimp.AUTO} [options.width=Jimp.AUTO]
 * @param {int|Jimp.AUTO} [options.height=Jimp.AUTO]
 * @param {boolean} [options.recursive=false] - Whether or not to also resize recursively.
 * @return {Promise}
 */
function resizeDirectoryImages(dirPath, { width = Jimp.AUTO, height = Jimp.AUTO, recursive = false }) {
  return new Promise((resolve, reject) => {
    glob((recursive ? "**/" : "") + "*.@(png|jpg|bmp)", { nocase: true, nodir: true, realpath: true, cwd: dirPath}, (err, files) => {
      if(err) {
        reject(err);
      } else {
        resolve(files);
      }
    });
  }).then(files => {
    return Promise.all(files.map(path => {
      return new Promise((resolve, reject) => {
        return Jimp.read(path).then(image => {
          image
            .resize(width, height)  // You may want to change this.
            .write(path, (err) => {
              if(err) {
                reject(err);
              } else {
                resolve(path);
              }
            });
        })
      }).then(console.log)
    }));
  });
}

resizeDirectoryImages('./images', { height: 2500 })  // Resize all png, jpg, and bmp images in the example directory
  .then(() => {
    console.log('Done!');
  });