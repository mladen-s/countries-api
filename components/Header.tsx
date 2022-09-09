import { useState } from "react";
import { BsMoon, BsMoonFill } from "react-icons/bs";

const Header = () => {
  const [mode, setMode] = useState(false);
  return (
    <div className="container element header">
      <h3>Where in the world?</h3>
      <button className="color-theme">
        {mode ? <BsMoon /> : <BsMoonFill />}
        {mode ? ` Light Mode` : ` Dark Mode`}
      </button>
    </div>
  );
};

export default Header;
