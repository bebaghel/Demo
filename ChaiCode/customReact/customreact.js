function customRender(reactElement, container) {
  const domElement = document.createElement(reactElement.type);
  domElement.innerHtml = reactElement.children;
  domElement.setAttribute("href", reactElement.props.href);
  domElement.setAttribute("target", reactElement.props.target);

  container.appendChild(domElement);
}

const reactElement = {
  type: "a",
  props: {
    href: "https://google.com",
    target: "_blanck",
  },
  children: "Click me to visit google",
};

const mainContainer = document.getElementById("root");

customRender(reactElement, mainContainer);
