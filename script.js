// Create your project here from scratch
const moviesList = [
    { movieName: "Flash", price: 7 },
    { movieName: "Spiderman", price: 5 },
    { movieName: "Batman", price: 4 },
  ];
  
  document.addEventListener("DOMContentLoaded", function () {
    const movieSelect = document.getElementById("selectMovie");
    const movieNameElement = document.getElementById("movieName");
    const moviePriceElement = document.getElementById("moviePrice");
    const totalPriceElement = document.getElementById("totalPrice");
    const selectedSeatsHolder = document.getElementById("selectedSeatsHolder");
    const cancelBtn = document.getElementById("cancelBtn");
    const proceedBtn = document.getElementById("proceedBtn");
    const seatContainer = document.getElementById("seatCont");
  
    let selectedSeats = [];
    let totalPrice = 0;
  
    // Function to populate movie options in the dropdown
    function populateMovieOptions() {
      moviesList.forEach((movie, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = movie.movieName;
        movieSelect.appendChild(option);
      });
    }
  
    // Function to update movie details
    function updateMovieDetails(movieIndex) {
      const selectedMovie = moviesList[movieIndex];
      movieNameElement.textContent = selectedMovie.movieName;
      moviePriceElement.textContent = `$ ${selectedMovie.price}`;
      updateTotalPrice();
    }
  
    // Function to update total price based on selected seats
    function updateTotalPrice() {
      totalPrice = selectedSeats.length * parseInt(moviePriceElement.textContent.slice(2));
      totalPriceElement.textContent = `$ ${totalPrice}`;
    }
  
    // Function to update selected seats section
    function updateSelectedSeats() {
      selectedSeatsHolder.innerHTML = "";
      if (selectedSeats.length === 0) {
        const noSelectedMessage = document.createElement("span");
        noSelectedMessage.textContent = "No Seat Selected";
        noSelectedMessage.classList.add("noSelected");
        selectedSeatsHolder.appendChild(noSelectedMessage);
      } else {
        selectedSeats.forEach((seatIndex) => {
          const seatElement = document.createElement("span");
          seatElement.textContent = `Seat ${seatIndex + 1}`;
          seatElement.classList.add("selectedSeat");
          selectedSeatsHolder.appendChild(seatElement);
        });
      }
    }
  
    // Function to handle seat selection/deselection
    function toggleSeatSelection(seatIndex) {
      const seatElement = seatContainer.querySelectorAll(".seat")[seatIndex];
  
      if (!seatElement.classList.contains("occupied")) {
        if (seatElement.classList.contains("selected")) {
          seatElement.classList.remove("selected");
          selectedSeats = selectedSeats.filter((index) => index !== seatIndex);
        } else {
          seatElement.classList.add("selected");
          selectedSeats.push(seatIndex);
        }
  
        updateTotalPrice();
        updateSelectedSeats();
      }
    }
  
    // Event listener for movie selection dropdown
    movieSelect.addEventListener("change", function () {
      const selectedMovieIndex = movieSelect.value;
      updateMovieDetails(selectedMovieIndex);
    });
  
    // Event listener for seat selection
    seatContainer.addEventListener("click", function (event) {
      const seatIndex = event.target.closest(".seat");
      if (seatIndex) {
        const seatNumber = Array.from(seatContainer.querySelectorAll(".seat")).indexOf(seatIndex);
        toggleSeatSelection(seatNumber);
      }
    });
  
    // Event listener for continue button
    proceedBtn.addEventListener("click", function () {
      if (selectedSeats.length === 0) {
        alert("Oops! No seat selected.");
      } else {
        alert("Yayy! Your seats have been booked.");
        selectedSeats.forEach((seatIndex) => {
          seatContainer.querySelectorAll(".seat")[seatIndex].classList.remove("selected");
          seatContainer.querySelectorAll(".seat")[seatIndex].classList.add("occupied");
        });
        totalPrice = 0;
        updateTotalPrice();
        selectedSeats = [];
        updateSelectedSeats();
      }
    });
  
    // Event listener for cancel button
    cancelBtn.addEventListener("click", function () {
      selectedSeats.forEach((seatIndex) => {
        seatContainer.querySelectorAll(".seat")[seatIndex].classList.remove("selected");
      });
      totalPrice = 0;
      updateTotalPrice();
      selectedSeats = [];
      updateSelectedSeats();
    });
  
    // Initialize default movie details and populate movie options
    populateMovieOptions();
    updateMovieDetails(0);
  });