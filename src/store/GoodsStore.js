import {makeAutoObservable} from "mobx";

export default class GoodsStore  {
    constructor(){
        this._types=[]
        this._products=[]
        this._selectedType={}
        this._baskets = []
        this._totalCount = 0
        this._page=1
        this._totalCounti=0
        this._limit=12
        this._showAllTypes = false;
        
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
        this.setPage(1)
        this._selectedType=types
    }
    setTotalCount(count) {
        this._totalCount = count
    }
    setPage(page){
        this._page = page
    }
    setTotalCounti(counti){
        this._totalCounti = counti
    }
    setLimit(limit){
        this._limit = limit
    }
    setShowAllTypes(value) { 
        this._showAllTypes = value;
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
    get totalCounti() {
        return this._totalCounti
    }
    get page() {
        return this._page
    }
    get limit() {
        return this._limit
    }
    get showAllTypes() { 
        return this._showAllTypes;
    }

}