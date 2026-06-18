import './Card.css';

export default function Card({
  children,
  className = '',
  hover = true,
  padding = 'md',
  ...props
}) {
  const classes = [
    'card',
    `card--pad-${padding}`,
    hover ? 'card--hover' : '',
    className,
  ].filter(Boolean).join(' ');

  return (
    <div className={classes} {...props}>
      {children}
    </div>
  );
}
