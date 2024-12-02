import { forwardRef } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Page } from './pages/Page';

export const ProfilePage = forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <Page ref={ref}>
      <div className="pt-10 px-2">
        <h2 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-wide">Developer Profile</h2>
        
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <img
              src="https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=400&h=400&fit=crop"
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-amber-800/20"
            />
            <div>
              <h3 className="text-base font-bold text-amber-900">John Doe</h3>
              <p className="text-sm text-amber-800">Full Stack Developer</p>
            </div>
          </div>

          <div className="space-y-2 mt-4 text-sm">
            <div className="flex items-center space-x-2">
              <div className="w-20 text-amber-800">Wallet:</div>
              <div className="text-amber-900 font-mono text-xs">0x1234...5678</div>
            </div>

            <div className="flex items-center space-x-2">
              <Mail className="w-3 h-3 text-amber-800" />
              <a href="mailto:john@example.com" className="text-amber-900 hover:underline">
                john@example.com
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Github className="w-3 h-3 text-amber-800" />
              <a href="https://github.com/johndoe" className="text-amber-900 hover:underline">
                github.com/johndoe
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Linkedin className="w-3 h-3 text-amber-800" />
              <a href="https://linkedin.com/in/johndoe" className="text-amber-900 hover:underline">
                linkedin.com/in/johndoe
              </a>
            </div>

            <div className="flex items-center space-x-2">
              <Twitter className="w-3 h-3 text-amber-800" />
              <a href="https://twitter.com/johndoe" className="text-amber-900 hover:underline">
                @johndoe
              </a>
            </div>
          </div>
        </div>
      </div>
    </Page>
  );
});

ProfilePage.displayName = 'ProfilePage';