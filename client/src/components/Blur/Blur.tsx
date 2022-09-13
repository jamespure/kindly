import { FC } from "react";
import colors from "../../sass/abstracts/_colors.module.scss";

const Blur: FC = () => {
  return (
    <>
      <div className="blur" style={{ bottom: "-384px", left: "-350px" }}></div>
      <div
        className="blur"
        style={{
          top: "-184px",
          right: "-500px",
          background: colors.light_pink_color,
        }}
      ></div>
    </>
  );
};

export default Blur;
