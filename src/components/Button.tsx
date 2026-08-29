import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type MouseEvent, type HTMLAttributeReferrerPolicy } from "react";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger" | "glass" | "glass-dark";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: (e: MouseEvent<HTMLElement>) => void;
  // Anchor attributes:
  target?: string;
  rel?: string;
  referrerPolicy?: HTMLAttributeReferrerPolicy;
}

export const Button = forwardRef<any, ButtonProps>(
  (
    {
      children,
      variant = "primary",
      size = "md",
      href,
      className = "",
      onClick,
      disabled,
      type = "button",
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "font-mono font-semibold uppercase tracking-wider rounded-full transition-all duration-300 inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-slate-900/90 text-white border border-slate-700/80 hover:bg-slate-800 hover:shadow-lg shadow-sm transform hover:-translate-y-0.5 backdrop-blur-md",
      secondary:
        "bg-blue-50/90 text-blue-700 border border-blue-200/90 hover:bg-blue-100 hover:text-blue-800 shadow-xs backdrop-blur-md",
      ghost:
        "bg-white/80 hover:bg-white text-slate-800 hover:text-slate-950 border border-white/80 shadow-xs hover:shadow-md backdrop-blur-md",
      danger:
        "bg-red-50/90 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200/80 backdrop-blur-md",
      glass:
        "liquid-glass-pill text-slate-800 hover:text-blue-600 transform hover:-translate-y-0.5 hover:shadow-md",
      "glass-dark":
        "liquid-glass-dark text-white hover:border-white/40 transform hover:-translate-y-0.5 hover:shadow-lg",
    };

    const hasCustomPadding = /\bp[xy]?-[\d.]+/.test(className);

    const sizeStyles = {
      sm: hasCustomPadding ? "text-xs space-x-1.5" : "px-3.5 py-1.5 text-xs space-x-1.5",
      md: hasCustomPadding ? "text-xs space-x-2" : "px-5 py-2.5 text-xs space-x-2",
      lg: hasCustomPadding ? "text-sm space-x-2.5" : "px-6 py-3 text-sm space-x-2.5",
    };

    const combinedClasses = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`;

    if (href) {
      const anchorProps = props as Omit<AnchorHTMLAttributes<HTMLAnchorElement>, "onClick">;
      return (
        <a
          href={href}
          onClick={onClick as any}
          className={combinedClasses}
          ref={ref}
          {...anchorProps}
        >
          {children}
        </a>
      );
    }

    return (
      <button
        type={type}
        disabled={disabled}
        onClick={onClick as any}
        className={combinedClasses}
        ref={ref}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";
export default Button;
