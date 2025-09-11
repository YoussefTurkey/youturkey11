import Link from "next/link";

type TBtns = {
  children: React.ReactNode;
  style?: string;
  action?: () => void;
  href?: string;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
};

const Btns = ({
  style,
  children,
  action,
  href,
  type = "button",
  disabled,
}: TBtns) => {
  if (href) {
    return (
      <Link
        href={href}
        onClick={action}
        className={`${style} w-full sm:w-fit rounded-lg py-2 px-6 cursor-pointer transition-colors`}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={action}
      className={`${style} w-full sm:w-fit rounded-lg py-2 px-6 cursor-pointer transition-colors ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      }`}
    >
      {children}
    </button>
  );
};

export default Btns;
