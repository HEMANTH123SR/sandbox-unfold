import { forwardRef } from 'react';
import { Page } from './pages/Page';

export const NFTStampsPage = forwardRef<HTMLDivElement>((props, ref) => {
  const stamps = [
    {
      id: 1,
      name: "ETHGlobal London",
      date: "2024",
      image: "https://images.unsplash.com/photo-1520333789090-1afc82db536a?w=200&h=200&fit=crop"
    },
    {
      id: 2,
      name: "Devfolio Hackathon",
      date: "2023",
      image: "https://images.unsplash.com/photo-1496096265110-f83ad7f96608?w=200&h=200&fit=crop"
    },
    {
      id: 3,
      name: "Web3 Summit",
      date: "2023",
      image: "https://images.unsplash.com/photo-1561489413-985b06da5bee?w=200&h=200&fit=crop"
    }
  ];

  return (
    <Page ref={ref}>
      <div className="pt-10 px-2">
        <h2 className="text-lg font-bold text-amber-900 mb-4 uppercase tracking-wide">NFT Stamps</h2>
        
        <div className="grid grid-cols-2 gap-3">
          {stamps.map((stamp) => (
            <div key={stamp.id} className="relative group">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-amber-600 to-amber-800 rounded blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200" />
              <div className="relative bg-amber-50/50 rounded p-2">
                <img
                  src={stamp.image}
                  alt={stamp.name}
                  className="w-full h-20 object-cover rounded mb-2"
                />
                <h3 className="text-xs font-semibold text-amber-900">{stamp.name}</h3>
                <p className="text-xs text-amber-800">{stamp.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Page>
  );
});

NFTStampsPage.displayName = 'NFTStampsPage';