// ==========================================
// LAUNCHPAD
// Space Mission Priority Engine
// Bubble Sort Visualizer
// ==========================================


// Mission Tasks
const missionTasks = [
    {
        name: "Oxygen",
        icon: "🫁"
    },

    {
        name: "Communication",
        icon: "📡"
    },

    {
        name: "Navigation",
        icon: "🧭"
    },

    {
        name: "Power",
        icon: "⚡"
    },

    {
        name: "Food",
        icon: "🍱"
    },

    {
        name: "Research",
        icon: "🔬"
    },

    {
        name: "Satellite",
        icon: "🛰"
    },

    {
        name: "Life Support",
        icon: "❤️"
    },

    {
        name: "Data",
        icon: "💾"
    },

    {
        name: "Engine",
        icon: "🚀"
    },

    {
        name: "Radar",
        icon: "📶"
    },

    {
        name: "Weather",
        icon: "🌤"
    },

    {
        name: "Docking",
        icon: "🔗"
    },

    {
        name: "Security",
        icon: "🛡"
    },

    {
        name: "Fuel",
        icon: "⛽"
    }
];


// Variables
let missionArray = [];

let isSorting = false;

let comparisons = 0;

let swaps = 0;


// Elements
const arrayContainer =
    document.getElementById("arrayContainer");

const comparisonsElement =
    document.getElementById("comparisons");

const swapsElement =
    document.getElementById("swaps");

const statusText =
    document.getElementById("statusText");

const sortMessage =
    document.getElementById("sortMessage");

const arraySize =
    document.getElementById("arraySize");

const arraySizeValue =
    document.getElementById("arraySizeValue");

const speed =
    document.getElementById("speed");

const speedValue =
    document.getElementById("speedValue");

const generateBtn =
    document.getElementById("generateBtn");

const startBtn =
    document.getElementById("startBtn");

const resetBtn =
    document.getElementById("resetBtn");

const missionId =
    document.getElementById("missionId");


// ==========================================
// Random Number
// ==========================================

function randomPriority() {

    return Math.floor(
        Math.random() * 91
    ) + 10;

}


// ==========================================
// Generate Mission ID
// ==========================================

function generateMissionId() {

    const number =
        Math.floor(
            Math.random() * 9000
        ) + 1000;

    missionId.textContent =
        "LP-" + number;

}


// ==========================================
// Generate Mission
// ==========================================

function generateMission() {

    if (isSorting) return;


    const size =
        parseInt(arraySize.value);


    missionArray = [];


    // Shuffle task list
    const shuffled =
        [...missionTasks]
            .sort(() => Math.random() - 0.5);


    for (let i = 0; i < size; i++) {

        missionArray.push({

            name: shuffled[i].name,

            icon: shuffled[i].icon,

            priority: randomPriority()

        });

    }


    comparisons = 0;

    swaps = 0;


    updateStats();

    generateMissionId();

    statusText.textContent =
        "Mission Ready";

    sortMessage.textContent =
        "Mission generated. Press Start Sorting.";


    renderArray();

}


// ==========================================
// Render Bars
// ==========================================

function renderArray(
    compareA = -1,
    compareB = -1,
    sortedFrom = missionArray.length
) {

    arrayContainer.innerHTML = "";


    missionArray.forEach(
        (task, index) => {

            const bar =
                document.createElement("div");


            bar.classList.add("bar");


            if (index >= sortedFrom) {

                bar.classList.add("sorted");

            }


            if (
                index === compareA ||
                index === compareB
            ) {

                bar.classList.add("compare");

            }


            // Height
            bar.style.height =
                `${task.priority * 2.3}px`;


            // Priority
            const value =
                document.createElement("div");

            value.className =
                "bar-value";

            value.textContent =
                task.priority;


            // Task name
            const name =
                document.createElement("div");

            name.className =
                "bar-name";

            name.textContent =
                `${task.icon} ${task.name}`;


            bar.appendChild(value);

            bar.appendChild(name);


            arrayContainer.appendChild(bar);

        }
    );

}


// ==========================================
// Statistics
// ==========================================

function updateStats() {

    comparisonsElement.textContent =
        comparisons;

    swapsElement.textContent =
        swaps;

}


// ==========================================
// Speed
// ==========================================

function getSpeed() {

    const value =
        parseInt(speed.value);


    if (value === 1) {

        return 800;

    }


    if (value === 2) {

        return 350;

    }


    return 100;

}


// ==========================================
// Speed Label
// ==========================================

function updateSpeedLabel() {

    const value =
        parseInt(speed.value);


    if (value === 1) {

        speedValue.textContent =
            "Slow";

    } else if (value === 2) {

        speedValue.textContent =
            "Medium";

    } else {

        speedValue.textContent =
            "Fast";

    }

}


// ==========================================
// Sleep
// ==========================================

function sleep(ms) {

    return new Promise(
        resolve => setTimeout(
            resolve,
            ms
        )
    );

}


// ==========================================
// Bubble Sort
// ==========================================

async function bubbleSort() {

    if (isSorting) return;


    if (missionArray.length === 0) {

        generateMission();

    }


    isSorting = true;


    generateBtn.disabled = true;

    arraySize.disabled = true;

    startBtn.disabled = true;


    statusText.textContent =
        "Sorting Mission Tasks...";


    sortMessage.textContent =
        "Bubble Sort is comparing mission priorities.";


    const n =
        missionArray.length;


    // Bubble Sort
    for (
        let i = 0;
        i < n - 1;
        i++
    ) {

        let swapped =
            false;


        for (
            let j = 0;
            j < n - i - 1;
            j++
        ) {

            comparisons++;

            updateStats();


            renderArray(
                j,
                j + 1,
                n - i
            );


            sortMessage.textContent =
                `Comparing ${missionArray[j].name} (${missionArray[j].priority}) with ${missionArray[j + 1].name} (${missionArray[j + 1].priority})`;


            await sleep(
                getSpeed()
            );


            // Highest priority first
            if (
                missionArray[j].priority <
                missionArray[j + 1].priority
            ) {

                const temp =
                    missionArray[j];

                missionArray[j] =
                    missionArray[j + 1];

                missionArray[j + 1] =
                    temp;


                swaps++;

                swapped = true;


                updateStats();


                renderArray(
                    j,
                    j + 1,
                    n - i
                );


                sortMessage.textContent =
                    "Priority swap executed.";


                await sleep(
                    getSpeed()
                );

            }

        }


        // If no swaps, array is sorted
        if (!swapped) {

            break;

        }

    }


    renderArray(
        -1,
        -1,
        0
    );


    statusText.textContent =
        "Mission Priorities Optimized";

    sortMessage.textContent =
        "Mission queue successfully prioritized.";


    isSorting = false;


    generateBtn.disabled = false;

    arraySize.disabled = false;

    startBtn.disabled = false;

}


// ==========================================
// Reset
// ==========================================

function resetMission() {

    if (isSorting) return;


    missionArray = [];

    comparisons = 0;

    swaps = 0;


    updateStats();


    arrayContainer.innerHTML = "";


    statusText.textContent =
        "Awaiting Mission";


    sortMessage.textContent =
        "Generate a mission to begin.";


    missionId.textContent =
        "LP-0000";

}


// ==========================================
// Array Size
// ==========================================

arraySize.addEventListener(
    "input",
    () => {

        arraySizeValue.textContent =
            arraySize.value;

    }
);


// ==========================================
// Speed
// ==========================================

speed.addEventListener(
    "input",
    updateSpeedLabel
);


// ==========================================
// Buttons
// ==========================================

generateBtn.addEventListener(
    "click",
    generateMission
);


startBtn.addEventListener(
    "click",
    bubbleSort
);


resetBtn.addEventListener(
    "click",
    resetMission
);


// ==========================================
// Initial Setup
// ==========================================

arraySizeValue.textContent =
    arraySize.value;

updateSpeedLabel();

generateMission();