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
          let input = e.target.value;

          // regexp for accepting only letters and spaces
          const re = RegExp(`[^A-Za-z]\s`);
          if (re.test(input)) {
            e.target.value = e.target.value.replace(re, "");
            input = e.target.value;
          }

          setInput(input, e);
        }}
      />
    </div>
  );
};

export default Input;
