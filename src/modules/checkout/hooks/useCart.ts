import { useCallback } from "react";
import { useCreateStore } from "../store/useCartStore";
import { useShallow } from "zustand/react/shallow";

export const useCart = (tenantSlug: string) => {
  const addProduct = useCreateStore((state) => state.addProduct);
  const removeProduct = useCreateStore((state) => state.removeProduct);
  const clearCart = useCreateStore((state) => state.clearCart);
  const clearAllCarts = useCreateStore((state) => state.clearAllCarts);

  const productIds = useCreateStore(
    useShallow((state) => state.tenantCarts[tenantSlug]?.productIds || [])
  );
  const toggleProduct = useCallback(
    (productId: string) => {
      if (productIds.includes(productId)) {
        removeProduct(tenantSlug, productId);
      } else {
        addProduct(tenantSlug, productId);
      }
    },
    [removeProduct, addProduct, productIds, tenantSlug]
  );
  const isProductInCart = useCallback(
    (productId: string) => {
      return productIds.includes(productId);
    },
    [productIds]
  );
  const clearTenantCart = useCallback(() => {
    clearCart(tenantSlug);
  }, [tenantSlug, clearCart]);

  const handleAddProduct = useCallback(
    (productId: string) => {
      addProduct(tenantSlug, productId);
    },
    [addProduct, tenantSlug]
  );

  const handleRemoveProduct = useCallback(
    (productId: string) => {
      removeProduct(tenantSlug, productId);
    },
    [removeProduct, tenantSlug]
  );

  return {
    productIds,
    addProduct: handleAddProduct,
    removeProduct: handleRemoveProduct,
    clearCart: clearTenantCart,
    clearAllCarts,
    toggleProduct,
    isProductInCart,
    totalItems: productIds.length,
  };
};
