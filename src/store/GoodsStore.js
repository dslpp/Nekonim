import {makeAutoObservable} from "mobx";

export default class GoodsStore  {
    constructor(){
        this._types=[]
        this._products=[]
        this._selectedType={}
        this._baskets = []
        this._totalCount = 0
        
        makeAutoObservable(this)
    }
    setTypess(types){
        this._types=types
    }
    setProducts(products){
        this._products=products
    }
    setBaskets(basket){
        this._baskets = basket
    }
    setSelectedType(types){
        this._selectedType=types
    }
    setTotalCount(count) {
        this._totalCount = count
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
    get basket() {
        return this._baskets
    }
    get totalCount() {
        return this._totalCount
    }
}