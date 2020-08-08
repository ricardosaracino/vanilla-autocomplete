/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete */

let __inputs = [];

function autocompleteWorkCodes(inputEl, hiddenEl, arr) {

    __inputs.push(inputEl);

    const auto = function (e) {

        let a, b, i,  focusPos = 0, found = false, val = this.value;
        /*close any already open lists of autocompleted values*/
        closeAllLists();

        currentFocus = -1;
        /*create a DIV element that will contain the items (values):*/

        a = document.createElement("DIV");
        a.setAttribute("id", this.id + "autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        /*for each item in the array...*/
        for (i = 0; i < arr.length; i++) {
            /*check if the item starts with the same letters as the text field value:*/

            if (arr[i].WorkCodeName.toUpperCase() === val.toUpperCase()) found = true;

            let pos = arr[i].WorkCodeName.toUpperCase().indexOf(val.toUpperCase());

            if (pos !== -1) {

                focusPos ++;

                /*create a DIV element for each matching element:*/
                b = document.createElement("DIV");

                if (pos === 0) {
                    b.innerHTML += arr[i].WorkCodeName;
                } else {
                    b.innerHTML = arr[i].WorkCodeName.substr(0, pos);
                    /*make the matching letters bold:*/
                    b.innerHTML += "<strong>" + arr[i].WorkCodeName.substr(pos, val.length) + "</strong>";
                    b.innerHTML += arr[i].WorkCodeName.substr(val.length + pos);
                }

                (function () {
                    let workCode = arr[i];
                    let workCodeFocus = focusPos;
                    let autoList = a.getElementsByTagName("div");

                    /*execute a function when someone clicks on the item value (DIV element):*/
                    b.addEventListener("click", function (e) {

                        /*insert the value for the autocomplete text field:*/
                        inputEl.value = workCode.WorkCodeName;

                        hiddenEl.setAttribute("value", workCode.WorkCodeID);

                        /*close the list of autocompleted values,
                        (or any other open lists of autocompleted values:*/
                        closeAllLists();
                    });

                    b.addEventListener("mouseover", function (e) {
                        currentFocus = workCodeFocus;

                        addActive(autoList);
                    });
                })();

                a.appendChild(b);
            }
        }

        if (!found) {
            hiddenEl.setAttribute("value", "");
        }

        if(a.childElementCount) {
            /*append the DIV element as a child of the autocomplete container:*/
            this.parentNode.appendChild(a);
        }
    }

    /*the autocomplete function takes two arguments,
    the text field element and an array of possible autocompleted values:*/
    let currentFocus;

    /*execute a function when someone writes in the text field:*/
    inputEl.addEventListener("input", auto);
    inputEl.addEventListener("focus", auto);

    inputEl.addEventListener("focusout", function (e) {
        if (hiddenEl.value === '') this.value = '';
    });

    /*execute a function presses a key on the keyboard:*/
    inputEl.addEventListener("keydown", function (e) {

        /* tab */
        if (e.keyCode === 9) {
            closeAllLists();
            return;
        }

        let x = document.getElementById(this.id + "autocomplete-list");
        if (x) x = x.getElementsByTagName("div");
        if (e.keyCode === 40) {
            /*If the arrow DOWN key is pressed,
            increase the currentFocus variable:*/
            currentFocus++;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 38) { //up
            /*If the arrow UP key is pressed,
            decrease the currentFocus variable:*/
            currentFocus--;
            /*and and make the current item more visible:*/
            addActive(x);
        } else if (e.keyCode === 13) {
            /*If the ENTER key is pressed, prevent the form from being submitted,*/
            e.preventDefault();
            if (currentFocus > -1) {
                /*and simulate a click on the "active" item:*/
                if (x) x[currentFocus].click();
            }
        }
    });

    function addActive(x) {
        /*a function to classify an item as "active":*/
        if (!x) return false;
        /*start by removing the "active" class on all items:*/
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        /*add class "autocomplete-active":*/
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        /*a function to remove the "active" class from all autocomplete items:*/
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(elmnt) {
        /*close all autocomplete lists in the document,
        except the one passed as an argument:*/
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (elmnt !== x[i] && elmnt !== inputEl) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    /*execute a function when someone clicks in the document:*/
    document.addEventListener("click", function (e) {
        if (!__inputs.includes(e.target)) {
            closeAllLists(e.target);
        }
    });
}
