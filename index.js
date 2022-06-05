

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
        result.addEventListener(City.#showMapEvent,(event)=>{
             this._map = new google.maps.Map(document.getElementById("myMap"), {
                zoom: 12,
                center: this.coordinates,
            });
            let request={
                location:this.coordinates,
                radius:'10000',
                type:['tourist_attraction'],
            };
            let service=new google.maps.places.PlacesService(this._map);
            service.nearbySearch(request,this.cb)

        })
        return result;
    }
    cb(results,status){
        // console.log(status);
        if (status==='OK'){
            // console.log('status is ok! creating markers');
            for (let i=0;i<results.length && i<4;i++){
                 let marker=new google.maps.Marker({
                     position: this.coordinates,
                     map: this._map,
                 });
            }
        }
    }

    get asHtml(){
        return this._html;
    }
    // makeButton(){
    //     const cityList=document.getElementById('cityLst');
    //     let newButton=document.createElement('div');
    //     newButton.className='button';
    //     const name=document.createElement('p');
    //     const description=document.createElement('div');
    //     const image=document.createElement('img');
    //     description.className='button-txt';
    //     name.className='city-name';
    //     name.innerHTML=this.name;
    //     description.innerHTML=this.description;
    //     image.src=this.imgSrc;
    //
    //     newButton.appendChild(name);
    //     newButton.appendChild(image);
    //     newButton.appendChild(description);
    //
    //     cityList.appendChild(newButton);
    //     return newButton;
    // }

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
//
// function initMap() {
//     const jerusalem = { lat: 31.771959, lng: 35.217018 };
//     const map = new google.maps.Map(document.getElementById("myMap"), {
//         zoom: 12,
//         center: jerusalem,
//     });
// }
// //
// // function makeButton(city){
// //     let cityList=document.getElementById('cityLst');
// //     let newButton=document.createElement('div');
// //     newButton.className='button';
// //     const name=document.createElement('span');
// //     const description=document.createElement('span');
// //     const image=document.createElement('img');
// //     description.className='button-txt';
// //     name.className='city-name';
// //     name.innerHTML=city.name;
// //     description.innerHTML=this.description;
// //     image.src=city.imgSrc;
// //
// //     newButton.appendChild(name);
// //     newButton.appendChild(image);
// //     newButton.appendChild(description);
// //
// //     cityList.appendChild(newButton);
// //     return newButton;
// // }
// const jerusalemImgSrc="data:image/jpeg;base64,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";
//
// const jerusalem=new City('ירושלים',jerusalemImgSrc,'עיר הבירה של מדינת ישראל, והעיר הגדולה ביותר בישראל בגודל האוכלוסייה',null);
// jerusalem.makeButton();
// // let cityList=document.getElementById('cityLst');
// // let jerusalem=document.createElement('p');
// // let jerusalemImg=document.createElement('img');
// // let jerusalemDescriptoin=document.createElement('div');
// // let jerusalemButton=document.createElement('div');
// // jerusalem.className='city-name';
// // jerusalemDescriptoin.className='button-txt';
// // jerusalemButton.className='button';
// // jerusalem.innerHTML='ירושלים';
// // jerusalemDescriptoin.innerHTML='עיר הבירה של מדינת ישראל, והעיר הגדולה ביותר בישראל בגודל האוכלוסייה';
// // jerusalemImg.src="data:image/jpeg;base64,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";
// //
// // jerusalemButton.appendChild(jerusalemImg);
// // jerusalemButton.appendChild(jerusalem);
// // jerusalemButton.appendChild(jerusalemDescriptoin);
// //
// // jerusalemButton.addEventListener('click',(event)=>{
// //     console.log('cos em emek!');
// // })
// //
// // cityList.appendChild(jerusalemButton);
// //
// // function appendButton(city){
// //     const cityList=document.getElementById('cityLst');
// //     let newButton=document.createElement('button');
// //     newButton.className='button';
// //     const name=document.createElement('span');
// //     const description=document.createElement('span');
// //     const image=document.createElement('img');
// //     name.innerHTML=city.name;
// //     description.innerHTML=city.description;
// //     image.src=city.imgSrc;
// //
// //     newButton.appendChild(name);
// //     newButton.appendChild(image);
// //     newButton.appendChild(description);
// //
// //     cityList.appendChild(newButton);
// // }