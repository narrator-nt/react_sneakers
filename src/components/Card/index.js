import React from 'react';
import ContentLoader from "react-content-loader";
import styles from './Card.module.scss';
import {AppContext} from '../../App';


function Card({id="", title="", price="", img="", onPlus, onFaworite, favorited = false, added = false, loading = false} ){

    // const onClickButton = () => {
    //     alert(title)
    // }

    const {isItemAdded} = React.useContext(AppContext)


    const [isFavorite, setIsFavorite] = React.useState(favorited);
    const cardObj = {id,parentId : id, title, price, img}

    const OnClickPlus = () => {
        onPlus(cardObj)
    }
    const OnClickFavorite = () => {
        onFaworite(cardObj)
        setIsFavorite(!isFavorite)
    }

    // React.useEffect(() => {
    //     console.log ("cheking.....");
    // },[isAdded]);

    return(

        <div className={styles.card} >
            {
                loading ? 
                <ContentLoader 
                    speed={1}
                    width={210}
                    height={227}
                    viewBox="0 0 210 260"
                    backgroundColor="#f3f3f3"
                    foregroundColor="#ecebeb"
                >
                    <rect x="0" y="9" rx="10" ry="10" width="170" height="150" /> 
                    <rect x="0" y="170" rx="10" ry="10" width="150" height="20" /> 
                    <rect x="0" y="200" rx="10" ry="10" width="100" height="20" /> 
                    <rect x="0" y="230" rx="10" ry="10" width="80" height="26" /> 
                    <rect x="134" y="218" rx="10" ry="10" width="38" height="38" />
                </ContentLoader>

              :
              <>    
                {   onFaworite &&
                    <img className={styles.cardFavorite} onClick={OnClickFavorite} src={isFavorite ? "/img/icons/heart-active.svg" : "/img/icons/heart.svg" } alt="Favorite" />
                }
                <img width={133} height={112}  src={img} alt="shoe" />
                <h5>{title}</h5>
                <div className={styles.card_bottom}>
                    <div className={styles.card_bottom_wrapper}>
                        <span>Цена: </span>
                        <b>{price} грн.</b>
                    </div>
                    
                    { onPlus &&
                        <img width={32} height={32} onClick={OnClickPlus} src={isItemAdded(id) ? "/img/icons/checked.svg" : "/img/icons/plus.svg"} alt="Plus" />
                    }
                </div>
              </>


            }
            
        </div>
    );
}

export default Card;
