import { type Dispatch, type SetStateAction, useId } from "react";

interface Props {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  label?: string;
  type?: "text" | "number";
  className?: string;
}

export const Input = ({
  value,
  setValue,
  label,
  type = "text",
  className,
}: Props) => {
  const id = useId();

  return (
    <div className={className}>
      {label && (
        <label
          htmlFor={id}
          className="block mb-1 font-semibold text-gray-700 text-sm"
        >
          {label}
        </label>
      )}

      <input
        id={id}
        type={type}
        className="border border-gray-700 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
    </div>
  );
};
