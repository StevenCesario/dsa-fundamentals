const myGraph = {
  "Home": ["Kitchen", "Garden"],
  "Kitchen": ["Pantry"],
  "Pantry": [],
  "Garden": ["Shed"],
  "Shed": ["Kitchen"] // A potential infinite loop!
};

function traverse(startNode) {
  const visited = new Set();
  
  function dfs(node) { // So I assume that a node is a key in myGraph
    // 1. Check if we've been here. If so, return.
    // Right. Return early if the node has already been visited. `visited` is a Set. I'm not too familiar with Set methods but there should be a simple .in() or .includes(), shouldn't there?
    // .has() is the method we're looking for haha! Intelligence coming in clutch
    if (visited.has(node)) return; // Let's keep it one line and stylish
    // Looking at this.. it feels correct. If the current node is in the visited Set.. return early. Yes. 

    // 2. Add node to visited.
    // Right, so here we add the current node to visited. We've made the check that it wasn't already in the Set. Now we add it. .add()?
    visited.add(node); // Yup! 🚀

    // 3. Log the node ("Visiting " + node).
    // Log it. Right. 
    console.log(`Visiting ${node}`); // Just like that? Should work

    // 4. Look at all neighbors of this node in myGraph.
    // Mmmm! Here is where we access the values of the key-value pair!
    let neighbors = myGraph[node]; // Like this, right? I believe so. And let should work, could maybe use `const`

    // 5. Recursively call dfs for each unvisited neighbor.
    // And now we call the dfs function within the definition of the dfs function! IF it's not already in the visited Set
    // Since the steps phrases it like "for each unvisited neighbor", a part of my brain just wanna use .forEach() haha. Could maybe use .map()? Let's just use .forEach() haha
    neighbors.forEach(neighbor => !visited.has(neighbor) && dfs(neighbor)); // This makes intuitive sense.. and I believe it's correct! If and only if the Visited Set does NOT contain the neight, call dfs recursively on the neighbor node
    // Alright. Here's to hoping that my laptop won't experience Stack Overflow when I write `node graph.js` in my terminal now haha!
  }

  dfs(startNode);
}

traverse("Home");