[npm-image]: https://img.shields.io/npm/v/parse5-utilities.svg?style=flat-square
[npm-url]: https://npmjs.org/package/parse5-utilities
[downloads-image]: http://img.shields.io/npm/dm/parse5-utilities.svg?style=flat-square
[downloads-url]: https://npmjs.org/package/parse5-utilities
[ci-image]: https://github.com/cezaraugusto/parse5-utilities/actions/workflows/ci.yml/badge.svg
[ci-url]: https://github.com/cezaraugusto/parse5-utilities/actions/workflows/ci.yml

[![NPM version][npm-image]][npm-url]
[![Downloads][downloads-image]][downloads-url]
[![CI][ci-image]][ci-url]

# parse5-utilities

Low-level parse5 node manipulation utilities.

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

## License

MIT License

Copyright (c) 2014 Jonathan Ong <me@jongleberry.com>
Copyright (c) 2025 Cezar Augusto <boss@cezaraugusto.net>
