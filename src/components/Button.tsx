import { forwardRef, type ReactNode, type ButtonHTMLAttributes, type AnchorHTMLAttributes, type MouseEvent, type HTMLAttributeReferrerPolicy } from "react";

export interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "onClick"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "danger";
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
      "font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-300 inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-gradient-to-r from-cyber-blue to-blue-600 text-white border border-cyber-blue/40 hover:from-blue-500 hover:to-cyber-blue hover:shadow-lg hover:shadow-cyber-blue/20 transform hover:-translate-y-0.5",
      secondary:
        "bg-cyber-blue/10 text-cyber-blue border border-cyber-blue/30 hover:bg-cyber-blue/20 hover:border-cyber-blue hover:text-white",
      ghost:
        "bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white border border-white/10 hover:border-cyber-blue/40",
      danger:
        "bg-red-500/10 hover:bg-red-500/20 text-red-400 hover:text-red-300 border border-red-500/30",
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
