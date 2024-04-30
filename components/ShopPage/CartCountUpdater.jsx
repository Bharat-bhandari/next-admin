import { IconButton } from "@material-tailwind/react";
import { FaPlus, FaMinus } from "react-icons/fa6";

const CartCountUpdater = ({ onDecrement, onIncrement, disabled, value }) => {
  return (
    <div
      style={{ opacity: disabled ? "0.5" : "1" }}
      className="flex items-center space-x-2"
    >
      <IconButton disabled={disabled} onClick={onDecrement} variant="text">
        <FaMinus className="w-4 h-4" />
      </IconButton>

      <span className="text-lg font-medium">{value}</span>

      <IconButton disabled={disabled} onClick={onIncrement} variant="text">
        <FaPlus className="w-4 h-4" />
      </IconButton>

      {/* <div className="flex gap-4 w-max">
        <button
          className="relative h-10 max-h-[40px] w-10 max-w-[40px] select-none rounded-lg text-center align-middle font-sans text-xs font-medium uppercase text-white shadow-md shadow-gray-900/10 transition-all hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
          type="button"
          data-ripple-light="true"
        >
          <span class="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2">
            <i className="fas fa-heart" aria-hidden="true"></i>
          </span>
        </button>
      </div> */}
    </div>
  );
};

export default CartCountUpdater;
