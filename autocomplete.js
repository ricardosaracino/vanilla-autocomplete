/* https://www.w3schools.com/howto/tryit.asp?filename=tryhow_js_autocomplete */

let __inputs = [];

function autocompleteWorkCodes(inputEl, hiddenEl, arr, valueChangedCb) {

    __inputs.push(inputEl);

    let opened = false;
    let currentFocus = -1;

    const auto = function (e) {

        closeAllLists();

        if (e.type === "input" && e.data === undefined) { // clear search input
            hiddenEl.setAttribute("value", "");
            return;
        }
        if (this.value === "" && e.type === "mousedown") { // toggle with click
            opened = !opened;
            if (opened) {
                return;
            }
        } else {
            opened = true;
        }

        let a, b, i, focusPos = 0, found = false, val = this.value;

        currentFocus = -1;

        a = document.createElement("div");
        a.setAttribute("id", this.id + "-autocomplete-list");
        a.setAttribute("class", "autocomplete-items");

        for (i = 0; i < arr.length; i++) {

            if (arr[i].label.toUpperCase() === val.toUpperCase()) found = true;

            let pos = arr[i].label.toUpperCase().indexOf(val.toUpperCase());

            if (pos !== -1) {

                b = document.createElement("div");

                if (pos === 0) {
                    b.innerHTML += arr[i].label;
                } else {
                    b.innerHTML = arr[i].label.substr(0, pos);
                    b.innerHTML += "<strong>" + arr[i].label.substr(pos, val.length) + "</strong>";
                    b.innerHTML += arr[i].label.substr(val.length + pos);
                }

                (function () {
                    const item = arr[i];
                    const itemFocusPos = focusPos;
                    const autoList = a.getElementsByTagName("div");

                    // made mousedown to "fix" the focusout problem but i dont like it
                    b.addEventListener("click", function () {
                        inputEl.value = item.label;
                        hiddenEl.setAttribute("value", item.value);
                        valueChangedCb();
                        closeAllLists();
                    });

                    b.addEventListener("mouseover", function () {
                        currentFocus = itemFocusPos;
                        addActive(autoList);
                    });
                })();

                focusPos++;

                a.appendChild(b);
            }
        }

        if (!found) {
            hiddenEl.setAttribute("value", "");
            valueChangedCb();
        }

        if (a.childElementCount) {
            this.parentNode.appendChild(a);
        }
    }

    // inputEl.addEventListener("focus", auto);
    inputEl.addEventListener("mousedown", auto);
    inputEl.addEventListener("paste", auto);
    inputEl.addEventListener("input", auto);
    inputEl.addEventListener("focusout", function () {
        // blur not catching tab out
        // "click" was causing autocomplete-items will clear the input
        opened = false;
        currentFocus = -1;
        if (hiddenEl.value === "") inputEl.value = "";
    });

    inputEl.addEventListener("keydown", function (e) {

        if (e.keyCode === 9) { // tab
            closeAllLists();
        } else {
            let x = document.getElementById(this.id + "-autocomplete-list");
            if (x) x = x.getElementsByTagName("div");

            if (e.keyCode === 40) { // arrow down
                currentFocus++;
                addActive(x);
            } else if (e.keyCode === 38) { // arrow up
                currentFocus--;
                addActive(x);
            } else if (e.keyCode === 13) { // enter
                e.preventDefault();
                if (currentFocus > -1) {
                    if (x) x[currentFocus].click();
                }
            }
        }
    });

    function addActive(x) {
        if (!x) return false;
        removeActive(x);
        if (currentFocus >= x.length) currentFocus = 0;
        if (currentFocus < 0) currentFocus = (x.length - 1);
        x[currentFocus].classList.add("autocomplete-active");
    }

    function removeActive(x) {
        for (let i = 0; i < x.length; i++) {
            x[i].classList.remove("autocomplete-active");
        }
    }

    function closeAllLists(el) {
        let x = document.getElementsByClassName("autocomplete-items");
        for (let i = 0; i < x.length; i++) {
            if (el !== x[i] && el !== inputEl) {
                x[i].parentNode.removeChild(x[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        if (!__inputs.includes(e.target)) {
            closeAllLists(e.target);
        }
    });
}
