export const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-white dark:bg-gray-900 p-4 pb-0 h-full shadow-md max-w-screen-lg mx-auto min-h-full">
      {children}
    </div>
  );
}