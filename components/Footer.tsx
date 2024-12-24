import Link from "next/link";
import React from "react";

const links = ["About", "Privacy Policy", "Licensing", "Contacts"];

export const Footer = () => {
  return (
    <div className="footer">
      <p>&copy; 2024. No rights reserved at all 🫶 </p>
      <div className="footer__links">
        {links.map((link, index) => (
          <Link
            key={index}
            href={`${link.toLowerCase().replace(" ", "-")}`}
            className="footer__link"
          >
            {link}
          </Link>
        ))}
      </div>
    </div>
  );
};
