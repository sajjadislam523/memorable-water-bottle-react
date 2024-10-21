import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import "./Bottles.css";
import {
    addToLS,
    getStoredCart,
    removeFromLS,
} from "../../utilities/localstorage";
import Cart from "../Cart/Cart";

const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    const fetchDataFromApi = async () => {
        const res = await fetch("bottles.json");
        const data = await res.json();
        setBottles(data);
    };

    const handleAddToCart = (bottle) => {
        if (bottle.stock === 0) {
            alert("Stock is empty!");
            return;
        }

        setCart([...cart, bottle]);
        addToLS(bottle.id);
        bottle.stock -= 1;
    };

    const handleRemoveFromCart = (id) => {
        // from ui
        const remainingCart = cart.filter((bottle) => bottle.id !== id);
        setCart(remainingCart);
        // from ls
        removeFromLS(id);
    };

    useEffect(() => {
        fetchDataFromApi();
    }, []);

    useEffect(() => {
        console.log("called the useEffect", bottles.length);
        if (bottles.length > 0) {
            const storedCart = getStoredCart();
            console.log(storedCart);

            const savedCart = [];
            for (const id of storedCart) {
                console.log(id);
                const bottle = bottles.find((bottle) => bottle.id === id);
                if (bottle) {
                    savedCart.push(bottle);
                }
            }
            console.log("saved cart", savedCart);
            setCart(savedCart);
        }
    }, [bottles]);

    return (
        <div>
            <h3>Bottles: {bottles.length} </h3>
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart} />
            <div className="bottle-container">
                {bottles.map((bottle) => (
                    <Bottle
                        key={bottle.id}
                        bottle={bottle}
                        handleAddToCart={handleAddToCart}
                    />
                ))}
            </div>
        </div>
    );
};

export default Bottles;
