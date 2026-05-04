const graphWithCycle = {
  "A": ["B"],
  "B": ["C"],
  "C": ["A"] // The Loop!
};

const diamondGraph = {
  "A": ["B", "C"],
  "B": ["D"],
  "C": ["D"],
  "D": []
};

function hasCycle(graph) {
  const visited = new Set(); // Our "ever" stack
  const inStack = new Set(); // Our "now" stack

  function dfs(node) {
    // YOUR LOGIC HERE
    // 1. If inStack has node, return true (Cycle!)
    // This is the cycle detection, right. The implementation is simple now that I know Sets have their method .has(). *IF* the node is inStack -> *Cycle*!
    if (inStack.has(node)) return true;

    // 2. If visited has node, return false (Already fully explored)
    // Very similar implementation
    if (visited.has(node)) return false;

    // 3. Add to inStack
    // Right. This is the "adding the current node to the hot seat" haha. It is the *current* node in the *temoral* Set
    inStack.add(node);

    // 4. For neighbors: if dfs(neighbor) is true, return true
    // Let's stick to the simple forEach. `graph` is what will be either graphWithCycle or diamondGraph, right. So graph[node] are the neighbors
    let neighbors = graph[node];
    // neighbors.forEach(neighbor => {
    //   if (dfs(neighbor)) {
    //     return true;
    //   }
    // });
    // So apparently a forEach betrays us here due to the scope of the return? Let's try with a for...of loop then
    for(neighbor of neighbors) {
      if (dfs(neighbor)) return true; // Yeah, this works.
    }

    // 5. Remove from inStack (Backtrack!)
    inStack.delete(node); // .delete() (thank you Intellisense haha) returns a boolean but this should work?

    // 6. Add to visited
    // *NOW* we add to visited, right
    visited.add(node);

    // 7. Return false
    return false;
    // That should be it. Once again, here's to me not causing Stack Overflow on my computer now that I run `node cycleDetection.js` in my terminal 🥂
  }

  // We loop through all keys in case the graph is "disconnected islands"
  for (let node in graph) {
    if (dfs(node)) return true;
  }
  return false;
}

// console.log(diamondGraph["A"]); // Just to confirm

// We need to add these too haha
console.log(`Running hasCycle on graphWithCycle: ${hasCycle(graphWithCycle)}`);
console.log(`Running hasCycle on diamondGraph: ${hasCycle(diamondGraph)}`);