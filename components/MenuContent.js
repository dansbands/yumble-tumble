import { signOut, useSession } from "next-auth/react";
import Link from "next/link";

const MenuContent = ({ isDrawer, darkMode, toggleDarkMode }) => {
  const session = useSession();

  return (
    <>
      {session?.data ? (
        <>
          <Link href="/dashboard" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Dashboard</div>
          </Link>
          <Link href="/profile" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Profile</div>
          </Link>
          <div
            className={isDrawer ? "drawer-link" : "link"}
            onClick={() => signOut()}
          >
            Log Out
          </div>
          <button
            className={isDrawer ? "drawer-link" : "link"}
            onClick={toggleDarkMode}
          >
            {isDrawer
              ? darkMode
                ? "🌙 Dark Mode"
                : "☀️ Light Mode"
              : darkMode
              ? "🌙"
              : "☀️"}
          </button>
        </>
      ) : (
        <>
          <Link href="/signup" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Sign Up</div>
          </Link>
          <Link href="/login" passHref>
            <div className={isDrawer ? "drawer-link" : "link"}>Sign In</div>
          </Link>
        </>
      )}
    </>
  );
};

export default MenuContent;
