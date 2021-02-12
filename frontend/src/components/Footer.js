import React from "react";
import { Link } from "react-router-dom";
import Container from "./common/Container";
import { ReactComponent as AppStoreBadge } from "./../assets/app-store-badge.svg";
import { ReactComponent as GooglePlayBadge } from "./../assets/google-play-badge.svg";

const Footer = () => {
  return (
    <footer className="bg-gray-900 w-full py-20">
      <Container>
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex justify-between w-full md:w-3/5">
            <div className="w-1/3">
              <FooterTitle className="">Company Info</FooterTitle>
              <ul className="flex flex-col">
                <FooterLink to="/">About</FooterLink>
                <FooterLink to="/">Blog</FooterLink>
                <FooterLink to="/">Help Center</FooterLink>
                <FooterLink to="/">Security</FooterLink>
                <FooterLink to="/">Privacy Policy</FooterLink>
                <FooterLink to="/">Terms of Service</FooterLink>
              </ul>
            </div>
            <div className="w-1/3">
              <FooterTitle className="font-extrabold text-white mb-2">
                Follow Us
              </FooterTitle>
              <ul className="flex flex-col">
                <FooterLink to="https://facebook.com">Facebook</FooterLink>
                <FooterLink to="https://twitter.com">Twitter</FooterLink>
                <FooterLink to="https://youtube.com">YouTube</FooterLink>
              </ul>
            </div>
          </div>
          <div className="w-full mt-10 md:mt-0 md:w-2/5 flex">
            <a href="/" target="_blank" className="bloc w-2/4 mr-5">
              <AppStoreBadge />
            </a>
            <a href="/" target="_blank" className="w-2/4">
              <GooglePlayBadge />
            </a>
          </div>
        </div>
        <div className="mt-10">
          <p className="text-white text-xs">
            &copy; 2021 - Finelth.com All right reserved. Product name, logo,
            brands, and other trademarks featured or referred to within Finelth
            are the property of their respective trademark holders. This site
            may be compensated through third party advertisers.
          </p>
          <p className="text-white text-xs mt-5">
            iPhone is a trademark of Apple Inc., registered in the U.S. and
            other countries. App Store is a service mark of Apple Inc.
          </p>
          <p className="text-white text-xs mt-5">
            Google Play and the Google Play logo are trademarks of Google LLC.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export const FooterTitle = ({ children, href, className, ...restOfProps }) => (
  <h4
    className={`font-extrabold text-lg text-white mb-5 ${className}`}
    {...restOfProps}
  >
    {children}
  </h4>
);

export const FooterLink = ({
  children,
  to,
  className = "",
  ...restOfProps
}) => (
  <Link
    className={`text-white text-lg leading-10 py-1 text-gray-300 hover:text-white transition-colors duration-300 w-max ${className}`}
    to={to}
    {...restOfProps}
  >
    {children}
  </Link>
);

export default Footer;
