function getConsole() {
  if (typeof window !== "undefined") {
    return window.console;
  }
  return global.console;
}
const console = getConsole();

function cached(fn) {
  const cache = Object.create(null);
  return function cachedFn(str) {
    const hit = cache[str];
    return hit || (cache[str] = fn(str));
  };
}

const regex = /-(\w)/g;
const camelize = cached((str) =>
  str.replace(regex, (_, c) => (c ? c.toUpperCase() : ""))
);

function removeNode(node) {
  if (node.parentElement !== null) {
    node.parentElement.removeChild(node);
  }
}

function insertNodeAt(fatherNode, node, position) {
  if (
    fatherNode.children.length &&
    (position === 0 || fatherNode.children[position - 1])
  ) {
    const refNode =
      position === 0
        ? fatherNode.children[0]
        : fatherNode.children[position - 1].nextSibling;
    try {
      fatherNode.insertBefore(node, refNode);
    } catch (e) {
      //this was to deal was a bug, when moving more than 2 items from one list to another
      console.warn(e);
      insertNodeAt(fatherNode, node, position + 1);
    }
  } else {
    fatherNode.append(node);
  }
}

export { insertNodeAt, camelize, console, removeNode };
