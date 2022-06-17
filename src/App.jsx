import React  from 'react';
import { Routes, Route } from "react-router-dom";
import axios from 'axios';
import Home from './pages/Home'
import Favorite from './pages/Favorite'
import {Orders} from './pages/Orders'
import Header from './components/Header'
import Drawer from './components/Drawer'

// const arr = [];

export const AppContext = React.createContext({})


function App() {

  const [cartOpened, setCart] = React.useState(false);
  const [items, setItems] = React.useState([]);
  const [searchValue, setSearchValue] = React.useState("");
  const [cartItems, setCartItems] = React.useState([]);
  const [Favorites, setFavorites] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isLoadingFavorites, setIsLoadingFavorites] = React.useState(true);



  React.useEffect(()=>{
    try{
      async function fetchData () {
        const [cartResponse, favoriteResponse, itemsResponse] = await Promise.all([
          axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/cart'),
          axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/Favorites'),
          axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/items')
          

        ])

        // const cartResponse = await axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/cart')
        // const favoriteResponse = await axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/Favorites')
        // const itemsResponse = await axios.get('https://62a34b845bd3609cee676f5b.mockapi.io/items')
        setIsLoading(false)
        setIsLoadingFavorites(false)
        

        setCartItems(cartResponse.data)
        setFavorites(favoriteResponse.data)
        setItems(itemsResponse.data) 
      }
      fetchData ()
    }
    catch(error){
      alert ("Ошибка загрузки страницы!")
      console.error (error)
    }
    
    
    

  }, [])

  const onRemoveCartItem = async (id) => {
    try{
      setCartItems(prev => prev.filter(item => Number(item.id) !== Number(id)))
      await axios.delete(`https://62a34b845bd3609cee676f5b.mockapi.io/cart/${id}`)
    }
    catch(error){
      alert("Не удалось удалить с карзины!")
      console.error (error)
    }
   
  }

  const onAddToCard = async (obj) => {
    try{
      const findItem = cartItems.find((item) => Number(item.parentId) === Number(obj.id))
      if(findItem){
        setCartItems((prev) => prev.filter((item) => Number(item.parentId) !== Number(obj.id)))
        await axios.delete(`https://62a34b845bd3609cee676f5b.mockapi.io/cart/${findItem.id}`
        )      }
      else{
        setCartItems((prev) => [...cartItems, obj])
        const {data} = await axios.post('https://62a34b845bd3609cee676f5b.mockapi.io/cart', obj)
        setCartItems((prev) => prev.map(item =>{
          if(item.parentId === data.parentId){
            return{
              ...item,
              id: data.id
            }
          }
          return item
        }))
      }
    }
    catch(error){
      alert ("Error")
      console.error (error)
    }
  }
  
  const onFavorite = async (obj) => {
    try{
      if(Favorites.find((favObj) => favObj.id === obj.id )){
        axios.delete(`https://62a34b845bd3609cee676f5b.mockapi.io/Favorites/${obj.id}`)
        setFavorites(prev => prev.filter(item => item.id !== obj.id))
        
      }
      else{
        const {data} = await axios.post('https://62a34b845bd3609cee676f5b.mockapi.io/Favorites', obj)
        setFavorites(prev => [...Favorites, data])
      }
    }
    catch(error){
      alert ("Не удалось добавить в закладки")
      console.error (error)
    }
  }



  const onChangeInput = (event) => {
    setSearchValue(event.target.value)
  }

  const isItemAdded = (id) => {
    return cartItems.some((obj) => Number(obj.parentId) === Number(id))
  }

  


  return (
      <AppContext.Provider value={{items, cartItems, Favorites, isItemAdded, setCart, setCartItems}}>
        <div className="wrapper">

          <Drawer items = {cartItems} onClose = {() => setCart(false)} onRemove = {onRemoveCartItem} opened={cartOpened}/>
          <Header onClickCart = {() => setCart(true)}/>
          <Routes>
            <Route path="/" element={<Home
              searchValue={searchValue}
              items={items}
              cartItems={cartItems}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              onAddToCard={onAddToCard}
              onFavorite={onFavorite}
              isLoading={isLoading}
            />} />
            <Route path='/favorite' element={<Favorite
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              onAddToCard={onAddToCard}
              onFavorite={onFavorite}
              isLoadingFavorites={isLoadingFavorites}
              />}/>
            <Route path='/orders' element={<Orders
              searchValue={searchValue}
              setSearchValue={setSearchValue}
              onChangeInput={onChangeInput}
              onAddToCard={onAddToCard}
              onFavorite={onFavorite}
            />}/>
          </Routes>

          

        </div>
      </AppContext.Provider>
    );
}

export default App;
