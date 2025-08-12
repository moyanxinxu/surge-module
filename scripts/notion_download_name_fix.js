// rename-download.js
// 将 URL 中的 downloadName 参数替换成中文名

let url = new URL($request.url);

// 原始值（可能是 URL 编码）
let originalName = url.searchParams.get("downloadName");

// URL 解码
let decodedName = decodeURIComponent(originalName);

// 这里直接替换成中文文件名（改成你需要的）
let newName = "我的文件.pdf";

// 重新编码后写回
url.searchParams.set("downloadName", encodeURIComponent(newName));

// 输出修改后的请求
$done({ url: url.toString() });
