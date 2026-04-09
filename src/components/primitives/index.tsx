import React from 'react';

// Button
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'danger';
}
export const Button: React.FC<ButtonProps> = ({ variant = 'primary', className, ...props }) => {
  return <button className={`btn btn-${variant} ${className || ''}`} {...props} />;
};

// Input
interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}
export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className, ...props }, ref) => {
    return (
      <div className={`input-group ${className || ''}`}>
        {label && <label>{label}</label>}
        <input ref={ref} className="input-field" {...props} />
        {error && <span className="input-error">{error}</span>}
      </div>
    );
  }
);
Input.displayName = 'Input';

// Card
export const Card: React.FC<React.HTMLAttributes<HTMLDivElement>> = ({ className, children, ...props }) => {
  return (
    <div className={`card ${className || ''}`} {...props}>
      {children}
    </div>
  );
};
