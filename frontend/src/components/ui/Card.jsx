// components/ui/card.jsx
import React from 'react';

export const Card = ({ className = '', children, ...props }) => (
  <div 
    className={`bg-white rounded-lg border border-gray-200 shadow-sm ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardHeader = ({ className = '', children, ...props }) => (
  <div 
    className={`p-6 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

export const CardTitle = ({ className = '', children, ...props }) => (
  <h3 
    className={`text-2xl font-semibold leading-none tracking-tight ${className}`} 
    {...props}
  >
    {children}
  </h3>
);

export const CardContent = ({ className = '', children, ...props }) => (
  <div 
    className={`p-6 pt-0 ${className}`} 
    {...props}
  >
    {children}
  </div>
);

// components/ui/badge.jsx
export const Badge = ({ 
  children, 
  variant = 'default', 
  className = '', 
  ...props 
}) => {
  const baseStyles = "inline-flex items-center rounded-full px-3 py-1 text-sm font-medium ring-1 ring-inset ";
  
  const variants = {
    default: "bg-gray-100 text-gray-700 ring-gray-200/40",
    success: "bg-green-100 text-green-700 ring-green-200/40",
    secondary: "bg-gray-100 text-gray-700 ring-gray-200/40",
    destructive: "bg-red-100 text-red-700 ring-red-200/40",
  };

  return (
    <span 
      className={`${baseStyles} ${variants[variant]} ${className}`} 
      {...props}
    >
      {children}
    </span>
  );
};

// components/ui/input.jsx
export const Input = React.forwardRef(({ 
  className = '', 
  type = 'text', 
  ...props 
}, ref) => {
  return (
    <input
      type={type}
      className={`
        flex h-10 w-full rounded-md border border-gray-200 
        bg-white px-3 py-2 text-sm 
        file:border-0 file:bg-transparent file:text-sm file:font-medium 
        placeholder:text-gray-500 
        focus-visible:outline-none focus-visible:ring-2 
        focus-visible:ring-blue-500 
        disabled:cursor-not-allowed disabled:opacity-50
        ${className}
      `}
      ref={ref}
      {...props}
    />
  );
});

Input.displayName = 'Input';

// components/ui/button.jsx
export const Button = React.forwardRef(({ 
  className = '', 
  variant = 'default', 
  size = 'default', 
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:pointer-events-none disabled:opacity-50";
  
  const variants = {
    default: "bg-blue-500 text-white hover:bg-blue-600",
    secondary: "bg-gray-100 text-gray-900 hover:bg-gray-200",
    destructive: "bg-red-500 text-white hover:bg-red-600",
    outline: "border border-gray-200 bg-white hover:bg-gray-100",
    ghost: "hover:bg-gray-100",
    link: "text-blue-500 underline-offset-4 hover:underline",
  };

  const sizes = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10",
  };

  return (
    <button
      className={`
        ${baseStyles} 
        ${variants[variant]} 
        ${sizes[size]} 
        ${className}
      `}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';

// components/ui/form.jsx
export const Label = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <label
      ref={ref}
      className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
});

Label.displayName = 'Label';

export const FormItem = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`space-y-2 ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

FormItem.displayName = 'FormItem';

export const FormLabel = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <Label
      ref={ref}
      className={className}
      {...props}
    >
      {children}
    </Label>
  );
});

FormLabel.displayName = 'FormLabel';

export const FormControl = React.forwardRef(({ 
  className = '', 
  children, 
  ...props 
}, ref) => {
  return (
    <div
      ref={ref}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </div>
  );
});

FormControl.displayName = 'FormControl';

// Usage example of how these components work together:
