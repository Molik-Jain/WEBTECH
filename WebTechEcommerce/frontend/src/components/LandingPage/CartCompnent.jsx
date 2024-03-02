import { useEffect, useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ShoppingCart } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch, useSelector } from "react-redux";
import {
  addToCart,
  decreaseCart,
  getTotals,
  removeFromCart,
} from "@/slice/cartSlice";
import { Badge } from "../ui/badge";
import { useNavigate } from "react-router-dom";

const CartCompnent = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getTotals(cart));
  }, [cart]);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger>
          <div className="flex">
            <ShoppingCart size={30} />
            {cart.cartTotalQuantity === 0 ? null : (
              <Badge className="h-7 w-7 ml-1 text-center flex justify-center rounded-full">
                {cart.cartTotalQuantity}
              </Badge>
            )}
          </div>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Shopping Cart</SheetTitle>
            <SheetDescription>
              <div className="mt-8 flex flex-col  justify-between bg-white overflow-y-scroll h-[60vh]">
                <div className="flow-root">
                  <ul role="list" className="-my-6 divide-y divide-gray-200">
                    {cart.cartItems &&
                      cart.cartItems.map((product) => (
                        <li key={product.id} className="py-6 flex">
                          <div className="flex-shrink-0 w-24 h-24 border border-gray-200 rounded-md overflow-hidden">
                            <img
                              src={product.image[0]}
                              alt={product.imageAlt}
                              className="w-full h-full object-center object-cover"
                            />
                          </div>

                          <div className="ml-4 flex-1 flex flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={product.href}>{product.name}</a>
                                </h3>
                                <p className="ml-4">₹{product.price}</p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {product.color}
                              </p>
                            </div>
                            <div className="flex-1 flex items-end justify-between text-sm">
                              <div className="flex flex-1 items-end justify-between text-sm">
                                {/* <p className="text-gray-500">
                                        Qty {cartItem.cartQuantity}
                                      </p> */}
                                <div className="flex gap-5 py-1 items-start justify-center w-24 max-w-fit rounded">
                                  <button
                                    onClick={() =>
                                      dispatch(decreaseCart(product))
                                    }
                                    className="border rounded-md bg-slate-200 hover:bg-slate-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M18 12H6"
                                      />
                                    </svg>
                                  </button>
                                  <p className="text-gray-500 text-lg">
                                    {product.cartQuantity}
                                  </p>
                                  <button
                                    onClick={() => dispatch(addToCart(product))}
                                    className="border rounded-md bg-slate-200 hover:bg-slate-100"
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="1"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                                      />
                                    </svg>
                                  </button>
                                </div>
                              </div>
                              <div className="flex">
                                <button
                                  type="button"
                                  className="-mt-10 font-medium text-indigo-600 hover:text-indigo-500"
                                  onClick={() =>
                                    dispatch(removeFromCart(product))
                                  }
                                >
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>

              <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                <div className="flex justify-between text-base font-medium text-gray-900">
                  <p>Subtotal</p>
                  <p>₹{cart.cartTotalAmount}</p>
                </div>
                <p className="mt-0.5 text-sm text-gray-500">
                  Shipping and taxes calculated at checkout.
                </p>
                <div className="mt-6">
                  <Button
                    className="w-full"
                    onClick={() => {
                      navigate("/checkout");
                      setOpen(false);
                    }}
                  >
                    Checkout
                  </Button>
                </div>
                <div className="mt-6 flex justify-center text-sm text-center text-gray-500">
                  <p>
                    or{" "}
                    <button
                      type="button"
                      className="text-indigo-600 font-medium hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping<span aria-hidden="true"> &rarr;</span>
                    </button>
                  </p>
                </div>
              </div>
            </SheetDescription>
          </SheetHeader>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default CartCompnent;
