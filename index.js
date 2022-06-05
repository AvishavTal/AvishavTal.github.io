/**
 * representation of city name
 */
class CityName{
    static #cssCalss='city-name';
    static #tagName='p';
    #_name;
    #_html;
    constructor(name) {
         this.#_name=name;
         this.#makeHtml();
    }

    /*
     * make html element representing the city name
     */
    #makeHtml(){
        this.#_html=document.createElement(CityName.#tagName);
        this.#_html.className=CityName.#cssCalss;
        this.#_html.innerHTML=this.#_name;
    }
    get asHtmlElement(){
        return this.#_html;
    }
}

/**
 * representation of city image
 */
class CityImg {
    static #tagName='img';
    #_src;
    #_alt;
    #_html;

    constructor(src,alt) {
        this.#_src=src;
        this.#_alt=alt;
        this.#makeHtml();
    }
    /*
     * make html element representing the city image
     */
    #makeHtml() {
        this.#_html=document.createElement(CityImg.#tagName);
        this.#_html.src=this.#_src;
        this.#_html.alt=this.#_alt;
    }

    get asHtmlElement(){
        return this.#_html;
    }
}

/**
 * representation of city description
 */
class CityDescription{
    static #tagName='div';
    static #cssClas='button-txt';
    #_description;
    #_html;

    constructor(description) {
        this.#_description=description;
        this.#makeHtml();
    }

    /*
     * make html element representing the city description
     */
    #makeHtml() {
        this.#_html=document.createElement(CityDescription.#tagName);
        this.#_html.className=CityDescription.#cssClas;
        this.#_html.innerHTML=this.#_description;
    }
    get asHtmlElement(){
        return this.#_html;
    }
}

/**
 * representation of a city
 */
class City {
    static #tagName='div';
    static #cssClass='button';
    static #showMapEvent='click';
    static #typeOfPlacesToShow='tourist_attraction';// type of places to mark on the map
    static #numberOfPlacesToShow=4;
    static #RadiusOfPlaces='8000';// distance from the center of the city in meters to search places
    static #ZOOM=11.5; // the initial zoom of the map
    #_map;
    #_html;
    #_name;
    #_img;
    #_coordinates;
    #_description;

    constructor(name,imgSrc,description,coordinates) {
        this.#_name=new CityName(name);
        this.#_img=new CityImg(imgSrc,name);
        this.#_coordinates=coordinates;
        this.#_description=new CityDescription(description);
        this.#makeHtml();
        this.#createMap();
    }

    /*
     * make html element representing the city
     */
    #makeHtml() {
        this.#_html=document.createElement(City.#tagName);
        this.#_html.className=City.#cssClass;
        this.#_html.appendChild(this.#_img.asHtmlElement);
        this.#_html.appendChild(this.#_name.asHtmlElement);
        this.#_html.appendChild(this.#_description.asHtmlElement);
    }

    /**
     * @returns html representation of the city
     */
    get asHtml(){
        return this.#_html;
    }

    /*
    create the map of the city
     */
    #createMap() {
        this.#_html.addEventListener(City.#showMapEvent,()=>{
            this.#_map = new google.maps.Map(document.getElementById("myMap"), {
                zoom: City.#ZOOM,
                center: this.#_coordinates,
            });
            this.#addMarkers();
        });
    }

    /*
    add markers of places on the map
     */
    #addMarkers() {
        // information window to show the information about the places
        const infoWindow = new google.maps.InfoWindow();
        let request={
            location:this.#_coordinates,
            radius:City.#RadiusOfPlaces,
            type:[City.#typeOfPlacesToShow],
        }

        // get places to show from google maps api, and put markers on them
        let service=new google.maps.places.PlacesService(this.#_map);
        service.nearbySearch(request,(results,status)=>{
            if (status===google.maps.places.PlacesServiceStatus.OK){
                for (let i=0;i<City.#numberOfPlacesToShow;i++){
                    const marker=new google.maps.Marker({
                        position:results[i].geometry.location,
                        map: this.#_map,
                        title:  `${results[i].name}`,
                        optimized:false,
                    });

                    // make the information window to show when the mouse is on the marker
                    marker.addListener('mouseover',()=>{
                        let info=document.createElement("h4");
                        info.innerHTML=marker.getTitle();
                        infoWindow.setContent(info);
                        infoWindow.open(marker.getMap(),marker);
                    });

                    // hide the information window when the mouse move from the marker
                    marker.addListener('mouseout',()=>{
                        infoWindow.close();
                    })
                }

            }else {
                alert('problem with finding places. try again later');
            }

        });
    }
}

/**
 * append the given cities to the html page
 * @param cities the cities to show
 */
function showCities(cities) {
    let cityList=document.getElementById('cityLst');
    for (let city of cities){
        cityList.appendChild(city.asHtml);
    }
}

function main(){
    // city image sources
    const jerusalemImgSrc='images/jerusalem.jpg';
    const bostonImgSrc='images/boston.jpg';
    const londonImgSrc='images/london.jpg';
    const lisbonImgSrc='images/lisbon.jpg';

    // city descriptions
    const jerusalemDescription='עיר הבירה של מדינת ישראל והעיר הגדולה ביותר בישראל בגודל האוכלוסייה';
    const bostonDescription='עיר הבירה של מדינת מסצ\'וסטס שבארצות הברית והעיר הגדולה ביותר בה' ;
    const lisbonDescription='עיר הבירה של פורטוגל והמרכז הכלכלי והתרבותי החשוב במדינה';
    const londonDescription=' עיר הבירה של אנגליה ושל הממלכה המאוחדת והעיר הגדולה ביותר בממלכה';

    // city objects to show
    let cities=[
        new City('ירושלים',jerusalemImgSrc,jerusalemDescription,{ lat: 31.778824, lng: 35.225763 }),
        new City('בוסטון',bostonImgSrc,bostonDescription,{ lat: 42.361145, lng: -71.057083 }),
        new City('ליסבון',lisbonImgSrc,lisbonDescription,{ lat: 38.736946, lng: -9.142685 }),
        new City('לונדון',londonImgSrc,londonDescription,{ lat: 51.509865, lng: -0.118092 })
    ];

    showCities(cities);
}
