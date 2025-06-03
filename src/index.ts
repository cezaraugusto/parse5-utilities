import { parse as parse5Parse, parseFragment, serialize } from 'parse5';
import type { DefaultTreeAdapterTypes } from 'parse5';

export interface Attribute {
  name: string;
  value: string;
}

export type ParsedNode = DefaultTreeAdapterTypes.Node;

const isTextNode = (
  node: ParsedNode,
): node is DefaultTreeAdapterTypes.TextNode => {
  return node.nodeName === '#text';
};

const isParentNode = (
  node: ParsedNode,
): node is DefaultTreeAdapterTypes.ParentNode => {
  return 'childNodes' in node;
};

const isElementNode = (
  node: ParsedNode,
): node is DefaultTreeAdapterTypes.Element => {
  return 'tagName' in node;
};

// Constants
const NAMESPACE_URI = 'http://www.w3.org/1999/xhtml';

/**
 * Parses HTML string into a document or fragment
 * @param string - HTML string to parse
 * @param smart - If true, automatically detects if input is a document or fragment
 * @returns Parsed document or fragment
 */
export const parse = (
  string: string,
  smart = false,
):
  | DefaultTreeAdapterTypes.Document
  | DefaultTreeAdapterTypes.DocumentFragment => {
  if (smart && !isDocument(string)) {
    return parseFragment(string);
  }
  return parse5Parse(string);
};

/**
 * Creates a document fragment from HTML string
 * @param string - HTML string to parse
 * @returns Document fragment
 */
export const createFragment = (
  string: string,
): DefaultTreeAdapterTypes.DocumentFragment => {
  return parseFragment(string);
};

/**
 * Serializes a node back to HTML string
 * @param node - Node to serialize
 * @returns HTML string
 */
export const stringify = (node: ParsedNode): string => {
  return serialize(node as DefaultTreeAdapterTypes.ParentNode);
};

/**
 * Converts node attributes to a plain object
 * @param node - Node to extract attributes from
 * @returns Object containing attribute name-value pairs
 */
export const attributesOf = (node: ParsedNode): Record<string, string> => {
  if (!isElementNode(node)) return {};
  const attrs = node.attrs;
  if (!attrs) return {};

  return attrs.reduce(
    (obj, attr) => {
      obj[attr.name] = attr.value;
      return obj;
    },
    {} as Record<string, string>,
  );
};

/**
 * Converts a plain object to an array of attributes
 * @param obj - Object containing attribute name-value pairs
 * @returns Array of attributes
 */
export const toAttrs = (obj: Record<string, string>): Attribute[] => {
  return Object.entries(obj).map(([name, value]) => ({ name, value }));
};

/**
 * Sets an attribute on a node
 * @param node - Node to set attribute on
 * @param key - Attribute name
 * @param value - Attribute value
 * @returns Modified node
 */
export const setAttribute = (
  node: ParsedNode,
  key: string,
  value: string,
): ParsedNode => {
  if (!isElementNode(node)) return node;
  const attrs = (node.attrs = node.attrs || []);
  const existingAttr = attrs.find((attr) => attr.name === key);

  if (existingAttr) {
    existingAttr.value = value;
  } else {
    attrs.push({ name: key, value });
  }

  return node;
};

/**
 * Gets an attribute value from a node
 * @param node - Node to get attribute from
 * @param key - Attribute name
 * @returns Attribute value or undefined
 */
export const getAttribute = (
  node: ParsedNode,
  key: string,
): string | undefined => {
  if (!isElementNode(node)) return undefined;
  return node.attrs?.find((attr) => attr.name === key)?.value;
};

/**
 * Removes an attribute from a node
 * @param node - Node to remove attribute from
 * @param key - Attribute name to remove
 */
export const removeAttribute = (node: ParsedNode, key: string): void => {
  if (!isElementNode(node)) return;
  if (!node.attrs) return;
  node.attrs = node.attrs.filter((attr) => attr.name !== key);
};

/**
 * Creates a new element node
 * @param tagName - Tag name for the new element
 * @returns New element node
 */
export const createNode = (
  tagName: string,
): DefaultTreeAdapterTypes.Element => ({
  nodeName: tagName,
  tagName,
  attrs: [],
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  namespaceURI: NAMESPACE_URI as any,
  childNodes: [],
  parentNode: null,
});

/**
 * Creates a new text node
 * @param text - Text content
 * @returns New text node
 */
export const createTextNode = (
  text: string,
): DefaultTreeAdapterTypes.TextNode => ({
  nodeName: '#text',
  value: text,
  parentNode: null,
});

/**
 * Prepends a node to a parent node
 * @param parent - Parent node
 * @param node - Node to prepend
 * @returns Prepended node
 */
export const prepend = (
  parent: DefaultTreeAdapterTypes.ParentNode,
  node: DefaultTreeAdapterTypes.ChildNode,
): DefaultTreeAdapterTypes.ChildNode => {
  node.parentNode = parent;
  parent.childNodes.unshift(node);
  return node;
};

/**
 * Appends a node to a parent node
 * @param parent - Parent node
 * @param node - Node to append
 * @returns Appended node
 */
export const append = (
  parent: DefaultTreeAdapterTypes.ParentNode,
  node: DefaultTreeAdapterTypes.ChildNode,
): DefaultTreeAdapterTypes.ChildNode => {
  node.parentNode = parent;
  parent.childNodes.push(node);
  return node;
};

/**
 * Replaces a node with another node
 * @param original - Node to replace
 * @param node - New node
 * @returns New node
 */
export const replace = (
  original: DefaultTreeAdapterTypes.ChildNode,
  node: DefaultTreeAdapterTypes.ChildNode,
): DefaultTreeAdapterTypes.ChildNode | undefined => {
  const children = original.parentNode?.childNodes;
  if (!children) return undefined;

  const index = children.indexOf(original);
  if (index === -1) return undefined;

  node.parentNode = original.parentNode;
  children.splice(index, 1, node);
  return node;
};

/**
 * Removes a node from its parent
 * @param node - Node to remove
 * @returns Removed node
 */
export const remove = (
  node: DefaultTreeAdapterTypes.ChildNode,
): DefaultTreeAdapterTypes.ChildNode => {
  const children = node.parentNode?.childNodes;
  if (children) {
    const index = children.indexOf(node);
    if (index !== -1) {
      children.splice(index, 1);
    }
  }
  return node;
};

/**
 * Gets text content of a node
 * @param node - Node to get text from
 * @returns Text content
 * @throws Error if node has multiple children or non-text children
 */
export const textOf = (node: DefaultTreeAdapterTypes.ParentNode): string => {
  const childNodes = node.childNodes;
  if (!childNodes.length) return '';
  if (childNodes.length !== 1) {
    throw new Error('Node must have exactly one child node');
  }
  const child = childNodes[0];
  if (!isTextNode(child)) {
    throw new Error('Child node must be a text node');
  }
  return child.value || '';
};

/**
 * Sets text content of a node
 * @param node - Node to set text on
 * @param text - Text content
 * @returns Modified node
 */
export const setText = (
  node: DefaultTreeAdapterTypes.ParentNode,
  text: string,
): DefaultTreeAdapterTypes.ParentNode => {
  node.childNodes = [];
  append(node, createTextNode(text || ''));
  return node;
};

/**
 * Checks if a string is likely a complete HTML document
 * @param string - String to check
 * @returns True if string appears to be a complete document
 */
export const isDocument = (string: string): boolean => {
  return /^\s*<(!doctype|html|head|body)\b/i.test(string);
};

/**
 * Flattens a node tree into an array
 * @param node - Node or array of nodes to flatten
 * @param arr - Optional array to accumulate results
 * @returns Array of all nodes
 */
export const flatten = (
  node: ParsedNode | ParsedNode[],
  arr: ParsedNode[] = [],
): ParsedNode[] => {
  if (Array.isArray(node)) {
    for (const child of node) {
      arr.push(child);
      flatten(child, arr);
    }
  } else {
    arr.push(node);
    if (isParentNode(node)) {
      for (const child of node.childNodes) {
        flatten(child, arr);
      }
    }
  }

  return arr;
};
