/**
 * @fileOverview
 * imagemin https://github.com/imagemin/imagemin
 */
const fs = require('fs');
const path = require('path');
const imagemin = require('imagemin');
const imageminJpegtran = require('imagemin-jpegtran');
const imageminPngquant = require('imagemin-pngquant');

const imagePathResolve = path.join(__dirname, '..', 'assets/images');

/**
 * findDirectory
 * 'assets/img'以下のディレクトリを再帰検索
 * @param {Object} pathInfo ファイル読み込み対象のpath
 * @param {Function} isFindCallBack ディレクトリが見つかった時のコールバック
 */
const findDirectory = (pathInfo, isFindCallBack) => {
  fs.readdir(pathInfo.currentPath, (err, files) => {

    if (err) return;

    files.forEach((file) => {
      const filePath = path.join(pathInfo.currentPath, file);

      if (fs.statSync(filePath).isDirectory()) {
        const directoryName = pathInfo.parentName ? path.join(pathInfo.parentName, file) : file;
        isFindCallBack(directoryName)
        findDirectory({currentPath: filePath, parentName: directoryName}, isFindCallBack);
      }
    });
  });
};

/**
 * taskImageMin
 * findDirectoryで見つかったディレクトリごとにimageminの処理を行う
 * @param {String} filePath 対象ディレクトのパス
 */
const taskImageMin = (filePath) => {
  const input = path.join(imagePathResolve, filePath);
  const output = path.join('public/images', filePath);
  imagemin([`${input}/*.{jpg,png,svg}`], output, {
    plugins: [
      imageminJpegtran(),
      imageminPngquant({quality: '65-80'})
    ]
  }).then(files => {
    console.log(files);
    //=> [{data: <Buffer 89 50 4e …>, path: 'build/images/foo.jpg'}, …]
  });
}

taskImageMin('./'); // 'assets/img'
findDirectory({currentPath: imagePathResolve}, taskImageMin);　//'assets/img'以外
