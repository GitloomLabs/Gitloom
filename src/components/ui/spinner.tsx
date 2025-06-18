import { cn } from '@/lib/utils';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import * as React from 'react';

const spinnerVariants = cva('relative block opacity-[0.65]', {
  variants: {
    size: {
      default: 'size-4',
      md: 'size-6',
      lg: 'size-8',
    },
  },
  defaultVariants: {
    size: 'default',
  },
});

export interface SpinnerProps
  extends React.HTMLAttributes<HTMLSpanElement>,
    VariantProps<typeof spinnerVariants> {
  loading?: boolean;
  asChild?: boolean;
}

const Spinner = React.forwardRef<HTMLSpanElement, SpinnerProps>(
  ({ className, size, loading = true, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'span';

    const [bgColorClass, filteredClassName] = React.useMemo(() => {
      const bgClass = className?.match(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g) || [];
      const filteredClasses = className?.replace(/(?:dark:bg-|bg-)[a-zA-Z0-9-]+/g, '').trim();
      return [bgClass, filteredClasses];
    }, [className]);

    if (!loading) return null;

    return (
      <Comp
        className={cn(spinnerVariants({ size, className: filteredClassName }))}
        ref={ref}
        {...props}
      >
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="animate-spinner-leaf-fade absolute top-0 left-1/2 h-full w-1/10"
            style={{
              transform: `rotate(${i * 45}deg)`,
              animationDelay: `${-(7 - i) * 100}ms`,
            }}
          >
            <span className={cn('block h-[30%] w-full rounded-full', bgColorClass)}></span>
          </span>
        ))}
      </Comp>
    );
  },
);

Spinner.displayName = 'Spinner';

export { Spinner, spinnerVariants };
