import {makeAutoObservable} from "mobx";

export default class GoodsStore  {
    constructor(){
        this._types=[
            {id: 1, name:'Манга'},
            {id: 2, name:'Брелоки'},
            {id: 3, name:'Манга'},
            {id: 4, name:'Манга'},
            {id: 5, name:'Манга'},
            {id: 6, name:'Манга'},
            {id: 7, name:'Манга'},
            {id: 8, name:'Борина'},
            {id: 9, name:'Мыльная'}
        ]
        this._products=[
            { id: 1, typeId: 1, name: 'Название манги', price: 10.99, currency: 'р.', img: '../images/1.jpg'},
            { id: 2, typeId: 1, name: 'Еще одна манга', price: 12.99, currency: 'р.', img: "/images/2.jpg"},
            { id: 3, typeId: 2, name: 'Брелок с персонажем', price: 5.99, currency: 'р.', img: 'images/3.jpg'},
            { id: 3, typeId: 2, name: 'Брелок с персонажем', price: 5.99, currency: 'р.', img: 'images/3.jpg'},
            { id: 3, typeId: 2, name: 'Брелок с персонажем', price: 5.99, currency: 'р.', img: 'https://sun9-80.userapi.com/impg/fnAKZE7n6yjSYnOWupOoHE4uj1BH5G9F5n-Vhg/4U8J2LUTDjA.jpg?size=607x1080&quality=96&sign=98c6fa749db58278a58c8016c331ef5a&type=album'},
            
        ]
        this._selectedType={}
        
        makeAutoObservable(this)
    }
    setTypess(types){
        this._types=types
    }
    setProducts(products){
        this._products=products
    }
    setSelectedType(types){
        this._selectedType=types
    }
   
    get types(){
        return this._types
    }
    get products(){
        return this._products
    }
    get selectedType(){
        return this._selectedType
    }
}