export default function parseSAMLUrl(url) {
  const parts = url.split("/");
  // The url starts with a slash
  return {operation: parts[1], idp: parts[2]};
}