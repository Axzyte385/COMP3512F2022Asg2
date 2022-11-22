// require assign2.js
import { getapi, api } from "./assign2.js";

// declare variables
var genres = [];
var artists = [];
var songsData = [];

getapi(api);
console.log(genreList1);


/* // Calling that async function
getapi(api).then((data) => {
  //console.log(data);
  const temp_genre = JSON.stringify(data.genreList1);
  genres = JSON.parse(temp_genre);
  console.log(genres);
  const temp_artist = JSON.stringify(data.artistList1);
  const artists = JSON.parse(temp_artist);
//   console.log(artists);
  const temp_song = JSON.stringify(data.songData1);
  const songsData = JSON.parse(temp_song);
//   console.log(songsData);

  const genres2 = JSON.parse(genreList);
  console.log(genres2);
  const tempGenre = JSON.stringify(data.genreList1);
  const genres3 = JSON.parse(tempGenre);
  // console.log(genres3);

//   return { genres, artists, songsData };
}); */
// getapi(api);
/* const genres = JSON.parse(genreList);
const artists = JSON.parse(artistList);
const songsData = JSON.parse(songList); 
const genres = JSON.parse(genreList);
const artists = JSON.parse(artistList);
const songsData = JSON.parse(songList);*/
// after getapi(api) finishes loading;
console.log(genres);
console.log(artists);
console.log(songsData);
document.addEventListener("DOMContentLoaded", function () {
  //this array will store all the songs in the database
  const songsArray = [];

  for (let a of artists) {
    let option = document.createElement("option");
    option.text = a["name"];
    option.value = a["id"];
    let aSelect = document.getElementById("artist");
    aSelect.appendChild(option);
  }

  for (let g of genres) {
    let option = document.createElement("option");
    option.text = g["name"];
    option.value = g["id"];
    let aSelect = document.getElementById("genre");
    aSelect.appendChild(option);
  }

  //Retrieve and display song data
  const tableBody = document.getElementById("tBody");

  for (let s of songsData) {
    const songRow = document.createElement("tr");
    songRow.setAttribute("songID", s["song_id"]);

    //create td for title
    const songDataTitle = document.createElement("td");
    //add data inside of td
    songDataTitle.textContent = s["title"];
    //Insert song title into the TD
    songRow.insertAdjacentElement("beforeend", songDataTitle);
    //add td1 (Song title)
    tableBody.insertAdjacentElement("afterend", songRow);

    //create td for artist name
    const songDataArtist = document.createElement("td");
    //add data inside of td
    songDataArtist.textContent = s["artist"]["name"];
    //add td2 (Artist name)
    songRow.appendChild(songDataArtist);

    //create td for year
    const songDataYear = document.createElement("td");
    //add data inside of td
    songDataYear.textContent = s["year"];
    //add the year td to the row
    songRow.appendChild(songDataYear);

    //create td for genre
    const songDataGenre = document.createElement("td");
    //add data inside of td
    songDataGenre.textContent = s["genre"]["name"];
    //add the genre td to the row
    songRow.appendChild(songDataGenre);

    //create td for popularity
    const songDataPopularity = document.createElement("td");
    //add data inside of td
    songDataPopularity.textContent = s["details"]["popularity"];
    //add the popularity td to the row
    songRow.appendChild(songDataPopularity);

    //create td for addToPlaylist
    const playlistButton = document.createElement("button");
    //add data inside of td
    playlistButton.textContent = "Add";
    //add button to the end of the row
    songRow.appendChild(playlistButton);

    //add the completed song row to the table body
    tableBody.appendChild(songRow);

    const mySong = new Song(s);

    //add song to all songs array
    songsArray.push(mySong);

    console.log(mySong);
  }

  //TEST outputting the array to console
  console.log(songsArray);

  //TESTING sorting for columns, console.log which header was clicked
  const tableContent = document.getElementById("tBody");
  const tableButtons = document.querySelectorAll("th ");

  const createRow = (obj) => {
    const row = document.createElement("tr");
    const objKeys = Object.keys(obj);
    objKeys.map((key) => {
      const cell = document.createElement("td");
      cell.setAttribute("data-attr", key);
      cell.innerHTML = obj[key];
      row.appendChild(cell);
    });
    return row;
  };

  const getTableContent = (data) => {
    data.map((obj) => {
      const row = createRow(obj);
      tableContent.appendChild(row);
    });
  };

  const sortData = (data, param, direction = "asc") => {
    tableContent.innerHTML = "";
    const sortedData =
      direction == "asc"
        ? [...data].sort(function (a, b) {
            if (a[param] < b[param]) {
              return -1;
            }
            if (a[param] > b[param]) {
              return 1;
            }
            return 0;
          })
        : [...data].sort(function (a, b) {
            if (b[param] < a[param]) {
              return -1;
            }
            if (b[param] > a[param]) {
              return 1;
            }
            return 0;
          });

    getTableContent(sortedData);
  };

  const resetButtons = (event) => {
    [...tableButtons].map((button) => {
      if (button !== event.target) {
        button.removeAttribute("data-dir");
      }
    });
  };

  window.addEventListener("load", () => {
    [...tableButtons].map((button) => {
      button.addEventListener("click", (e) => {
        resetButtons(e);
        if (e.target.getAttribute("data-dir") == "desc") {
          sortData(songList, e.target.id, "desc");
          e.target.setAttribute("data-dir", "asc");
        } else {
          sortData(songList, e.target.id, "asc");
          e.target.setAttribute("data-dir", "desc");
        }
      });
    });
  });

  function Song(s) {
    this.title = s["title"];
    this.artist = s["artist"];
    this.year = s["year"];
    this.genre = s["genre"]["name"];
    this.popularity = s["details"]["popularity"];
    this.songID = s["song_id"];
  }
});