export function generateResponse({ id }) {
  const template = Assets.getText("assets/response.html");
  return template.replace("##ID##", id);
}
