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
    </div>
  );
};

export default CartCountUpdater;
