const image = [
  ".png",
  ".jpg",
  ".jpeg",
  ".gif",
  ".bmp",
  ".svg",
  ".webp",
  ".ico",
  ".tiff",
  ".tif",
];

const video = [
  ".mp4",
  ".avi",
  ".mov",
  ".wmv",
  ".flv",
  ".webm",
  ".mkv",
  ".mpeg",
  ".mpg",
  ".m4v",
  ".m2ts",
];

const audio = [
  ".mp3",
  ".wav",
  ".wma",
  ".ogg",
  ".m4a",
  ".aac",
  ".flac",
  ".ape",
  ".mid",
  ".midi",
];

const documents = [
  ".doc",
  ".docx",
  ".xls",
  ".xlsx",
  ".ppt",
  ".pptx",
  ".pdf",
  ".txt",
  ".rtf",
  ".odt",
  ".ods",
  ".odp",
  ".pages",
];

const fileType = (file) => {
  if (image.includes(file.type)) return "image";
  else if (video.includes(file.type)) return "video";
  else if (audio.includes(file.type)) return "audio";
  else if (documents.includes(file.type)) return "document";
  else if (file.type == "folder") return "folder";
  else return "unknown";
};

export { fileType };
