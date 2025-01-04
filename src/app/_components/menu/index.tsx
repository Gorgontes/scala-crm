"use client";

import Link from "next/link";

export const Menu = () => {

  return (
    <nav className="menu">
      <ul>
        {/* {menuItems.map((item) => (
          <li key={item.key}>
            <Link
              href={item.route ?? "/"}
              className={selectedKey === item.key ? "active" : ""}
            >
              {item.label}
            </Link>
          </li>
        ))} */}
      </ul>
      <button>Logout</button>
    </nav>
  );
};
