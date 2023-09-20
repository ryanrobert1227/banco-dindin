import logo from "../../assets/Group.svg";

import { LogoCSS } from "./Logo";

export default function Logo(props: any) {
  const { setOpenLoginModal, page } = props;

  return (
    <LogoCSS>
      <div className="logotipo">
        <img src={logo} />
        <h1>Dindin</h1>
      </div>
      {page ? (
        <button
          onClick={() => setOpenLoginModal((prev: boolean) => !prev)}
          className="mobile"
        >
          Sign In
        </button>
      ) : (
        <></>
      )}
    </LogoCSS>
  );
}
