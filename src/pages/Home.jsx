import Card from '../components/Card';
import React  from 'react';



function Home ({
    items,
    searchValue,
    setSearchValue,
    onChangeInput,
    onAddToCard,
    onFavorite,
    isLoading
  }
    ) {



      const renderItems = () => {
        const filtredItems = items.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()))
        var loadArray = [1,2,3,4,5,6,7,8,9,10,11,12]

        return (isLoading ? loadArray : filtredItems).map((item, index) => (
          <Card 
            key={index}
            title={item.name} 
            price={item.price} 
            img={item.img} 
            id={item.id}
            loading={isLoading}
            onPlus={(obj) => onAddToCard(obj)} 
            onFaworite={(obj) => onFavorite(obj)}
          />
        ))
      }


    return(
        <div className="content">
            <div className="search_wrapper">
              <h1>Все кроссовки</h1>
              <div className="search">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M15.25 15.25L11.8855 11.8795L15.25 15.25ZM13.75 7.375C13.75 9.06576 13.0784 10.6873 11.8828 11.8828C10.6873 13.0784 9.06576 13.75 7.375 13.75C5.68424 13.75 4.06274 13.0784 2.86719 11.8828C1.67165 10.6873 1 9.06576 1 7.375C1 5.68424 1.67165 4.06274 2.86719 2.86719C4.06274 1.67165 5.68424 1 7.375 1C9.06576 1 10.6873 1.67165 11.8828 2.86719C13.0784 4.06274 13.75 5.68424 13.75 7.375V7.375Z" stroke="#E4E4E4" strokeWidth="2" strokeLinecap="round" />
                </svg>
                {searchValue && <svg onClick = {() => setSearchValue("")} className="clear" width="25" height="25" opacity='0.5' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                  <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                </svg>}
                <input onChange={onChangeInput} value = {searchValue} type="text" placeholder="Поиск..." />
              </div>
            </div>
  
            <div className="card-wrapper">
              {renderItems()}
            </div>
          </div>
    );
    
}

export default Home;