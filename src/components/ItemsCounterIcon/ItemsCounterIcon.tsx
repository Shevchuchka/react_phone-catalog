import { useContext } from 'react';
import styles from './ItemsCounterIcon.module.scss';
import { CartContext } from '../Contexts/CartContext';
import { FavouritesContext } from '../Contexts/FavouritesContext';

type Props = {
  icon: 'favourites' | 'cart';
};

export const ItemsIconCounter: React.FC<Props> = ({ icon }) => {
  const { itemsQuantity } = useContext(CartContext);
  const { favProducts } = useContext(FavouritesContext);

  const itemsNum = icon === 'favourites' ? favProducts.length : itemsQuantity;

  return (
    <div className={styles.iconInnerContainer}>
      {itemsNum > 0 && (
        <span className={styles.counterContainer}>
          <span className={styles.counter}>{itemsNum}</span>
        </span>
      )}

      <span className={`icon ${icon}`} />
    </div>
  );
};
