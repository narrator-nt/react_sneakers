import React from 'react'
import Info from '../Info'
import axios from 'axios'
import {AppContext} from '../../App'
import styles from './Drawer.module.scss'



function Drawer({onClose, items = [], onRemove, opened}){
  console.log (opened)
    const [isOrderComplete, setIsOrderComplete] = React.useState(false)
    const [orderId, setOrderId] = React.useState(null)
    const {cartItems ,setCartItems} = React.useContext(AppContext)
    const totalPrice = cartItems.reduce((sum, obj) => Number(obj.price) + Number(sum), 0)



    const onClickOrder = async () => {
      try{
        const {data} = await axios.post('https://62a34b845bd3609cee676f5b.mockapi.io/orders', {items: cartItems})
        axios.put('https://62a34b845bd3609cee676f5b.mockapi.io/cart', [])
        setOrderId(data.id)
        setOrderId(data.id)
        setIsOrderComplete(true)
        setCartItems([])

        cartItems.forEach(item => {
          axios.delete('https://62a34b845bd3609cee676f5b.mockapi.io/cart/' + item.id)
        });
      }
      catch(error){
        alert ("Order error")
      }
    }




    return(
        <div className={`${styles.drawer_overlay} ${opened ? styles.drawer_overlayVisible : ''}`}>
          <div className={styles.drawer}>
            <h2>
              Корзина
              <svg onClick={onClose} width="35" height="35" opacity='0.5' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
              </svg>
            </h2>

          {items.length <= 0 ? (

            <Info 
            title={isOrderComplete ? "Заказ оформлен!" : "Корзина пустая"} 
            image={isOrderComplete ? "img/order.png" : "img/emptyCart.png"} 
            description={isOrderComplete ? `Ваш заказ #${orderId} скоро будет передан курьерской доставке`: "Добавьте хотя бы одну пару кроссовок, чтобы сделать заказ."} />
          ) : (
            <>
              <div className={styles.items}>

                { items.map((obj) => (
                  <div key={obj.id} className={styles.cart_item}>
                      <div style={{backgroundImage: `url(${obj.img})`}} className={styles.cart_item_img}>
                      </div>
                      <div className={styles.cart_item_info}>
                        <p>{obj.title}</p>
                        <b>{obj.price} грн.</b>
                      </div>
                      <svg onClick = {() => onRemove(obj.id)} width="50" height="50" opacity='0.5' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect x="0.5" y="0.5" width="31" height="31" rx="7.5" fill="white" stroke="#DBDBDB"/>
                        <path d="M20.0799 18.6155L17.6311 16.1667L20.0798 13.718C21.0241 12.7738 19.5596 11.3093 18.6154 12.2536L16.1667 14.7023L13.7179 12.2535C12.7738 11.3095 11.3095 12.7738 12.2535 13.7179L14.7023 16.1667L12.2536 18.6154C11.3093 19.5596 12.7738 21.0241 13.718 20.0798L16.1667 17.6311L18.6155 20.0799C19.5597 21.0241 21.0241 19.5597 20.0799 18.6155Z" fill="#B5B5B5"/>
                      </svg>
                    </div>
                ))}
        
              </div>

              <ul className={styles.total_wrapper}>
                <li className={styles.total}>
                  <span>Итого: </span>
                  <div></div>
                  <b>{totalPrice} грн.</b>
                </li>
                <li className={styles.total}>
                  <span>Налог 5%: </span>
                  <div></div>
                  <b>{Math.round(totalPrice / 100 * 5)} грн.</b>
                </li>
              </ul>
            
              <button onClick={onClickOrder} className={styles.green_button}>Оформить заказ <img height={15} width={15} src="/img/icons/arrow.svg" alt="arrow" /></button>
            </>
            )}
          </div>
      </div>
    );
}

export default Drawer;