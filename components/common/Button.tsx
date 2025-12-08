// components/common/Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'outline';
  fullWidth?: boolean;
  children: React.ReactNode;
}

export default function Button({ 
  variant = 'primary', 
  fullWidth = false, 
  children, 
  className = "", 
  ...props 
}: ButtonProps) {
  const baseStyles = "px-6 py-2 rounded font-medium text-sm transition-all duration-200 flex items-center justify-center";
  
  const variants = {
    primary: "bg-red-600 text-white hover:bg-red-700 shadow-sm hover:shadow",
    outline: "border border-gray-300 text-gray-700 hover:border-red-600 hover:text-red-600 bg-transparent"
  };

  return (
    <button 
      className={`${baseStyles} ${variants[variant]} ${fullWidth ? 'w-full' : ''} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}