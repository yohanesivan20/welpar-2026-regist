export default function Navbar() {
  return (
    <header className="h-16 border-b border-[#222] bg-[#111] px-6 flex items-center justify-between">
      <div>
        <h2 className="font-semibold text-lg">
          Event Dashboard
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full bg-pink-500 flex items-center justify-center font-bold">
          A
        </div>
      </div>
    </header>
  );
}