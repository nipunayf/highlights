// src/components/Footer.tsx
const Footer = () => {
    return (
      <footer className="bg-white shadow-md p-4 text-center">
        <p className="text-sm text-gray-600">
          &copy; {new Date().getFullYear()} Highlights. All rights reserved.
        </p>
      </footer>
    );
};
  
export default Footer;
  