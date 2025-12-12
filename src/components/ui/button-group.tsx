import * as React from "react";

interface ButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({ children, className }) => {
  return (
    <div className={`inline-flex rounded-lg overflow-hidden ${className}`}>
      {React.Children.map(children, (child, idx) => (
        <div key={idx} className={idx > 0 ? "-ml-px" : ""}>
          {child}
        </div>
      ))}
    </div>
  );
};
