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
            { id: 1, typeId: 1, name: 'Название манги', price: 10.99, img: '../images/1.jpg'},
            { id: 2, typeId: 1, name: 'Еще одна манга', price: 12.99, img: "/images/2.jpg"},
            { id: 3, typeId: 2, name: 'Брелок с персонажем', price: 5.99, img: 'images/3.jpg'},
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