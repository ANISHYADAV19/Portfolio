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
        "bg-blue-600/80 text-white border border-blue-400/50 hover:bg-blue-500 hover:shadow-lg shadow-sm transform hover:-translate-y-0.5 backdrop-blur-md",
      secondary:
        "bg-white/10 text-white border border-white/20 hover:bg-white/20 hover:text-white shadow-xs backdrop-blur-md",
      ghost:
        "bg-white/5 hover:bg-white/15 text-slate-200 hover:text-white border border-white/15 shadow-xs backdrop-blur-md",
      danger:
        "bg-red-500/20 hover:bg-red-500/30 text-red-300 hover:text-red-200 border border-red-400/40 backdrop-blur-md",
      glass:
        "liquid-glass-pill text-slate-100 hover:text-white transform hover:-translate-y-0.5 hover:shadow-md",
      "glass-dark":
        "liquid-glass-card text-white hover:border-white/40 transform hover:-translate-y-0.5 hover:shadow-lg",
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
