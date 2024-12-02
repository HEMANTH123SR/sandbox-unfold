"use client";

import { useRef, useState } from "react";
import HTMLFlipBook from "react-pageflip";
import { PassportCover } from "./components/passport/Cover";
import { ProfilePage } from "./components/passport/ProfilePage";
import { DevMetricsPage } from "./components/passport/DevMetricsPage";
import { AchievementsPage } from "./components/passport/AchievementsPage";
import { NFTStampsPage } from "./components/passport/NFTStampsPage";

export default function Home() {
  const book = useRef(null);
  const [pageNumber, setPageNumber] = useState(0);

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
          onFlip={(e) => setPageNumber(e.data)}
          style={{}}
          startPage={0}
          drawShadow={true}
          flippingTime={1000}
          usePortrait={true}
          startZIndex={0}
          autoSize={true}
          maxShadowOpacity={1}
          showPageCorners={true}
          disableFlipByClick={false}
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
