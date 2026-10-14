
import {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";
import { CartContext } from "./CartContext";

const CART_KEY = "shop-ai-cart";

function readCart() {
  try {
    const storedCart = localStorage.getItem(CART_KEY);
    const cart = JSON.parse(storedCart || "[]");

    return Array.isArray(cart) ? cart : [];
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const [cart, setCart] = useState(readCart);

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product, quantity = 1) => {
    if (!product || product.stock <= 0) return;

    const requestedQuantity = Math.max(1, Math.floor(quantity));

    setCart((currentCart) => {
      const existingProduct = currentCart.find(
        (item) => item.id === product.id
      );

      if (existingProduct) {
        return currentCart.map((item) => {
          if (item.id !== product.id) return item;

          return {
            ...item,
            stock: product.stock,
            quantity: Math.min(
              item.quantity + requestedQuantity,
              product.stock
            ),
          };
        });
      }

      return [
        ...currentCart,
        {
          id: product.id,
          name: product.name,
          slug: product.slug,
          price: product.price,
          image_url: product.image_url,
          stock: product.stock,
          quantity: Math.min(requestedQuantity, product.stock),
        },
      ];
    });
  }, []);

  const updateQuantity = useCallback((productId, quantity) => {
    const requestedQuantity = Math.floor(Number(quantity));

    if (!Number.isFinite(requestedQuantity)) return;

    setCart((currentCart) =>
      currentCart.map((item) =>
        item.id === productId
          ? {
              ...item,
              quantity: Math.max(
                1,
                Math.min(requestedQuantity, item.stock)
              ),
            }
          : item
      )
    );
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart((currentCart) =>
      currentCart.filter((item) => item.id !== productId)
    );
  }, []);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const itemCount = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const subtotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const value = useMemo(
    () => ({
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      subtotal,
    }),
    [
      cart,
      addToCart,
      updateQuantity,
      removeFromCart,
      clearCart,
      itemCount,
      subtotal,
    ]
  );

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}
