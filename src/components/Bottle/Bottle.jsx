import "./Bottle.css";
import PropTypes from "prop-types";
const Bottle = ({ bottle, handleAddToCart }) => {
    const { name, img, price, stock } = bottle;
    return (
        <div className="bottle">
            <h3>{name}</h3>
            <img src={img} alt="" />
            <p>Price: {price}</p>
            <p>Stock: {stock}</p>
            <button onClick={() => handleAddToCart(bottle)}>Purchase</button>
        </div>
    );
};

Bottle.propTypes = {
    bottle: PropTypes.object.isRequired,
    handleAddToCart: PropTypes.func,
};

export default Bottle;
