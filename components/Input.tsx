import { BsSearch } from "react-icons/bs";

interface IInput {
  setInput: (i: string, event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = ({ setInput }: IInput) => {
  return (
    <div className="input element">
      <BsSearch />
      <input
        type="text"
        name="search"
        placeholder="Search for a country..."
        onChange={(e) => {
          setInput(e.target.value, e);
        }}
      />
    </div>
  );
};

export default Input;
