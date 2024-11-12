import { DomNode } from "@common-module/app";

export default class LogoutIcon extends DomNode {
  constructor() {
    super(".icon.logout");
    const svgHeight = 22;

    const svg = '<svg fill="currentColor" height="' + svgHeight +
      '" viewBox="0 -960 960 960" xmlns="http://www.w3.org/2000/svg"><path d="M200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h280v80H200v560h280v80H200Zm440-160-55-58 102-102H360v-80h327L585-622l55-58 200 200-200 200Z"/></svg>';
    this.htmlElement.innerHTML = svg;
  }
}