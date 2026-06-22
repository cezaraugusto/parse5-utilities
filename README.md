[npm-version-image]: https://img.shields.io/npm/v/parse5-utilities.svg?color=0971fe
[npm-version-url]: https://www.npmjs.com/package/parse5-utilities
[npm-downloads-image]: https://img.shields.io/npm/dm/parse5-utilities.svg?color=2ecc40
[npm-downloads-url]: https://www.npmjs.com/package/parse5-utilities
[action-image]: https://github.com/cezaraugusto/parse5-utilities/actions/workflows/ci.yml/badge.svg?branch=main
[action-url]: https://github.com/cezaraugusto/parse5-utilities/actions

> Low-level parse5 node manipulation utilities. ESM-compatible version of parse5-utils.

# parse5-utilities [![Version][npm-version-image]][npm-version-url] [![Downloads][npm-downloads-image]][npm-downloads-url] [![workflow][action-image]][action-url]

Low-level parse5 node manipulation utilities. An ESM-compatible version of parse5-utils.

## Installation

```bash
npm i parse5-utilities
```

```ts
import {parse, stringify} from 'parse5-utilities'

const doc = parse('<p>hello</p>')
const html = stringify(doc)
```

## API

### parse

> Parse an HTML string. If `smart` is true, returns a `document` or `documentFragment` based on the input. Otherwise, always parses it as a document.

```typescript
parse(html: string, smart?: boolean): Document | DocumentFragment
```

### createFragment

> Parses HTML as a fragment.

```typescript
createFragment(html: string): DocumentFragment
```

### stringify

> Converts an AST node into an HTML string.

```typescript
stringify(node: Node): string
```

### attributesOf

> Get the attributes of a node as an object.

```typescript
attributesOf(node: Node): Record<string, string>
```

### setAttribute

> Set an attribute on a node.

```typescript
setAttribute(node: Node, key: string, value: string): Node
```

### getAttribute

> Get an attribute value from a node.

```typescript
getAttribute(node: Node, key: string): string | undefined
```

### removeAttribute

> Remove an attribute from a node.

```typescript
removeAttribute(node: Node, key: string): void
```

### toAttrs

> Convert an object of attributes into an array of attribute objects.

```typescript
toAttrs(attributes: Record<string, string>): Attribute[]
```

### createNode

> Create a new element node with the specified tag name.

```typescript
createNode(tagName: string): Element
```

### createTextNode

> Create a new text node with the specified text content.

```typescript
createTextNode(text: string): TextNode
```

### prepend

> Add a child to a node, making it the first child.

```typescript
prepend(parent: ParentNode, node: ChildNode): ChildNode
```

### append

> Add a child to a node, making it the last child.

```typescript
append(parent: ParentNode, node: ChildNode): ChildNode
```

### replace

> Replace a node with another node.

```typescript
replace(originalNode: ChildNode, newNode: ChildNode): ChildNode | undefined
```

### remove

> Remove a node from its parent.

```typescript
remove(node: ChildNode): ChildNode
```

### flatten

> Get all the nodes in a tree as a flat array.

```typescript
flatten(node: Node | Node[]): Node[]
```

### textOf

> Get the text content of a node. Throws an error if the node has multiple children or non-text children.

```typescript
textOf(node: ParentNode): string
```

### setText

> Set the text content of a node.

```typescript
setText(node: ParentNode, text: string): ParentNode
```

### isDocument

> Check if a string is likely a complete HTML document.

```typescript
isDocument(string: string): boolean
```

## Related projects

* [parse5-asset-patcher](https://github.com/cezaraugusto/parse5-asset-patcher)
* [browser-extension-manifest-fields](https://github.com/cezaraugusto/browser-extension-manifest-fields)
* [browser-extension-capabilities](https://github.com/cezaraugusto/browser-extension-capabilities)
* [browser-extension-compat-data](https://github.com/cezaraugusto/browser-extension-compat-data)
* [extension-from-store](https://github.com/cezaraugusto/extension-from-store)

## License

MIT (c) Cezar Augusto.
