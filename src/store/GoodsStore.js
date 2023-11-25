import {makeAutoObservable} from "mobx";
export default class GoodsStore  {
    constructor(){
        this._types=[
            {id: 1, name:'Манга'},
            {id: 1, name:'Брелоки'}
        ]
        this._products=[
            { id: 1, typeId: 1, name: 'Название манги', price: 10.99, imgage: 'images/1.jpg'},
            { id: 2, typeId: 1, name: 'Еще одна манга', price: 12.99, imgage: 'images/2.jpg'},
            { id: 3, typeId: 2, name: 'Брелок с персонажем', price: 5.99, imgage: 'images/3.jpg'},
        ]
        
        makeAutoObservable(this)
    }
    setTypes(types){
        this._types=types
    }
    setProducts(products){
        this._products=products
    }
    get types(){
        return this._types
    }
    get products(){
        return this._products
    }
}