
/* ================================
   GENERAL
================================ */


let array = [];

let comparisons = 0;
let swaps = 0;

let sorting = false;


/* ================================
   GENERATE RANDOM ARRAY
================================ */

function generateArray() {

    if (sorting) return;

    array = [];

    for (let i = 0; i < 15; i++) {

        let randomNumber =
            Math.floor(Math.random() * 250) + 40;

        array.push(randomNumber);
    }

    comparisons = 0;
    swaps = 0;

    document.getElementById("comparisons").innerText =
        comparisons;

    document.getElementById("swaps").innerText =
        swaps;

    displayArray();
}


/* ================================
   DISPLAY ARRAY
================================ */

function displayArray() {

    let container =
        document.getElementById("array-container");

    container.innerHTML = "";

    for (let i = 0; i < array.length; i++) {

        let bar =
            document.createElement("div");

        bar.classList.add("bar");

        bar.style.height =
            array[i] + "px";

        container.appendChild(bar);
    }
}


/* ================================
   BUBBLE SORT
================================ */

async function startSorting() {

    if (sorting) return;

    sorting = true;

    let bars =
        document.querySelectorAll(".bar");


    for (let i = 0; i < array.length; i++) {

        for (
            let j = 0;
            j < array.length - i - 1;
            j++
        ) {

            bars =
                document.querySelectorAll(".bar");


            /* Highlight comparison */

            bars[j].style.background =
                "linear-gradient(to top, #ffb300, #ffe600)";

            bars[j + 1].style.background =
                "linear-gradient(to top, #ffb300, #ffe600)";


            comparisons++;

            document.getElementById(
                "comparisons"
            ).innerText = comparisons;


            await sleep(350);


            /* Check for swap */

            if (array[j] > array[j + 1]) {

                /* Red during swap */

                bars[j].style.background =
                    "linear-gradient(to top, #ff1744, #ff5252)";

                bars[j + 1].style.background =
                    "linear-gradient(to top, #ff1744, #ff5252)";


                await sleep(200);


                let temp = array[j];

                array[j] = array[j + 1];

                array[j + 1] = temp;


                swaps++;

                document.getElementById(
                    "swaps"
                ).innerText = swaps;


                displayArray();

                await sleep(250);
            }


            displayArray();
        }


        /* Last sorted element becomes green */

        bars =
            document.querySelectorAll(".bar");

        if (bars.length > 0) {

            bars[array.length - i - 1].style.background =
                "linear-gradient(to top, #00c853, #69f0ae)";
        }
    }


    /* Make every bar green */

    bars =
        document.querySelectorAll(".bar");

    bars.forEach(bar => {

        bar.style.background =
            "linear-gradient(to top, #00c853, #69f0ae)";

    });


    sorting = false;
}


/* ================================
   DELAY FUNCTION
================================ */

function sleep(milliseconds) {

    return new Promise(resolve => {

        setTimeout(resolve, milliseconds);

    });
}


/* ================================
   INITIAL ARRAY
================================ */

generateArray();
