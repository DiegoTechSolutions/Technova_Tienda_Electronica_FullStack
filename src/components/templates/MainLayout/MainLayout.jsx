import React from 'react';
import Header from '../../organisms/Header/Header';
import Footer from '../../organisms/Footer/Footer';
import './MainLayout.css';

const MainLayout = ({ children, cartItemsCount, user }) => {
  return (
    <div className="main-layout">
      <Header cartItemsCount={cartItemsCount} user={user} />
      <main className="main-content">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;