export function Card({ children }) {
  return (
    <div className="border rounded shadow p-2 m-2">{children}</div>
  );
}

export function CardContent({ children }) {
  return (
    <div className="p-4">{children}</div>
  );
}