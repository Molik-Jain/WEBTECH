import { useSelector } from "react-redux";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const finalAmount = cart.cartTotalAmount + 350;
  const checkoutHandler = async (amount) => {
    const {
      data: { key },
    } = await axios.get("http://localhost:8000/api/payment/getkey");

    const {
      data: { order },
    } = await axios.post("http://localhost:8000/api/payment/checkout", {
      amount,
    });
    const options = {
      key,
      amount: order.amount,
      currency: "INR",
      name: "Buy object",
      description: "Test Transaction",
      image:
        "https://media.licdn.com/dms/image/D4D35AQF0CsVl9CNRvg/profile-framedphoto-shrink_400_400/0/1706197203992?e=1707814800&v=beta&t=FKX-WQ9k7pQ7Tx54mljOcvz51KVGdWFGFCknv3GmREs",
      order_id: order.id, 
      callback_url: "http://localhost:5000/",
      prefill: {
        name: "Gaurav Kumar",
        email: "gaurav.kumar@example.com",
        contact: "9000090000",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };
    const razor = new window.Razorpay(options);
    razor.open();
  };

  return (
    <>
      <div className="bg-white">
        {/* Background color split screen for large screens */}
        <div
          className="hidden lg:block fixed top-0 left-0 w-1/2 h-full bg-white"
          aria-hidden="true"
        />
        <div
          className="hidden lg:block fixed top-0 right-0 w-1/2 h-full bg-slate-600"
          aria-hidden="true"
        />

        <header className="relative max-w-7xl mx-auto bg-slate-600 py-6 lg:bg-transparent lg:grid lg:grid-cols-2 lg:gap-x-16 lg:px-8 lg:pt-16 lg:pb-10"></header>

        <main className="relative grid grid-cols-1 gap-x-16 max-w-7xl mx-auto lg:px-8 lg:grid-cols-2">
          <h1 className="sr-only">Checkout</h1>

          <section
            aria-labelledby="summary-heading"
            className="bg-slate-600 text-indigo-300 pt-6 pb-12 md:px-10 lg:max-w-lg lg:w-full lg:mx-auto lg:px-0 lg:pt-0 lg:pb-24 lg:bg-transparent lg:row-start-1 lg:col-start-2"
          >
            <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
              <h2 id="summary-heading" className="sr-only">
                Order summary
              </h2>

              <ul
                role="list"
                className="text-sm font-medium divide-y divide-white divide-opacity-10"
              > 
                {cart.cartItems.map((product) => (
                  <li
                    key={product.id}
                    className="flex items-start py-6 space-x-4"
                  >
                    <img
                      src={product.image[0]}
                      alt={product.imageAlt}
                      className="flex-none w-20 h-20 rounded-md object-center object-cover"
                    />
                    <div className="flex-auto space-y-1">
                      <h3 className="text-white">{product.name}</h3>
                      <p>{product.color}</p>
                      <p>{product.size[0]}</p>
                    </div>
                    <p className="flex-none text-base font-medium text-white">
                      ₹{product.price}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="text-sm font-medium space-y-6 border-t border-white border-opacity-10 pt-6">
                <div className="flex items-center justify-between">
                  <dt>Subtotal</dt>
                  <dd>₹{cart.cartTotalAmount}.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt>Shipping</dt>
                  <dd>₹250.00</dd>
                </div>

                <div className="flex items-center justify-between">
                  <dt>Taxes</dt>
                  <dd>₹100.00</dd>
                </div>

                <div className="flex items-center justify-between border-t border-white border-opacity-10 text-white pt-6">
                  <dt className="text-base">Total</dt>
                  <dd className="text-base">₹{finalAmount}.00</dd>
                </div>
              </dl>
            </div>
          </section>

          <section
            aria-labelledby="payment-and-shipping-heading"
            className="py-16 lg:max-w-lg lg:w-full lg:mx-auto lg:pt-0 lg:pb-24 lg:row-start-1 lg:col-start-1"
          >
            <h2 id="payment-and-shipping-heading" className="sr-only">
              Payment and shipping details
            </h2>

            <form>
              <div className="max-w-2xl mx-auto px-4 lg:max-w-none lg:px-0">
                <div>
                  <h3
                    id="contact-info-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Contact information
                  </h3>

                  <div className="mt-6">
                    <label
                      htmlFor="email-address"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Email address
                    </label>
                    <div className="mt-1">
                      <Input
                        type="email"
                        id="email-address"
                        name="email-address"
                        autoComplete="email"
                        className="block w-full border-gray-300 rounded-md shadow-sm sm:text-sm"
                      />
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3
                    id="payment-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Payment details
                  </h3>

                  <div className="mt-6 grid grid-cols-3 sm:grid-cols-4 gap-y-6 gap-x-4">
                    <div className="col-span-3 sm:col-span-4">
                      <label
                        htmlFor="card-number"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Card number
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="card-number"
                          name="card-number"
                          autoComplete="cc-number"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div className="col-span-2 sm:col-span-3">
                      <label
                        htmlFor="expiration-date"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Expiration date (MM/YY)
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="expiration-date"
                          id="expiration-date"
                          autoComplete="cc-exp"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="cvc"
                        className="block text-sm font-medium text-gray-700"
                      >
                        CVC
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          name="cvc"
                          id="cvc"
                          autoComplete="csc"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3
                    id="shipping-heading"
                    className="text-lg font-medium text-gray-900"
                  >
                    Shipping address
                  </h3>

                  <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-3">
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="address"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Address
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="address"
                          name="address"
                          autoComplete="street-address"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="city"
                        className="block text-sm font-medium text-gray-700"
                      >
                        City
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="city"
                          name="city"
                          autoComplete="address-level2"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="region"
                        className="block text-sm font-medium text-gray-700"
                      >
                        State / Province
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="region"
                          name="region"
                          autoComplete="address-level1"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>

                    <div>
                      <label
                        htmlFor="postal-code"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Postal code
                      </label>
                      <div className="mt-1">
                        <Input
                          type="text"
                          id="postal-code"
                          name="postal-code"
                          autoComplete="postal-code"
                          className="block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <h3 className="text-lg font-medium text-gray-900">
                    Billing information
                  </h3>

                  <div className="mt-6 flex items-center">
                    <input
                      id="same-as-shipping"
                      name="same-as-shipping"
                      type="checkbox"
                      defaultChecked
                      className="h-4 w-4 border-gray-300 rounded text-slate-800"
                    />
                    <div className="ml-2">
                      <label
                        htmlFor="same-as-shipping"
                        className="text-sm font-medium text-gray-900"
                      >
                        Same as shipping information
                      </label>
                    </div>
                  </div>
                </div>

                <div className="mt-10 flex justify-end pt-6 border-t border-gray-200">
                  <Button type="submit"
                    onClick={checkoutHandler}
                    >Pay now</Button>
                </div>
              </div>
            </form>
          </section>
        </main>
      </div>
    </>
  );
};

export default Checkout;
