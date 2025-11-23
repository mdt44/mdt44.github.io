const tomorrow = new Date();
tomorrow.setDate(tomorrow.getDate());
const minDate = tomorrow.toISOString().split("T")[0];

document.getElementById("userDate").setAttribute("min", minDate);
document.getElementById("userDate").setAttribute("value", minDate);

document.getElementById("userDate").addEventListener("change", function() {
    console.log("Selected date:", this.value);
    pullReserveSpots();
});
