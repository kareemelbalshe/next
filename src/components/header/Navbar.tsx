"use client";
import Link from "next/link";
import React, { useState } from "react";
import { GrTechnology } from "react-icons/gr";
import styles from "./header.module.css";
import { AiOutlineMenu } from "react-icons/ai";
import { IoMdClose } from "react-icons/io";

interface NavbarProps {
  isAdmin : boolean;
}
const Navbar = ({ isAdmin }: NavbarProps) => {
  const [toggle, setToggle] = useState(false);
  return (
    <nav className={styles.navbar}>
      <div>
        <Link href="/" className={styles.logo}>
          kareem <GrTechnology />
        </Link>
        <div className={styles.menu}>
          {toggle ? (
            <IoMdClose onClick={() => setToggle((prev) => !prev)} />
          ) : (
            <AiOutlineMenu onClick={() => setToggle((prev) => !prev)} />
          )}
        </div>
      </div>
      <div
        className={styles.navLinksWrapper}
        style={{
          clipPath: (toggle && "polygon(0 0,100% 0,100% 100%,0 100%)") || "",
        }}
      >
        <ul className={styles.navLinks}>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/"
          >
            home
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/articles?pageNumber=1"
          >
            articles
          </Link>
          <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/about"
          >
            about
          </Link>
          {
            isAdmin && (
              <Link
            onClick={() => setToggle(false)}
            className={styles.navLink}
            href="/admin"
          >
            Admin Dashboard
          </Link>
            )
          }
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
