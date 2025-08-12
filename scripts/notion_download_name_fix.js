// Surge Script: 修改 Notion getTasks 接口中的 exportURL.downloadName
let body = $response.body;

try {
  let obj = JSON.parse(body);

  if (obj.results && Array.isArray(obj.results)) {
    obj.results.forEach(item => {
      if (item.status && typeof item.status.exportURL === "string") {
        let url = item.status.exportURL;
        let match = url.match(/\/([^\/?]+\.pdf)/); // 匹配最后的文件名（保持编码）
        if (match) {
          let fileNameEncoded = match[1];
          url = url.replace(/(downloadName=)[^&]+/, `$1${fileNameEncoded}`);
          item.status.exportURL = url;
        }
      }
    });
  }

  body = JSON.stringify(obj);
} catch (e) {
  console.log("解析 Notion JSON 失败:", e);
}

$done({ body });
