import PowerShell from "./PowerShell";

export default function DevSetupWindow({ onComplete }) {
  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="w-[900px] max-w-[95vw] h-[500px] rounded-lg overflow-hidden shadow-2xl border border-white/10 bg-[#0c0c0c] flex">
        
        {/* LEFT — Instructions */}
        <div className="w-1/3 border-r border-white/10 p-6 text-sm font-mono text-gray-300">
          <h2 className="text-white mb-4 text-base">
            Project Setup
          </h2>

          <ol className="space-y-3 list-decimal list-inside">
            <li>
              Install dependencies
              <div className="mt-1 text-green-400">
                npm install
              </div>
            </li>

            <li>
              Start dev server
              <div className="mt-1 text-green-400">
                npm run dev
              </div>
            </li>
          </ol>

          <div className="mt-6 text-xs text-gray-500">
            Type the commands in the terminal to continue.
          </div>
        </div>

        {/* RIGHT — Terminal */}
        <div className="flex-1">
          <PowerShell onRunDev={onComplete} />
        </div>
      </div>
    </div>
  );
}
