
/* Write an algorithm in Javascript that Given a list of NBA players, return the longest name chain possible and the last name of the last player connected
 * A name chain is one where Player A's last name connects to B's first name
 *   Example: Lebron James, James Harden --> Lebron James Harden
 *
 */
/** * INPUT:
 *      String[][] players = {
          {"Lebron", "James"}, // 0
          {"James", "Harden"}, // 1
          {"James", "Worthy"}, 
          {"Kevin", "Durant"},
          {"D'Angelo", "Russell"},
          {"Bill", "Russell"},
          {"Russell", "Westbrook"},
          {"Chris", "Paul"},        
          {"Paul", "George"},    
          {"George", "Hill"},    
          {"Paul", "Pierce"}
        };
 *
 * OUTPUT:
      Chris Paul George Hill
 */

// Time complexity: O(n^2)
// Space complexity: O(n)
function findLongestNameChain(players) {
    const map = {};

    // Build a graph: last name -> list of players with that first name
    for (const player of players) {
        const [first, last] = player;
        if (!(first in map)) {
            map[first] = [];
        }
        map[first].push(player);
    }

    // This is the form of the Graph
    // {
    //     Lebron: [ [ 'Lebron', 'James' ] ],
    //     James: [ [ 'James', 'Harden' ], [ 'James', 'Worthy' ] ],
    //     Kevin: [ [ 'Kevin', 'Durant' ] ],
    //     "D'Angelo": [ [ "D'Angelo", 'Russell' ] ],
    //     Bill: [ [ 'Bill', 'Russell' ] ],
    //     Russell: [ [ 'Russell', 'Westbrook' ] ],
    //     Chris: [ [ 'Chris', 'Paul' ] ],
    //     Paul: [ [ 'Paul', 'George' ], [ 'Paul', 'Pierce' ] ],
    //     George: [ [ 'George', 'Hill' ] ]
    //   }


    let maxChain = [];
    // Try each player as a starting point
    for (const player of players) {
        // Paths for each player
        // Set -> "Lebron James" the first element
        dfs([player], new Set([player.join(" ")]), map, maxChain);
    }

    // Get the first names of all elements in the maxChain array and concatenate them with the last name of the last player in the chain
    const fullName = maxChain.map(p => p[0]).join(" ") + " " + maxChain[maxChain.length - 1][1];
    return fullName;
}

function dfs(path, visited, map, maxChain) {
    const lastPlayer = path[path.length - 1];
    // index 0 = first name, index 1 = last name
    // Connect the last name  with the first name of the next players
    const nextPlayers = map[lastPlayer[1]] || [];

    let extended = false;
    for (const next of nextPlayers) {
        const key = next.join(" ");
        // If not visited
        if (!visited.has(key)) {
            visited.add(key);
            path.push(next);
            dfs(path, visited, map, maxChain);
            // The backtrack is needed to collect the largest set in the path and look for all elements
            // Backtrack
            // Remove the last player from the path
            // Remove the last player from the visited set
            path.pop();
            visited.delete(key);
            extended = true;
        }
    }

    // We should check if the current chain is longer than any we’ve seen before (maxChain).
    // extendes flag let us know that we have been able to extend the path
    if (!extended && path.length > maxChain.length) {
        maxChain.length = 0;
        maxChain.push(...path);
    }
}

// Example input
const players = [
    ["Lebron", "James"],
    ["James", "Harden"],
    ["James", "Worthy"],
    ["Kevin", "Durant"],
    ["D'Angelo", "Russell"],
    ["Bill", "Russell"],
    ["Russell", "Westbrook"],
    ["Chris", "Paul"],
    ["Paul", "George"],
    ["George", "Hill"],
    ["Paul", "Pierce"]
];

console.log(findLongestNameChain(players));
// Output: Chris Paul George Hill
