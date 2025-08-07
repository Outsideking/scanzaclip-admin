export function Button({ children, onClick, variant }) {
  return (
    <button
      onClick={onClick}
      className={variant === 'outline' ? 'border px-4 py-2 rounded' : 'bg-blue-600 text-white px-4 py-2 rounded'}
    >
      {children}
    </button>
  );
}