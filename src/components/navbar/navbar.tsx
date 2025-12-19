import "./navbar.css";

const Navbar = () => {
  return (
    <nav>
      <img src="/oliver_signiture_logo.png" alt="Logo" height="40" />
      <a href="#about">About</a>
      <a href="#projects">Projects</a>
      {/* <a href="#photography">Photography</a> */}
    </nav>
  );
};

export default Navbar;
