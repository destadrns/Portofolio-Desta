import { forwardRef } from 'react';
import './Button.css';

const Button = forwardRef(({
  children,
  variant = 'primary',
  size = 'md',
  href,
  onClick,
  icon: Icon,
  iconRight: IconRight,
  className = '',
  ...props
}, ref) => {
  const classes = `btn btn--${variant} btn--${size} ${className}`.trim();

  if (href) {
    return (
      <a ref={ref} href={href} className={classes} onClick={onClick} {...props}>
        {Icon && <Icon size={18} />}
        <span>{children}</span>
        {IconRight && <IconRight size={18} />}
      </a>
    );
  }

  return (
    <button ref={ref} className={classes} onClick={onClick} {...props}>
      {Icon && <Icon size={18} />}
      <span>{children}</span>
      {IconRight && <IconRight size={18} />}
    </button>
  );
});

Button.displayName = 'Button';

export default Button;
