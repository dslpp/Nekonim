import {makeAutoObservable} from "mobx";

export default class GoodsStore  {
    constructor(){
        this._types=[
            {id: 1, name:'Манга'},
            {id: 2, name:'Комиксы'},
            {id: 3, name:'Книги'},
            {id: 4, name:'Фигурки'},
            {id: 5, name:'Мягкие игрушки'},
            {id: 6, name:'Брелоки'},
            {id: 7, name:'Значки'},
            {id: 8, name:'Шопперы'},
            {id: 9, name:'Кружки'}
    
        ]
        this._products=[
            { id: 1, typeId: 1, name: 'Магическая битва. Том 0', price: 19.99, img: '../images/mg0.jpg'},
            { id: 2, typeId: 1, name: 'Ван Пис. Том 2. Клятва', price: 24.99, img: "/images/op2.jpg"},
            { id: 3, typeId: 3, name: 'Благословение Небожителей 1', price: 30.99, img: 'images/bn1.jpg'},
            { id: 4, typeId: 6, name: 'Брелок авокадо', price: 5.99, img: 'images/brelok1.jpg'},
            { id: 5, typeId: 4, name: 'Чиби фигурка Ягами Лайт', price: 40.56, img: '../images/light.jpg'},
            { id: 6, typeId: 9, name: 'Кружка голова Рика', price: 12.99, img: "/images/rick.jpg"},
            { id: 7, typeId: 1, name: 'Манга Человек-бензопила 4.', price: 5.99, img: 'images/cm.jpg'},
            { id: 8, typeId: 8, name: 'Шоппер Канеки Кен', price: 20.99, img: 'images/kaneki.jfif'},
            { id: 9, typeId: 5, name: 'Мягкая монетница Тоторо', price: 5.99, img: 'images/totoro.jpg'},
            
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