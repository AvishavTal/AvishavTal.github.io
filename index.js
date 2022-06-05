

class CityName{
    static #cssCalss='city-name';
    static #tagName='p';
    constructor(name) {
         this._name=name;
        this._html=this.#makeHtml();
    }
    #makeHtml(){
        let result=document.createElement(CityName.#tagName);
        result.className=CityName.#cssCalss;
        result.innerHTML=this._name;
        return result;
    }
    get asHtmlElement(){
        return this._html;
    }
}

class CityImg {
    static #tagName='img';
    constructor(src) {
        this._src=src;
        this._html=this.#makeHtml();
    }

    #makeHtml() {
        let result=document.createElement(CityImg.#tagName);
        result.src=this._src;
        return result;
    }
    get asHtmlElement(){
        return this._html;
    }
}

class CityDescription{
    static #tagName='div';
    static #cssClas='button-txt';
    constructor(description) {
        this._description=description;
        this._html=this.#makeHtml();
    }

    #makeHtml() {
        let result=document.createElement(CityDescription.#tagName);
        result.className=CityDescription.#cssClas;
        result.innerHTML=this._description;
        return result;
    }
    get asHtmlElement(){
        return this._html;
    }
}

class City {
    static #tagName='div';
    static #cssClass='button';
    static #showMapEvent='click';
    constructor(name,imgSrc,description,coordinates,places) {
        this._name=new CityName(name);
        this._img=new CityImg(imgSrc);
        this.coordinates=coordinates;
        this._description=new CityDescription(description);
        this._map=undefined;
        this._places=places;
        this._html=this.#makeHtml();

    }

    #makeHtml() {
        let result=document.createElement(City.#tagName);
        result.className=City.#cssClass;
        result.appendChild(this._img.asHtmlElement);
        result.appendChild(this._name.asHtmlElement);
        result.appendChild(this._description.asHtmlElement);
        result.addEventListener(City.#showMapEvent,()=>{
             this._map = new google.maps.Map(document.getElementById("myMap"), {
                zoom: 12,
                center: this.coordinates,
            });


            const infoWindow = new google.maps.InfoWindow();

             for (let i=0;i<this._places.length;i++){
                 const marker=new google.maps.Marker({
                     position:this._places[i].location,
                     map: this._map,
                     title: `${this._places[i].title}`,
                     optimized:false,
                 });
                 marker.addListener('mouseover',()=>{
                     infoWindow.setContent(marker.getTitle());
                     infoWindow.open(marker.getMap(),marker);
                 });
                 marker.addListener('mouseout',()=>{
                     infoWindow.close();
                 })
             }
        });
        return result;
    }
    get asHtml(){
        return this._html;
    }
}

function main(){
    const westernWall= {lat: 52.535152,lng:13.390206};
    const machneYudaMarket={lat:31.7845173254,lng:35.2124510205};
    const jerusalemPlaces=[westernWall,machneYudaMarket];

    const bostonLoganAirport={location:{lat:42.366978,lng:-71.022362},title:'נמל תעופה לוגאן'};
    const bostonEncoreHarbor={location:{lat:42.395528,lng:-71.069333},title: 'Encore Boston Harbor'};
    const bunkerHillMonument={location:{lat:42.376352,lng:-71.060767},title:'Bunker Hill Monument'};
    const bostonOperaHouse={location:{lat:42.354253,lng:-71.062817},title:'Boston Opera House'};
    const bostonPlaces=[bostonEncoreHarbor,bostonLoganAirport,bunkerHillMonument,bostonOperaHouse];

    const jerusalemImgSrc='images/jerusalem.jpg';
    const bostonImgSrc='images/boston.jpg';
    const londonImgSrc='images/london.jpg';
    const lisbonImgSrc='images/lisbon.jpg';

    const jerusalemDescription='עיר הבירה של מדינת ישראל והעיר הגדולה ביותר בישראל בגודל האוכלוסייה';
    const bostonDescription='עיר הבירה של מדינת מסצ\'וסטס שבארצות הברית והעיר הגדולה ביותר בה' ;
    const lisbonDescription='עיר הבירה של פורטוגל והמרכז הכלכלי והתרבותי החשוב במדינה';
    const londonDescription='עיר הבירה של אנגליה ושל הממלכה המאוחדת והעיר הדולה ביותר בממלכה';

    const jerusalem=new City('ירושלים',jerusalemImgSrc,jerusalemDescription,{ lat: 31.771959, lng: 35.217018 },jerusalemPlaces);
    const boston=new City('בוסטון',bostonImgSrc,bostonDescription,{ lat: 42.361145, lng: -71.057083 },bostonPlaces);
    const lisbon=new City('ליסבון',lisbonImgSrc,lisbonDescription,{ lat: 38.736946, lng: -9.142685 });
    const london=new City('לונדון',londonImgSrc,londonDescription,{ lat: 51.509865, lng: -0.118092 });

    let cityList=document.getElementById('cityLst');
    cityList.appendChild(jerusalem.asHtml);
    cityList.appendChild(boston.asHtml);
    cityList.appendChild(lisbon.asHtml);
    cityList.appendChild(london.asHtml);
}
