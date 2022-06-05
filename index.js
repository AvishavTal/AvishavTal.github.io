

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
    static #typeOfPlacesToShow='tourist_attraction';
    static #numberOfPlacesToShow=4;

    constructor(name,imgSrc,description,coordinates) {
        this._name=new CityName(name);
        this._img=new CityImg(imgSrc);
        this.coordinates=coordinates;
        this._description=new CityDescription(description);
        this._map=undefined;
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
             this.addMarkers();
        });
        return result;
    }
    get asHtml(){
        return this._html;
    }

    addMarkers() {
        const infoWindow = new google.maps.InfoWindow();
        let request={
            location:this.coordinates,
            radius:'10000',
            type:[City.#typeOfPlacesToShow],
        }
        let service=new google.maps.places.PlacesService(this._map);
        service.nearbySearch(request,(results,status)=>{
            for (let i=0;i<City.#numberOfPlacesToShow;i++){
                const marker=new google.maps.Marker({
                    position:results[i].geometry.location,
                    map: this._map,
                    title:  `${results[i].name}`,
                    optimized:false,
                });
                marker.addListener('mouseover',()=>{
                    let info=document.createElement("h4");
                    info.className='info';
                    info.innerHTML=marker.getTitle();
                    infoWindow.setContent(info);
                    infoWindow.open(marker.getMap(),marker);
                });
                marker.addListener('mouseout',()=>{
                    infoWindow.close();
                })
            }
        });
    }
}


function main(){
    const jerusalemImgSrc='images/jerusalem.jpg';
    const bostonImgSrc='images/boston.jpg';
    const londonImgSrc='images/london.jpg';
    const lisbonImgSrc='images/lisbon.jpg';

    const jerusalemDescription='עיר הבירה של מדינת ישראל והעיר הגדולה ביותר בישראל בגודל האוכלוסייה';
    const bostonDescription='עיר הבירה של מדינת מסצ\'וסטס שבארצות הברית והעיר הגדולה ביותר בה' ;
    const lisbonDescription='עיר הבירה של פורטוגל והמרכז הכלכלי והתרבותי החשוב במדינה';
    const londonDescription='עיר הבירה של אנגליה ושל הממלכה המאוחדת והעיר הדולה ביותר בממלכה';

    const jerusalem=new City('ירושלים',jerusalemImgSrc,jerusalemDescription,{ lat: 31.771959, lng: 35.217018 });
    const boston=new City('בוסטון',bostonImgSrc,bostonDescription,{ lat: 42.361145, lng: -71.057083 });
    const lisbon=new City('ליסבון',lisbonImgSrc,lisbonDescription,{ lat: 38.736946, lng: -9.142685 });
    const london=new City('לונדון',londonImgSrc,londonDescription,{ lat: 51.509865, lng: -0.118092 });

    let cityList=document.getElementById('cityLst');
    cityList.appendChild(jerusalem.asHtml);
    cityList.appendChild(boston.asHtml);
    cityList.appendChild(lisbon.asHtml);
    cityList.appendChild(london.asHtml);
}
