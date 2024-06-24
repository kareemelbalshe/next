import Link from "next/link";
import React from "react";
import styles from "./header.module.css";
import Navbar from "./Navbar";
import { cookies } from "next/headers";
import { verifyTokenForPage } from "@/utils/verifyToken";
import LogoutButton from "./LogoutButton";

const Header = () => {
  const token = cookies().get("jwtToken")?.value || "";
  const payload = verifyTokenForPage(token);
  return (
    <header className={styles.header}>
      <Navbar isAdmin={payload?.isAdmin||false} />
      <div className={styles.right}>
        {payload ? (
          <>
          <strong className="text-blue-800 md:text-xl capitalize">
            {payload?.username}
          </strong>
          <LogoutButton/>
          </>
        ) : (
          <>
            <Link className={styles.btn} href="/login">
              login
            </Link>
            <Link className={styles.btn} href="/register">
              register
            </Link>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
