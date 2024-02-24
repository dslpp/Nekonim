import {makeAutoObservable} from "mobx";

export default class GoodsStore  {
    constructor(){
        this._types=[]
        this._products=[]
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