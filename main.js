//assistance from Tim La
//worked as a group with T.L. Williams, Steve Carrington, Mai Nguyen & Elisia Burt

let pageIndex = 1
let options = {
    enableHighAccuracy: true,
    maximumAge: 0
};

const fallbackLocation = { latitude: 30.5595, longitude: 22.9375 }

function constructImageURL (photoObj) {
    return "https://farm" + photoObj.farm +
            ".staticflickr.com/" + photoObj.server +
            "/" + photoObj.id + "_" + photoObj.secret + ".jpg";
}


// const imageUrl = constructImageURL(response.photos.photo[0]);


// function showPhotos(dataObj) {
//     console.log(dataObj)
//     console.log(constructImageURL(dataObj.photos.photo[0]))
// }

function retrievePictures(coords) {
    console.log("Lat: " + coords.latitude)
    console.log("Lon: " + coords.longitude)
    const url = "https://shrouded-mountain-15003.herokuapp.com/https://flickr.com/services/rest/?api_key=b277e94d22f2f75f69d735a3262ea30b&format=json&nojsoncallback=1&method=flickr.photos.search&safe_search=1&per_page=1&text=cats&lat=" + coords.latitude + "&lon=" + coords.longitude + "&page=" + pageIndex

    // fetch(url)  //sends a request to a web service API for data
    //     .then(function (response) {  //process the data
    //         return response.json()  //waits for response, turn response into JSON
    //     })
    //     .then(showPhotos)
    let retrievePromise = fetch(url)
    let dataPromise = retrievePromise.then(function (response) {
        return response.json()
    })
    dataPromise.then(function (data) {
        let picture = constructImageURL(data.photos.photo[0])
        let imageBox = document.querySelector(".image")
        imageBox.src = picture
    })
}

// function success() {

//     console.log("hello")
// }
function useRealLocation(pos) {
    retrievePictures(pos.coords)
    let nextButton = document.querySelector("#next1")
    nextButton.addEventListener("click", function () {
        retrievePictures(pos.coords, pageIndex)
        pageIndex++
        //console.log("Missi")
        let previousButton = document.querySelector("#previous")
        previousButton.addEventListener("click", function () {
            retrievePictures(pos.coords, pageIndex)
            pageIndex--
        })
    })
}


function useFallbackLocation() {
    retrievePictures(fallbackLocation)
    // let nextButton = document.querySelector("#next1")
    // nextButton.addEventListener("click", function () {
    //     retrievePictures(fallbackLocation, pageIndex)
    //     pageIndex++
    
    // })
}

navigator.geolocation.getCurrentPosition(useRealLocation, useFallbackLocation, options);



