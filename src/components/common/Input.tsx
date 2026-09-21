import { forwardRef, type ReactNode, type InputHTMLAttributes } from 'react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className = '', ...props }, ref) => {
    return (
      <div className="flex flex-col gap-1.5 w-full">
        {label && (
          <label className="text-sm font-medium text-text-secondary">
            {label}
          </label>
        )}
        <div className="relative flex items-center">
          {icon && (
            <div className="absolute left-3 text-text-muted">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            className={`w-full bg-surface border border-border rounded-lg py-3 text-text-primary placeholder:text-text-muted focus:border-primary focus:ring-1 focus:ring-primary/50 outline-none transition-all ${
              icon ? 'pl-10 pr-4' : 'px-4'
            } ${error ? 'border-negative focus:border-negative focus:ring-negative/50' : ''} ${className}`}
            {...props}
          />
        </div>
        {error && (
          <span className="text-sm text-negative">
            {error}
          </span>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
