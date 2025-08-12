// Surge Script
let body = $response.body;

try {
  let obj = JSON.parse(body);

  // 递归查找 results 数组中的 exportURL
  if (obj.results && Array.isArray(obj.results)) {
    obj.results.forEach(item => {
      if (item.status && item.status.exportURL) {
        let url = item.status.exportURL;

        // 获取 URL 中最后一个 / 后面的原始编码文件名
        let match = url.match(/\/([^\/?]+\.pdf)/);
        if (match) {
          let fileNameEncoded = match[1];

          // 替换 downloadName 参数
          url = url.replace(/(downloadName=)[^&]+/, `$1${fileNameEncoded}`);

          item.status.exportURL = url;
        }
      }
    });
  }

  body = JSON.stringify(obj);
} catch (e) {
  console.log("JSON 解析失败: " + e);
}

$done({ body });
