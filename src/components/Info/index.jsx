import React from 'react'
import {AppContext} from '../../App'
import styles from './Info.module.scss'

const Info = ({image, title, description}) => {
    const {setCart} = React.useContext(AppContext)

  return (
    <div className={styles.cartEmpty}>
        <img src={image} alt="EmptyCart" />
        <h2>{title}</h2>
        <p>{description}</p>
        <button onClick={() => setCart(false)} className={styles.green_button}>Вернуться назад</button>
    </div>
  )
}

export default Info;