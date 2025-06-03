import { describe, it, expect } from 'vitest';
import {
  parse,
  createFragment,
  attributesOf,
  toAttrs,
  setAttribute,
  getAttribute,
  removeAttribute,
  createNode,
  createTextNode,
  prepend,
  append,
  replace,
  remove,
  textOf,
  setText,
  flatten,
  stringify,
} from '../src';
import type { DefaultTreeAdapterTypes } from 'parse5';

describe('.parse(html, smart)', () => {
  it('should return a document if not smart', () => {
    const node = parse('<div></div>');
    expect(node.nodeName).toBe('#document');
  });

  it('should return a fragment if smart', () => {
    const node = parse('<div></div>', true);
    expect(node.nodeName).toBe('#document-fragment');
  });
});

describe('.attributesOf(node)', () => {
  it('should return all the attributes', () => {
    const node = createFragment(
      '<script type="text/javascript" src="file.js" async defer="defer"></script>',
    ).childNodes[0] as DefaultTreeAdapterTypes.Element;
    const attrs = attributesOf(node);
    expect(attrs.type).toBe('text/javascript');
    expect(attrs.src).toBe('file.js');
    expect('async' in attrs).toBe(true);
    expect('defer' in attrs).toBe(true);
  });
});

describe('.toAttrs(obj)', () => {
  it('should return an array of attributes', () => {
    const frag = createFragment('<link rel="stylesheet">');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    node.attrs = toAttrs({
      rel: 'stylesheet',
      href: 'file.css',
    });
    expect(stringify(frag)).toBe('<link rel="stylesheet" href="file.css">');
  });
});

describe('.setAttribute(node, name, value)', () => {
  it('should change an attribute', () => {
    const frag = createFragment('<link rel="stylesheet">');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    setAttribute(node, 'rel', 'import');
    expect(stringify(frag)).toBe('<link rel="import">');
  });

  it('should add an attribute', () => {
    const frag = createFragment('<link rel="stylesheet">');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    setAttribute(node, 'href', 'file.css');
    expect(stringify(frag)).toBe('<link rel="stylesheet" href="file.css">');
  });
});

describe('.getAttribute(node, name)', () => {
  it('should get the attribute', () => {
    const frag = createFragment('<link rel="stylesheet">');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    expect(getAttribute(node, 'rel')).toBe('stylesheet');
  });
});

describe('.removeAttribute(node, name)', () => {
  it('should remove the attribute', () => {
    const frag = createFragment('<link rel="stylesheet">');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    removeAttribute(node, 'rel');
    expect(stringify(frag)).toBe('<link>');
  });
});

describe('.createNode(tagName)', () => {
  it('should create a node', () => {
    const frag = createFragment('');
    frag.childNodes.push(createNode('div'));
    expect(stringify(frag)).toBe('<div></div>');
  });
});

describe('.createTextNode(text)', () => {
  it('should create a text node', () => {
    const frag = createFragment('<div></div>');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    node.childNodes.push(createTextNode('lol'));
    expect(stringify(frag)).toBe('<div>lol</div>');
  });
});

describe('.prepend(parent, node)', () => {
  it('should prepend a node', () => {
    const frag = createFragment('<div><a></a></div>');
    const parent = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    prepend(parent, createNode('br'));
    expect(stringify(frag)).toBe('<div><br><a></a></div>');
  });
});

describe('.append(parent, node)', () => {
  it('should append a node', () => {
    const frag = createFragment('<div><a></a></div>');
    const parent = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    append(parent, createNode('br'));
    expect(stringify(frag)).toBe('<div><a></a><br></div>');
  });
});

describe('.replace(original, node)', () => {
  it('should replace a node', () => {
    const frag = createFragment('<script></script>');
    const script = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    const text = createTextNode('a && b');
    script.childNodes = [text];
    expect(stringify(frag)).toBe('<script>a &amp;&amp; b</script>');
  });
});

describe('.remove(node)', () => {
  it('should remove a node', () => {
    const frag = createFragment('<div><a></a></div>');
    remove(frag.childNodes[0]);
    expect(stringify(frag)).toBe('');
  });
});

describe('.textOf(node)', () => {
  it('should return the text of the node', () => {
    const frag = createFragment('<div>haha</div>');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    expect(textOf(node)).toBe('haha');
  });
});

describe('.setText(node)', () => {
  it('should set the text of the node', () => {
    const frag = createFragment('<div>1</div>');
    const node = frag.childNodes[0] as DefaultTreeAdapterTypes.Element;
    setText(node, 'lol');
    expect(stringify(frag)).toBe('<div>lol</div>');
  });
});

describe('.flatten()', () => {
  it("should flatten the node's descendants", () => {
    const ast = createFragment(
      '<div><div><div><a id="1"></a><a id="2"></a></div></div></div>',
    );
    const nodes = flatten(ast);
    expect(nodes.length).toBe(6);
    expect(
      nodes.some(
        (node) =>
          attributesOf(node as DefaultTreeAdapterTypes.Element).id === '1',
      ),
    ).toBe(true);
    expect(
      nodes.some(
        (node) =>
          attributesOf(node as DefaultTreeAdapterTypes.Element).id === '2',
      ),
    ).toBe(true);
    expect(
      nodes.filter(
        (node) => (node as DefaultTreeAdapterTypes.Element).tagName === 'a',
      ).length,
    ).toBe(2);
  });
});
