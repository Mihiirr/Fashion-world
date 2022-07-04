import { Cart } from "@prisma/client";
import { Link } from "@remix-run/react";
import Button from "~/components/Button";
import Layout from "~/components/Layout";
import { useRootContext } from "~/context/RootContext";

const Cart = () => {
  const {
    rootState: { cart },
  } = useRootContext();
  return (
    <Layout>
      <div className="min-h-screen mt-20 max-w-7xl mx-auto">
        <p className="text-3xl">Shopping Cart</p>
        {cart.totalCartItems[0]?._count.productId === undefined ? (
          <p>Your shopping bag is empty</p>
        ) : (
          <div className="flex">
            <table className="h-10 w-3/4 p-2.5 mt-5 border-collapse">
              <tbody>
                <tr className="h-16 border-b-2 border-gray-400 text-center">
                  <th>Image</th>
                  <th>Name</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Action</th>
                </tr>
                {cart?.cartItems.map((item) => (
                  <tr
                    key={item.id}
                    className="h-16 border-b-2 border-gray-400 text-center"
                  >
                    <td>
                      <img
                        src="/uploads/upload_897076837.jpg"
                        alt="dress"
                        width={50}
                        height={50}
                      ></img>
                    </td>
                    <td>
                      <Link to={`/product/`}>dress</Link>
                    </td>
                    <td>
                      <select value={10}>
                        {[...Array(10).keys()].map((x) => (
                          <option key={x + 1} value={x + 1}>
                            {x + 1}
                          </option>
                        ))}
                      </select>
                    </td>
                    <td>$200</td>
                    <td>
                      <a href={`/cart/removecartitem/${item.id}`}>
                        <button className="h-8 w-28 bg-red-500 rounded-md text-white">
                          Remove Item
                        </button>
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="h-44 w-80 bg-white shadow-md rounded-md ml-6 p-5">
              <p className="text-xl">Subtotal 200 items:</p>
              <h2>$600</h2>
              <Button variant="secondary">Check Out</Button>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
