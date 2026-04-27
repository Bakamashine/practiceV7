import React from "react";

interface LoaderProps {
  size?: "sm" | "md" | "lg";
  color?: string;
  text?: string;
  className?: string;
}

const sizeMap = {
  sm: "spinner-border-sm",
  md: "",
  lg: "spinner-border-lg",
};

export const Loader: React.FC<LoaderProps> = ({
  size = "md",
  color = "primary",
  text,
  className = "",
}) => {
  return (
    <div className={`d-flex flex-column align-items-center justify-content-center ${className}`}>
      <div
        className={`spinner-border text-${color} ${sizeMap[size]}`}
        role="status"
      >
        <span className="visually-hidden">Загрузка...</span>
      </div>
      {text && <p className="mt-2 text-muted">{text}</p>}
    </div>
  );
};

export const LoaderOverlay: React.FC<{ text?: string }> = ({ text }) => {
  return (
    <div className="position-absolute top-0 start-0 w-100 h-100 bg-white bg-opacity-75 d-flex align-items-center justify-content-center">
      <Loader text={text} />
    </div>
  );
};

export default Loader;