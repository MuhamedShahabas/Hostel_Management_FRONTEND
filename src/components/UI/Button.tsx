interface props {
  type: "button" | "submit" | "reset" | undefined;
  className?: string;
  children?: string;
  onClick?: () => void;
}

function Button({ type, className, children, onClick }: props) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`bg-primary text-white text-center rounded-md p-2 tracking-wider hover:brightness-125 hover:shadow-xl active:shadow-inner active:brightness-100 ${className}`}
    >
      {children}
    </button>
  );
}

export default Button;