import React from 'react';

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen bg-background text-foreground  flex flex-col">
      <main className="flex-grow p-4">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
