import React, { useContext, useEffect, useMemo, useState } from 'react';
import { ProductContext } from './ProductsContext';
import { AddedProductType } from '../../types/AddedProduct';

type CartContextProps = {
  addedProducts: AddedProductType[];
  itemsQuantity: number;
  setAddedProducts: React.Dispatch<React.SetStateAction<AddedProductType[]>>;
  addCartProduct: (id: string) => void;
  deleteCartProduct: (id: number) => void;
  checkCartProduct: (id: string) => boolean;
};

export const CartContext = React.createContext<CartContextProps>({
  addedProducts: [],
  itemsQuantity: 0,
  setAddedProducts: () => {},
  addCartProduct: () => {},
  deleteCartProduct: () => {},
  checkCartProduct: () => true || false,
});

type Props = {
  children: React.ReactNode;
};

export const CartProvider: React.FC<Props> = ({ children }) => {
  const [addedProducts, setAddedProducts] = useState<AddedProductType[]>([]);

  const { products } = useContext(ProductContext);

  useEffect(() => {
    const savedCartProducts = localStorage.getItem('added');

    if (savedCartProducts) {
      setAddedProducts(JSON.parse(savedCartProducts));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('added', JSON.stringify(addedProducts));
  }, [addedProducts]);

  const checkCartProduct = (id: string) => {
    return addedProducts.some(item => item.product.itemId === id);
  };

  const addCartProduct = (id: string) => {
    if (checkCartProduct(id)) {
      return;
    }

    const product = products.find(item => item.itemId === id);

    if (!product) {
      return;
    }

    const newItem: AddedProductType = {
      id: addedProducts.length,
      quantity: 1,
      product,
    };

    setAddedProducts(currentList => [...currentList, newItem]);
  };

  const deleteCartProduct = (id: number) => {
    setAddedProducts(currentList =>
      currentList.filter(currentProduct => currentProduct.id !== id),
    );
  };

  const itemsQuantity = useMemo(() => {
    return addedProducts.reduce((acc, item) => acc + item.quantity, 0);
  }, [addedProducts]);

  return (
    <CartContext.Provider
      value={{
        addedProducts,
        itemsQuantity,
        setAddedProducts,
        addCartProduct,
        deleteCartProduct,
        checkCartProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
