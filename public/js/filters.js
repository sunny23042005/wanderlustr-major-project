let taxSwitch = document.getElementById("switchCheckDefault");
     taxSwitch.addEventListener("change", () => {
    let prices = document.querySelectorAll(".price");
    prices.forEach(price => {
        if (taxSwitch.checked) {
           price.innerHTML = `&#8377; ${Number(price.dataset.taxed).toLocaleString("en-IN")} / night <small class="text-success">(18% GST Included)</small>`;
        } else {
            price.innerHTML = `&#8377; ${Number(price.dataset.original).toLocaleString("en-IN")} / night`;
        }
    });

});


const filters = document.getElementById("filters");
const scrollRight = document.getElementById("scrollRight");

scrollRight.addEventListener("click", () => {
    filters.scrollBy({
        left: 300,
        behavior: "smooth"
    });
});