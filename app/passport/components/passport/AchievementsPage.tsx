import { forwardRef } from 'react';
import { Award, Star, Trophy } from 'lucide-react';
import { Page } from './pages/Page';

export const AchievementsPage = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Page ref={ref}>
      <div className="pt-10 px-2">
        <h2 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-wide">Achievements</h2>
        
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-amber-50/50 p-2 rounded shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-semibold text-amber-900">Arctic Code Vault</h3>
            </div>
            <p className="text-xs text-amber-800">2020 GitHub Archive Program</p>
          </div>

          <div className="bg-amber-50/50 p-2 rounded shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Trophy className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-semibold text-amber-900">Pull Shark</h3>
            </div>
            <p className="text-xs text-amber-800">100+ merged pull requests</p>
          </div>

          <div className="bg-amber-50/50 p-2 rounded shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Award className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-semibold text-amber-900">YOLO</h3>
            </div>
            <p className="text-xs text-amber-800">100+ PRs without review</p>
          </div>

          <div className="bg-amber-50/50 p-2 rounded shadow-sm">
            <div className="flex items-center space-x-2 mb-1">
              <Star className="w-4 h-4 text-amber-800" />
              <h3 className="text-xs font-semibold text-amber-900">Pair Expert</h3>
            </div>
            <p className="text-xs text-amber-800">Coauthored PRs</p>
          </div>
        </div>
      </div>
    </Page>
  );
});

AchievementsPage.displayName = 'AchievementsPage';