import { useState } from "react";
import { BsMoon, BsMoonFill } from "react-icons/bs";
import { useSelector, useDispatch } from "react-redux";
import { setDark } from "../redux/themeSlice";

const Header = () => {
  const theme = useSelector((state: any) => state.theme.value);
  const dispatch = useDispatch();
  const [mode, setMode] = useState(theme);

  return (
    <div className="container element header">
      <h3>Where in the world?</h3>
      <button
        className="color-theme"
        onClick={() => {
          setMode(!mode);
          dispatch(setDark(!mode));
        }}
      >
        {mode ? <BsMoon /> : <BsMoonFill />}
        {mode ? ` Light Mode` : ` Dark Mode`}
      </button>
    </div>
  );
};

export default Header;
