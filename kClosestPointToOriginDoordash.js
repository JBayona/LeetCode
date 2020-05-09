
// # Prompt
// # Given a restaurant geolocation ( longitude / latitude). Find at most 3 closest drivers near the restaurant who can be assigned for delivery.

// # Input
// # Restaurant Coordinates -> [x,y] GetDashers() - >returns a list of dasher objects. Each dasher object has 3 properties. 1. Dasher id 2. Last location [x,y] 3. Rating (0 - 100) higher the better.

// # Assumptions
// # GetDashers() when called will give you a list of all active dashers.
// # Use any distance function you want. Preferably euclidean distance / manhattan distance function. In case of a tie, use dasher rating as tie breaker.

// # dashers = [
// #  # (id, x, y, rating)
// #  (1, 1.1, 2.2, 77),
// #  (2, 1.1, 2.2, 78),
// #  (3, 1.1, 2.1, 70),
// # ]

// # output = [3, 2, 1]

// # restaurant = [0, 0]  # [x, y]


// Time O(N Log N)
// Space O(N)
const findClosestDrivers = function(dashers, origin) {
    if(!dashers.length) {
        return [];
    }
    
    let array = [];
    
    for(let i = 0; i < dashers.length; i++) {
        let driverInfo = dashers[i];
        let points = [driverInfo[1], driverInfo[2]];
        array.push({
            coordinate: points,
            distance: getEuclideanDistance(points, origin),
            rating: driverInfo[3],
            id: driverInfo[0],
        });
    }
    
    // Custom sort
    array.sort((a,b) => {
        return a.distance === b.distance ? b.rating - a.rating : a.distance - b.distance
    });
    
    // if(array.length < 3) {
    //     return array;
    // }
    
    // Formar the result
    let result = [];
    for(let i = 0; i < 3; i++) {
        if(array[i]) {
            result.push(array[i].id);   
        }
    }
    return result;
}

function getEuclideanDistance(a,b) {
    return Math.sqrt(Math.pow(a[0]- b[0], 2) + Math.pow(a[1] - b[1], 2));
}


dashers = [
// #  # (id, x, y, rating)
[1, -1.1, -2.2, 77],
[2, 1.1, 2.2, 78],
[3, 1.1, 6.1, 70],
[4, 0, 0, 60],
[5, 0.3, 1.1, 88],
[6, 0.1, 1.1, 99],
]

// dashers = [
// // #  # (id, x, y, rating)
// [1, 1.1, 2.2, 77],
// [2, 1.1, 2.2, 78],
// // [3, 1.1, 6.1, 70],
// // [4, 0, 0, 60]
// ]

// # output = [3, 2, 1]

// restaurant = [0, 0];
restaurant = [-1, 2];
console.log(findClosestDrivers(dashers, restaurant));
