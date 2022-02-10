
import { html, render } from 'https://unpkg.com/htm/preact/standalone.module.js'

export async function getProjectTree() {
  const response = await fetch('./project/project-structure.xml')
  const xmlStr = await response.text()
  const parser = new DOMParser()
  const doc = parser.parseFromString(xmlStr, "application/xml")
  return createProjectItem(doc.documentElement)
}

// xml.getAttribute(<attribute name>)
// xml.children
// Array.from(xml.children)

function createProjectItem(xml) {
  const root = helper(xml);
  return root;
}

function helper(xmlNode) {
  let node = {};
  node.name = xmlNode.getAttribute('Name');
  let arr = Array.from(xmlNode.children);
  node.children = [];
  for(let child of arr) {
    node.children.push(helper(child));
  }
  return node;
}

export function ProjectTreeView({tree}) {
  
  return html`
  <div class="project-tree">
    <h2>Project Tree</h2>
    <${ProjectItemView} item=${tree}/>
  </div>`
}

function ProjectItemView({item}) {
  if (item.children.length>0) {
    return html`
    <details open>
      <summary>${item.name}</summary>
      ${item.children.map(child => html`<${ProjectItemView} item=${child}/>`)}
    </details>`
  }
  return html`<div class="leaf">${item.name}</div>`
}