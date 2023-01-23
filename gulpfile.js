const { watch, series } = require("gulp");
const { exec } = require("child_process");
function md(cb) {
  exec("hexo g&&hexo s");
  cb();
}

exports.default = function () {
  watch("source/_posts/*.md", md);
  watch("*.yml", md);
};
