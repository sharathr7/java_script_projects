const seats=document.querySelectorAll(".seats_row_container .seat:not(.occupied)");
const seatsContainer=document.querySelector("#seats_container");
const movieSelector=document.getElementById("movie_names")
const totalSeats=document.getElementById("total_seats");
const totalPrice=document.getElementById("total_price");
let ticketPrice = +movieSelector.value;

init();

function init(){
    getUI();
    updateSelectedSeats();
    
    movieSelector.addEventListener("change",function(e){
        ticketPrice = +movieSelector.value;
        setMovieDetails(e.target.selectedIndex , e.target.value);
        updateSelectedSeats();
    });

    seatsContainer.addEventListener("click", function(e){
        if(e.target.classList.contains("seat") && !e.target.classList.contains("occupied"))
        {
            e.target.classList.toggle("selected");
            updateSelectedSeats();
        }
    });
}

function setMovieDetails(movieIndex,moviePrice){
    localStorage.setItem("selectedMovieIndex", movieIndex);
    localStorage.setItem("selectedMoviePrice",moviePrice);
}

function updateSelectedSeats(){
    const selectedSeats=document.querySelectorAll(".seat.selected");

    seatsIndex = [...selectedSeats].map(function(seat){
        return[...seats].indexOf(seat);
    });

    localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

    let selectedSeatsCount=selectedSeats.length-1;
    totalSeats.innerText = selectedSeatsCount;
    totalPrice.innerText = (selectedSeatsCount*ticketPrice);
}

function getUI(){
    const selectedSeats=JSON.parse(localStorage.getItem("selectedSeats"));
    if(selectedSeats !== null && selectedSeats.length > 0)
    {
        seats.forEach(function(seat,index){
            if(selectedSeats.indexOf(index) > -1){
                seat.classList.add("selected");
            }
        });
    }

    const selectedMovieIndex=localStorage.getItem("selectedMovieIndex");
    if(selectedMovieIndex !== null){
        movieSelector.selectedIndex = selectedMovieIndex;
    }
}


