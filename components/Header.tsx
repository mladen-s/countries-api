import { BsMoon, BsMoonFill } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { setDark } from "../redux/themeSlice";

interface IHeader {
  isDark: boolean;
  setIsDark: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ isDark, setIsDark }: IHeader) => {
  const dispatch = useDispatch();

  return (
    <div className="container element header">
      <h3>Where in the world?</h3>
      <button
        className="color-theme"
        onClick={() => {
          setIsDark(!isDark);
          dispatch(setDark(!isDark));
        }}
      >
        {isDark ? <BsMoon /> : <BsMoonFill />}
        {isDark ? ` Light Mode` : ` Dark Mode`}
      </button>
    </div>
  );
};

export default Header;
