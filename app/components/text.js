const Text = ({
  content,
  tag = "p",
  color = "black",
  fontSize = "16px",
  fontWeight = "normal",
  classname = "",
}) => {
  const element = document.createElement(tag);

  element.textContent = content;
  element.style.color = color;
  element.style.fontSize = fontSize;
  element.style.fontWeight = fontWeight;

  if (classname) {
    element.className = classname;
  }

  return element;
};

export default Text;
