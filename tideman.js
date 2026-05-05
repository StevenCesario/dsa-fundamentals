/**
 * TIDEMAN (RANKED PAIRS) - JAVASCRIPT EDITION
 * Focus: Graph Theory, Cycle Detection, and Adjacency Matrices
 */

// --- Global State ---
let candidates = []; // Array of strings (Candidate names)
let preferences = []; // 2D Array: preferences[i][j] = number of voters who prefer i over j
let locked = [];      // 2D Array (Adjacency Matrix): locked[i][j] = true if i points to j
let pairs = [];       // Array of objects: { winner: index, loser: index, strength: number }

let candidate_count = 0;
let pair_count = 0;

/**
 * 1. VOTE: Update ranks given a new vote.
 * rank: 0 for 1st choice, 1 for 2nd choice, etc.
 * name: name of the candidate being ranked.
 * ranks: the array representing this specific voter's ballot.
 */
function vote(rank, name, ranks) {
    // TODO
    // Right. We have rank, name and ranks as arguments. 
    // This function UPDATES ranks
    // Right. And we get name and rank. Something like "Alice" and 0 if she's someone's first choice
    // Not sure.. I guess the function will be used with an array that is initialized to contain all ranks
    // So...
    // ranks[name] = rank; // This is my first intuitive instinct.
    // // This would be something like ranks["Alice"] = 0. 
    // // And I assume we would run this vote function 3 times for one person to register that persons's ranks.
    // // For person X:
    // // Wait... ranks[name] = rank; this would treat ranks.. like an object, wouldn't it? Not an array?
    // // We could treat ranks like an array of objects?
    // // Update ranks given a new vote. 
    // // But then it would be
    // // It's not append in JS haha, what is the JS Array equivalent of append??
    // // let myArray = new Array;
    // // myArray.push()
    // // It's push, got it haha
    // ranks.push({name: rank}); // Like that? Let's go with this for now

    // return true; // Changed from return false to return true

    // Right. So all the above was completely wrong haha!
    // So we loop over the candidates which is filled in runtime
    for (let i = 0; i < candidate_count; i++) { // Over for (let candidate of candidates) { since the index is important and will be used
      if (candidates[i] === name) { // Candidate name match
        ranks[rank] = i; // Now what does this mean? 
        // Something just clicked in my brain. Ranks is a three-slot array representing a ballot. 
        // And it's NOT candidate:rank, it's the other way around! That's the click! 
        // So a final ballot array is [first choice, second choice, third choice] specifically with the IDs of the candidates!
        // This was the missing puzzle pieces and touches upon what I wrote down here: "Can I just assume that Alice is candidate 0, Bob is 1, and Charlie is 2??? Am I missing something?"
        // I can't assume but we do this matching process: `if (candidates[i] === name) { // Candidate name match`
        // So a final ballot array can look like [2, 0, 1]. This would mean that candidate with ID 2 is first choice, #0 is second choice and #1 is third choice
        return true;
      }
    }

    return false;
}

/**
 * 2. RECORD_PREFERENCES: Update global preferences matrix given one voter's ranks.
 */
function record_preferences(ranks) {
    // TODO
    // So this is purely given how the previous function is implemented. 
    // If we go with my previous implementation that ranks is an array of objects and each object is of the shape {cadidate: rank}..
    // Then this function would be...
    // Preferences is.. a 2D array.. where preferences[i][j] is how many voters prefer i over j
    // Say that we get a ranks array of [{"Alice": 1}, {"Bob": 2}, {"Charlie": 0}]
    // This would update the preferences array to..
    // This 2D dependency array is bending my brain. i and j are numbers between 0 and 2 representing each candidate, no?
    // candidates[2][0] = 4; would mean that 4 people prefer candidate 2 over 0
    // Can I just assume that Alice is candidate 0, Bob is 1, and Charlie is 2??? Am I missing something?
    // This function ONLY takes the ranks array. 16 min left. I need to ask for a nudge.
}

/**
 * 3. ADD_PAIRS: Record pairs of candidates where one is preferred over the other.
 */
function add_pairs() {
    // TODO
}

/**
 * 4. SORT_PAIRS: Sort pairs in decreasing order by strength of victory.
 */
function sort_pairs() {
    // TODO
}

/**
 * 5. LOCK_PAIRS: THE FINAL BOSS.
 * Lock pairs into the candidate graph in order, WITHOUT creating cycles.
 */
function lock_pairs() {
    // TODO
}

/**
 * 6. PRINT_WINNER: Print the name of the candidate who is the source of the graph.
 */
function print_winner() {
    // TODO
}

// --- SIMULATION RUNNER ---
// This mimics the main function in C.
function runElection(candidateNames, ballots) {
    candidates = candidateNames;
    candidate_count = candidates.length;

    // Initialize preferences and locked matrices with zeros/false
    preferences = Array.from({ length: candidate_count }, () => Array(candidate_count).fill(0));
    locked = Array.from({ length: candidate_count }, () => Array(candidate_count).fill(false));

    console.log(`--- Starting Tideman Election with ${candidate_count} candidates ---`);

    // Process Ballots
    ballots.forEach((ballot, voterIndex) => {
        let ranks = new Array(candidate_count);
        ballot.forEach((name, rank) => {
            if (!vote(rank, name, ranks)) {
                console.error(`Invalid vote for voter ${voterIndex} at rank ${rank}`);
            }
        });
        record_preferences(ranks);
    });

    add_pairs();
    sort_pairs();
    lock_pairs();
    print_winner();
}

// --- TEST CASE: The "Cycle" Example from the instructions ---
// Alice beats Bob (7-2), Bob beats Charlie (5-4), Charlie beats Alice (6-3)
const testCandidates = ["Alice", "Bob", "Charlie"];
const testBallots = [
    ["Alice", "Bob", "Charlie"], ["Alice", "Bob", "Charlie"], ["Alice", "Bob", "Charlie"],
    ["Alice", "Bob", "Charlie"], ["Alice", "Bob", "Charlie"], ["Alice", "Bob", "Charlie"],
    ["Alice", "Bob", "Charlie"], // 7 for Alice > Bob
    ["Bob", "Charlie", "Alice"], ["Bob", "Charlie", "Alice"], // 2 for Alice > Bob
    // ... etc. This is just a placeholder to show how to run it.
];

// runElection(testCandidates, testBallots);