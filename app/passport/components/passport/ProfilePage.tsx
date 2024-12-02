"use client"
import { forwardRef, useEffect, useState } from 'react';
import { Github, Linkedin, Mail, Twitter } from 'lucide-react';
import { Page } from './pages/Page';
import {ethers} from "ethers"
import abi from "./abi.json"
import { Hackathon} from "@/app/hacker/[slug]/lib/interface"
import { Alchemy, Network } from "alchemy-sdk";



export const ProfilePage = forwardRef<HTMLDivElement>((props, ref) => {
  const [isloading,setIsLoading]=useState<Boolean>(true);
const [userData,setData]=useState<Hackathon|null>(null);



  const provider = new ethers.JsonRpcProvider("https://eth-sepolia.g.alchemy.com/v2/OgX2oq12FWRTYy5zEJj9_5BHxL_JktB0");
  const contractAddress = "0x77135e67dAb7b43470ee5e97d418041DC9c05F05";
  const privateKey = "10e82a868207c1fabe14201d66cca97c10b85bc328b52dde4f4f10de0b0a3fc8";
  const wallet = new ethers.Wallet(privateKey).connect(provider);
  const contract = new ethers.Contract(contractAddress, abi, provider) as any;

  
  

  async function mintCheck() {
    try {
          const connectedContract = contract.connect(wallet);
          const tx = await connectedContract.mintNFT(
              "0xb1F77169bd3e7374398d65543474a54d49065C01", 
              8, 
              "https://silver-tricky-trout-945.mypinata.cloud/ipfs/QmRosoLFCzQ8uu1yHJBy2eZHYuoHFd7xsN6uA5cfsVv26S?pinataGatewayToken=xa1kv813KDFJ0B3ul8bJJt1pZYcwToJinFAmmTYSGSt_wTa7FWX7tBbH8niGgyxx", // Metadata URI
              {
                  gasLimit: 1000000
              }
          );

          const receipt = await tx.wait();
          console.log("Transaction successful! Hash:", receipt);
      } catch (error) {
          console.error("Transaction failed:", error);
      }
  }

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