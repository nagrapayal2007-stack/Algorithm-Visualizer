let array = [];

let comparisons = 0;
let swaps = 0;

let isSorting = false;
let isPaused = false;

let speed = 500;


/* Elements */

const container =
    document.getElementById("array-container");

const sizeSlider =
    document.getElementById("arraySize");

const speedSlider =
    document.getElementById("speed");

const sizeValue =
    document.getElementById("sizeValue");

const speedValue =
    document.getElementById("speedValue");

const comparisonsDisplay =
    document.getElementById("comparisons");

const swapsDisplay =
    document.getElementById("swaps");

const status =
    document.getElementById("status");

const generateBtn =
    document.getElementById("generateBtn");

const startBtn =
    document.getElementById("startBtn");

const resetBtn =
    document.getElementById("resetBtn");


/* Generate Array */

function generateArray() {

    array = [];

    const size =
        Number(sizeSlider.value);

    for (let i = 0; i < size; i++) {

        const value =
            Math.floor(Math.random() * 250) + 30;

        array.push(value);
    }

    comparisons = 0;
    swaps = 0;

    updateStats();

    status.innerText =
        "Ready to sort";

    displayArray();
}


/* Display Array */

function displayArray(
    highlight1 = -1,
    highlight2 = -1
) {

    container.innerHTML = "";

    array.forEach((value, index) => {

        const bar =
            document.createElement("div");

        bar.classList.add("bar");

        bar.style.height =
            value + "px";

        if (
            index === highlight1 ||
            index === highlight2
        ) {

            bar.classList.add("comparing");
        }

        container.appendChild(bar);
    });
}


/* Update Statistics */

function updateStats() {

    comparisonsDisplay.innerText =
        comparisons;

    swapsDisplay.innerText =
        swaps;
}


/* Sleep */

function sleep(ms) {

    return new Promise(resolve =>
        setTimeout(resolve, ms)
    );
}


/* Bubble Sort */

async function bubbleSort() {

    isSorting = true;

    startBtn.disabled = true;

    generateBtn.disabled = true;

    sizeSlider.disabled = true;


    status.innerText =
        "Sorting in progress...";


    for (
        let i = 0;
        i < array.length;
        i++
    ) {

        for (
            let j = 0;
            j < array.length - i - 1;
            j++
        ) {

            comparisons++;

            updateStats();

            displayArray(j, j + 1);

            await sleep(speed);


            if (
                array[j] >
                array[j + 1]
            ) {

                const temp =
                    array[j];

                array[j] =
                    array[j + 1];

                array[j + 1] =
                    temp;

                swaps++;

                updateStats();

                displayArray(
                    j,
                    j + 1
                );

                await sleep(speed);
            }
        }
    }


    displayArray();

    const bars =
        document.querySelectorAll(".bar");


    bars.forEach(bar => {

        bar.classList.add("sorted");

    });


    status.innerText =
        "✓ Array sorted successfully";

    isSorting = false;

    startBtn.disabled = false;

    generateBtn.disabled = false;

    sizeSlider.disabled = false;
}


/* Speed */

speedSlider.addEventListener(
    "input",
    () => {

        speed =
            Number(speedSlider.value);

        if (speed >= 700) {

            speedValue.innerText =
                "Slow";

        } else if (speed >= 350) {

            speedValue.innerText =
                "Medium";

        } else {

            speedValue.innerText =
                "Fast";
        }
    }
);


/* Array Size */

sizeSlider.addEventListener(
    "input",
    () => {

        sizeValue.innerText =
            sizeSlider.value;

        if (!isSorting) {

            generateArray();
        }
    }
);


/* Buttons */

generateBtn.addEventListener(
    "click",
    generateArray
);


startBtn.addEventListener(
    "click",
    () => {

        if (!isSorting) {

            bubbleSort();
        }
    }
);


resetBtn.addEventListener(
    "click",
    () => {

        isSorting = false;

        generateArray();

        status.innerText =
            "Array reset";
    }
);


/* Initial Array */

generateArray();