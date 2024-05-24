import React from "react";

const Page = ({
  title,
  containerStyles = "",
  headerStyles = "",
  children,
  enableHeader,
}) => {
  const styles = {
    header:
      "flex justify-between items-center w-full my-2 mb-6 " + headerStyles,
    heading: "text-xl font-semibold truncate",
  };

  return (
    <div
      className={`font-poppins bg-white w-full h-full p-3 pl-4 ${containerStyles}`}
    >
      {enableHeader && (
        <header className={styles.header}>
          <h1 className={styles.heading}>{title}</h1>
        </header>
      )}
      {children}
    </div>
  );
};

export default Page;
