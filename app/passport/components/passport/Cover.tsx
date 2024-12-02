import { forwardRef } from 'react';
import { Shield } from 'lucide-react';

export const PassportCover = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div ref={ref} className="page relative bg-gradient-to-br from-amber-800 via-amber-700 to-amber-900 w-full h-full flex flex-col items-center justify-center p-4">
      <div className="absolute inset-0 bg-[url('/passport-pattern.png')] opacity-10" />
      <div className="border-4 border-amber-300 w-full h-full flex flex-col items-center justify-center p-6">
        <Shield className="w-16 h-16 text-amber-300 mb-6" />
        <h1 className="text-2xl font-bold text-amber-300 text-center mb-3">DEVROOT PASSPORT</h1>
        <div className="text-amber-300 text-base text-center">Web3 Identity</div>
      </div>
    </div>
  );
});

PassportCover.displayName = 'PassportCover';