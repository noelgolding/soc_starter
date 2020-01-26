import { LitElement, html, css } from './lit-element.js'

export default class XElement extends LitElement {
  static get namespace() {
    return getNamespace()
  }
  static get tagName() {
    return computeTagName(this)
  }
  static register() {
    register(this)
  }
}

// the prefix should always be lowercase
const PREFIX = 'x'

function computeTagName(classObject) {
  const className = classObject.toString().split('(' || /s+/)[0].split(' ' || /s+/)[1]
  const tagName = [PREFIX]
  tagName.push(computeKebabCaseClassName(className))
  if (classObject.namespace) {
    tagName.unshift(classObject.namespace)
  }
  return tagName.join('-')
}

function getNamespace() {
  // convert the namespace to lowercase
  let namespace = (window.__XELEMENT_NAMESPACE__ || '').toLowerCase()
  if (/^[^a-z]/.test(namespace)) {
    throw ('window.__XELEMENT_NAMESPACE__ must begin with a letter[a-z]')
  }
  if (/[^a-zA-Z0-9-]/.test(namespace)) {
    throw ('window.__XELEMENT_NAMESPACE__ may only contain letters[a-z], numbers[0-9], and hypens[-]')
  }
  return namespace
}

function computeKebabCaseClassName(className) {
  // if className startsWith default prefix, remove it
  if (className.toLowerCase().startsWith(PREFIX)) {
    className = className.substr(PREFIX.length)
  }
  // if there are any runs with multiple caps, assume it is an acronym
  className = className
    // try to fix it at end of name.
    .replace(
      /([A-Z])([A-Z]+)$/,
      (match, $1, $2, offset, string) => `${$1}${$2.toLowerCase()}`
    )
    // try to fix it within the name.
    .replace(
      /([A-Z])([A-Z]+)([A-Z])/g,
      (match, $1, $2, $3, offset, string) => `${$1}${$2.toLowerCase()}${$3}`
    )
  return camelCase2KebabCase(className)
}

function camelCase2KebabCase(s) {
  // convert first letter to lowercase
  s = s.charAt(0).toLowerCase() + s.substr(1)
  // kebab time baby!
  return s.replace(/([a-z0-9]|(?=[A-Z]))([A-Z])/g, '$1-$2').toLowerCase()
}

function register(customElement) {
  if (!window.customElements.get(customElement.tagName)) {
    window.customElements.define(customElement.tagName, customElement)
  }
}

export { XElement, html, css }