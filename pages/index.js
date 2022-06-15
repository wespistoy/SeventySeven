import React, { useEffect, useState } from 'react';
import Product from "../components/Product";

import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';

const TWITTER_HANDLE = "degensevenseven";
const TWITTER_LINK = `https://twitter.com/${TWITTER_HANDLE}`;

const App = () => {
  const { publicKey } = useWallet();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (publicKey) {
      fetch(`/api/fetchProducts`)
        .then(response => response.json())
        .then(data => {
          setProducts(data);
          console.log("Products", data);
        });
    }
  }, [publicKey]);

  const renderNotConnectedContainer = () => (
    <div>
        <img alt="lamia" className="lamia" src="lamia.jpg" />

      <div className="button-container">
        <WalletMultiButton className="cta-button connect-wallet-button" />
      </div>    
    </div>
  );

  const renderItemBuyContainer = () => (
    <div className="products-container">
      {products.map((product) => (
        <Product key={product.id} product={product} />
      ))}
    </div>
  );

  return (
    <div className="App">
      <div className="container">
        <header className="header-container">
          <p className="header">SevenSeven</p>
        </header>

        <main>
        {publicKey ? renderItemBuyContainer() : renderNotConnectedContainer()}
        </main>

        <div className="footer-container">
          <a href="https://magiceden.io/marketplace/degen_coin_flip" target="_blank" rel="noopener noreferrer" class="cursor-pointer me-2">
            <img src="https://i.imgur.com/KRuxULB.png" class="rounded mt-1" style="width: 32px; height: 20px;">
           </a>
        </div>
      </div>
    </div>
  );
};

export default App;
