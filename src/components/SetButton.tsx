export default function SetButton({ onClick }: { onClick: () => void }) {
  return (
    <button
      type="button"
      className="bg-[rgb(0,140,180)] text-white px-4 py-2 rounded"
      onClick={onClick}
    >
      Set
    </button>
  );
}
