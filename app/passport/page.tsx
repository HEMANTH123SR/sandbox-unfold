"use client";

import { useRef, useState } from 'react';
import HTMLFlipBook from 'react-pageflip';
import { PassportCover } from './components/passport/Cover';
import { ProfilePage } from './components/passport/ProfilePage';
import { DevMetricsPage } from './components/passport/DevMetricsPage';
import { AchievementsPage } from './components/passport/AchievementsPage';
import { NFTStampsPage } from './components/passport/NFTStampsPage';

export default function Home() {
  const book = useRef(null);
  const [, setPageNumber] = useState(0);  // Correctly destructured the state

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 to-slate-800 flex items-center justify-center p-8">
      <div className="w-[600px] h-[400px] relative">
        <HTMLFlipBook
          width={300}
          height={400}
          size="stretch"
          minWidth={250}
          maxWidth={300}
          minHeight={350}
          maxHeight={400}
          showCover={true}
          mobileScrollSupport={true}
          className="passport-book"
          ref={book}
          onFlip={(e) => setPageNumber(e.data)}  // Update the page number state on flip
        >
          <PassportCover />
          <ProfilePage />
          <DevMetricsPage />
          <AchievementsPage />
          <NFTStampsPage />
        </HTMLFlipBook>
      </div>
    </div>
  );
}
