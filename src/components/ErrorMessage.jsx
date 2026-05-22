export default function ErrorMessage({ message, onDismiss }) {
  return (
    <div className="flex justify-between items-center bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mt-4">
      <span>{message}</span>
      <button onClick={onDismiss} className="ml-4 font-bold text-red-500 hover:text-red-700">✕</button>
    </div>
  );
}