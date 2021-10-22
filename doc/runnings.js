exports.header = {
  height: "1cm",
  contents: function (pageNum, numPages) {
    if (pageNum > 1) {
      return (
        "<span style='float:right'>" + (pageNum - 1) + " / " + (numPages - 1) + "</span>"
      );
    }
    else {
      return null;
    }
  },
};
exports.footer = null;
