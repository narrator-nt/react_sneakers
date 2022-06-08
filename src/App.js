import Card from './components/Card'
import Header from './components/Header'
import Drawer from './components/Drawer'

const arr = [
  {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: "2499", img: "img/card/shoe.png"},
  {name: "Мужские Кроссовки Nike Air Max 270", price: "3999", img: "img/card/shoe2.png"},
  {name: "Мужские Кроссовки Nike Blazer Mid Suede", price: "2700", img: "img/card/shoe3.png"},
  {name: "Кроссовки Puma X Aka Boku Future Rider", price: "4300", img: "img/card/shoe4.png"},

];


function App() {
  return (
    <div className="wrapper">
      

      <Drawer/>
      <Header/>

      <div className="content">
        <div className="search_wrapper">
          <h1>Все кроссовки</h1>
          <div className="search">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" stroke-width="2" stroke-linecap="round"/>
            </svg>
            <input type="text" placeholder="Поиск..." />
          </div>
        </div>

        <div className="card-wrapper">

          
          {arr.map ((obj) => (

            <Card title={obj.name} price={obj.price} img={obj.img}/>

          ))}

        </div>
      </div>

    </div>
  );
}

export default App;
