import { create } from 'zustand';

type Product = any;

export const useCartStore = create((set: any) => ({
  cart: [] as Product[],
  count: 0,
  addProduct: (product: Product) =>
    set((state: any) => {
      const existingProductIndex = state.cart.findIndex((p: Product) => p.id === product.id);
      if (existingProductIndex !== -1) {
        const updatedCart = [...state.cart];
        updatedCart[existingProductIndex].quantity += product.quantity;
        const newCount = state.count + product.quantity;
        return { cart: updatedCart, count: newCount };
      } else {
        const newCount = state.count + product.quantity;
        return { cart: [...state.cart, product], count: newCount };
      }
    }),
  removeProduct: (productId: any) =>
    set((state: any) => {
      const productToRemove = state.cart.find((p: Product) => p.id === productId);
      const updatedCart = state.cart.filter((product: Product) => product.id !== productId);
      const newCount = state.count - (productToRemove?.quantity || 0);
      return { cart: updatedCart, count: newCount };
    }),
  clearCart: () => set({ cart: [], count: 0 }),
}));
