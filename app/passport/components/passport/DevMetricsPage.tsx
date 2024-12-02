import { forwardRef } from 'react';
import { BarChart, GitBranch, GitCommit, GitPullRequest } from 'lucide-react';
import { Page } from './pages/Page';

export const DevMetricsPage = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Page ref={ref}>
      <div className="pt-10 px-2">
        <h2 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-wide">Developer Metrics</h2>
        
        <div className="space-y-4">
          <div className="bg-amber-50/50 rounded p-2 shadow-sm">
            <div className="flex items-center space-x-2 mb-2">
              <GitCommit className="w-4 h-4 text-amber-800" />
              <h3 className="text-sm font-semibold text-amber-900">Activity</h3>
            </div>
            <div className="h-20 bg-amber-50 rounded flex items-end space-x-0.5 p-1">
              {[40, 60, 30, 70, 50, 80, 45].map((height, i) => (
                <div
                  key={i}
                  className="bg-amber-700/60 w-6 rounded-t"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-2">
            <div className="bg-amber-50/50 p-2 rounded shadow-sm">
              <div className="flex items-center space-x-1 mb-1">
                <GitPullRequest className="w-3 h-3 text-amber-800" />
                <span className="text-xs font-semibold text-amber-900">PRs</span>
              </div>
              <div className="text-lg font-bold text-amber-900">156</div>
            </div>

            <div className="bg-amber-50/50 p-2 rounded shadow-sm">
              <div className="flex items-center space-x-1 mb-1">
                <GitBranch className="w-3 h-3 text-amber-800" />
                <span className="text-xs font-semibold text-amber-900">Repos</span>
              </div>
              <div className="text-lg font-bold text-amber-900">23</div>
            </div>

            <div className="bg-amber-50/50 p-2 rounded shadow-sm">
              <div className="flex items-center space-x-1 mb-1">
                <BarChart className="w-3 h-3 text-amber-800" />
                <span className="text-xs font-semibold text-amber-900">Events</span>
              </div>
              <div className="text-lg font-bold text-amber-900">12</div>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
});

DevMetricsPage.displayName = 'DevMetricsPage';