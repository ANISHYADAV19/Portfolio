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
      "font-mono font-semibold uppercase tracking-wider rounded-lg transition-all duration-200 inline-flex items-center justify-center cursor-pointer select-none disabled:opacity-50 disabled:cursor-not-allowed disabled:pointer-events-none";

    const variantStyles = {
      primary:
        "bg-slate-900 text-white border border-slate-900 hover:bg-slate-800 hover:shadow-md shadow-xs transform hover:-translate-y-0.5",
      secondary:
        "bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100/90 hover:text-blue-800",
      ghost:
        "bg-white/80 hover:bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200 shadow-xs",
      danger:
        "bg-red-50 hover:bg-red-100 text-red-600 hover:text-red-700 border border-red-200",
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
