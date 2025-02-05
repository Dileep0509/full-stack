let slideShowArray = [
    "https://image-resizer-cloud-api.akamaized.net/image/8FA391F9-40D2-4325-8E27-F17937E8EDC5/0-16x9.jpg?width=1000&amp;updatedTime=2025-01-31T21:40:53Z&amp;dt=MMWeb",
    "https://image-resizer-cloud-api.akamaized.net/image/F1DE08EE-79B3-44CC-90D9-0303FE935BCC/0-3x1.jpg?width=1800&updatedTime=2024-08-30T14:33:20Z&dt=Web",
    "https://image-resizer-cloud-api.akamaized.net/image/2CD58353-24C9-4F51-9279-C8E1746D5C1F/0-3x1.jpg?width=1800&updatedTime=2024-08-31T12:12:14Z&dt=Web"
   
];

function SlideShow(){
    let i=0;

    let div = document.getElementById("carousel");
    let img = document.createElement("img");
    img.src =slideShowArray[0];

    div.append(img);

    setInterval(function (){
        if(i == slideShowArray.length){
            i = 0;
        }
        img.src =slideShowArray[i];
        i=i+1;
    },2000);

};
SlideShow();

//fetching the movies from OMDB api

async function searchMovies() {
    try {
        let loader_div =document.getElementById("loader_div");
        loader_div.style.display = "block";

        let query = document.getElementById("query").value;

        let response = await fetch(`http://www.omdbapi.com/?apikey=171ee2ab&s=${query}`);

        let data = await response.json(); //to convert json data to object data
        console.log(data.Search);

        appendMovies(data.Search);
    } catch(error){
        console.log("fetch error :", error);
    }
}

function appendMovies(data) {
    let loader_div = document.getElementById("loader_div");
    loader_div.style.display = "none";

    let data_div = document.getElementById("movies");

    data_div.innerHTML = "";

    data_div.id = "movies";

    data.forEach(function (element) {
        let div = document.createElement("div");
    
        let title = document.createElement("p");
        title.innerText = `Name : ${element.Title}`;
    
        let year = document.createElement("p");
        year.innerText = `Year : ${element.Year}`;
    
        let poster = document.createElement("img");
        poster.id = "poster";
    
        poster.src = element.Poster;
    
        div.append(poster, title, year);
    
        data_div.append(div);
      });
}
