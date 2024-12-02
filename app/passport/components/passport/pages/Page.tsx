import { forwardRef } from 'react';

export const Page = forwardRef<HTMLDivElement, { children: React.ReactNode }>(
  ({ children }, ref) => {
    return (
      <div ref={ref} className="page bg-[#f4ecd5] w-full h-full p-4">
        <div className="border border-amber-800/20 w-full h-full p-3 bg-[url('/passport-pattern.png')] bg-opacity-5">
          <div className="relative h-full">
            <div className="absolute top-0 left-0 w-full h-8 bg-amber-800/5" />
            {children}
          </div>
        </div>
      </div>
    );
  }
);

Page.displayName = 'Page';