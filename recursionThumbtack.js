/*
/**
 * Our SEO ranking has suffered lately, because of several internal URLs that lead to 404 errors (dead links). We have chosen a drastic approach of eliminating any page that contains a dead link, since having a page with dead links has such negative effect that it outweighs the benefit of its content. Removing a page also means that any other pages that link to it has to be removed as well.

To simplify the problem, we have indexed each page with a number from 0..N, and we are passing the sitemap as an array that maps each page to a list of indexes.
We also pass an array of indexes that tells us whether a page is alive or not. We have to return the updated 'alive' array that tells us if a page should be alive or not.

ex: Page 0 links to 1, 2, and 3. Page 1 and 3 link to each other.
Page 2 links to 4 which is a dead page.

alive = [
    0 => true,
    1 => true,
    2 => true,
    3 => true,
    4 => false
];
links = [
    0 => [ 1, 2, 3 ],
    1 => [ 3 ],
    2 => [ 4 ],
    3 => [ 1 ],
    4 => [], // irrelevant since alive[4] = false;
]
In this case, 4 is a dead link, so we would need to remove 2 which links to it.
Removing 2 causes 0 to point to a dead link, so 0 will have to be removed.
As a result, we should return the following array:

return [
    0 => false,
    1 => true,
    2 => false,
    3 => true,
    4 => false,
]
 */

function killDeadPages(alives, links) {
  // Start node
  let seen = new Set();
  dfs(0, alive, links, seen);
  return alive;
}

function dfs(current, alive, links, seen) {
  // Page is dead
  if(!alive[current]) {
      return false;
  }
  for(let neighbor of links[current]) {
      // Oonly those not seen
      if(!seen.has(neighbor)) {
          seen.add(neighbor);
          // Kill the node
          if(!dfs(neighbor, alive, links, seen)) {
              alive[current] = false;
              return false
          }
      }
  }
  return true;
}

let alive = {
0: true,
1: true,
2: true,
3: true,
4: false,
};
let links = [
[1, 2, 3],
[3],
[4],
[1],
[], // irrelevant since alive[4] = false;
];
console.log(killDeadPages(alive, links));