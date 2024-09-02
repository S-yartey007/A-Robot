const roads = [
    "Alice's House-Bob's House",   "Alice's House-Cabin",
    "Alice's House-Post Office",   "Bob's House-Town Hall",
    "Daria's House-Ernie's House", "Daria's House-Town Hall",
    "Ernie's House-Grete's House", "Grete's House-Farm",
    "Grete's House-Shop",          "Marketplace-Farm",
    "Marketplace-Post Office",     "Marketplace-Shop",
    "Marketplace-Town Hall",       "Shop-Town Hall"
  ];

  function buildGraph(edges) {
    //create graph object with null prototype
    //create addEdge function with parameters from , to
    //So that if from location/node is in graph push the to location/node to the from property of graph
    //esle assign to location array to the from property
    //for every [from,to] for edges addEdge(from,to)and addEdge(to,from)
    //return graph


    const graph = Object.create(null);
    function addEdge(from,to) {
        if(from in graph) {
            graph[from].push(to);
        } else {
            graph[from] = [to]
        }
    }
    for(let [from,to] of edges.map(r => r.split("-"))) {
        addEdge(from,to);
        addEdge(to,from);

    }
    return graph;

  }
  class VillageState {
    //this is the villageState
    //it has properties place - the current robot location, parcels-collection of objects with props place(parcel location) and destination(parcel destination);
    constructor(place,parcels) {
        this.place = place;
        this.parcels = parcels;
    }
    // the move method that computes a new village state when the robot moves
    //takes destination of the undelivered parcel as a parameter
    //first checks whether current villageobject location includes destination location if no return villageobject.
    //if yes crete a new parcel collection from the parcel parameter using map - if parcel location is not the village location return parcel
    //else return an object containing place prop with destination parameter and address prop with parcel address
    //filter the collection to return a new parcel collection where the parcel location is not parcel address
    //return the new villageState with the destinatin and parcels arguments
    move(destinatin) {
        if(!roadGraph[this.place].includes(destinatin)) return this;
        else {
            let parcel = this.parcels.map(p => {
                if(p.place != this.place) return p;
                else {
                    return {place: destinatin,address: p.address}
                }
            }).filter(p => p.place !== p.address)
            return new VillageState(destinatin,parcel)

        }
    }

  }
  //What is the going to run the robot
  //this is a function,called runRobot that takes parameters - state(object),robot(function),memory
  //it runs a loop with parameters turn =0, checks nothing , increments one
  //loop body checks if the state parcels prop length is zero - if yes print something with turn and break;
  // initialise action binding with robot function with takes arguments state and memory
  // set the state to state.move with argument action.direction
  // set memory to action.memory
  // then print the someting with action.direction
  //end of the loop
 function runRobot(state, robot, memory) {
    for(let turn = 0;; turn++) {
        if(state.parcels.length == 0) {
            console.log(state.parcels)
            console.log(`took ${turn} turns`);
            break;
        }
        let action = robot(state,memory);
        state = state.move(action.direction);
        memory - action.memory;
        console.log(`to ${action.direction} direction`)
    }
 }

 //create a function that takes array as a parameter
 //initialises a choice binding with the floor of the random number multiplied by the array length
 //return element at index choice
  function randomPick(array) {
    let choice = Math.floor(Math.random() * array.length)
    return array[choice]
  }

  //create randomRobot function that takes state parameter
  // returns an object with properties direction with value randomPick with argument roadGraph[state.place]
  function randomRobot(state) {
    return {direction: randomPick(roadGraph[state.place])}
  }
  
   
  const roadGraph = buildGraph(roads);
// create some new VillageState with parcels
// use the static method to assign a function of parameter parcelCount
// first initiatise a empty array parcels
// loop over the parcel count 
// in the loop body initialise address binding with randomPic(Object.keys(roadGraph))
// use a the do while to make sure th place the random place is not equal to the address
// add the object with props place and address to parcels
// return the new villageState with argument "post office" and parcels
VillageState.random = function(parcelCount = 5) {
    let parcels = [];
    let place;
    for(let i = 0; i < parcelCount; i++) {
        let address = randomPick(Object.keys(roadGraph))
        do {
            place = randomPick(Object.keys(roadGraph));
        } 
        while (address == place)
        parcels.push({place,address})
    }
    return new VillageState("Post Office",parcels)
}
runRobot(VillageState.random(),randomRobot)