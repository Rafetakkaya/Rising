import { paragraphs } from "@/app/constant/constant";
import React from "react";
import style from "./banner.module.css";
import Image from "next/image";
import close from "../../../../public/assets/img/close.svg";

export default function Banner() {
  return (
    <div className={style.banner}>
      <div className={style.bannerMain}>
      <span className={style.bannertext}>{paragraphs.header[0]?.text}</span>
      <span className={style.bannerfree}>{paragraphs.header[1]?.free}</span>
      </div>
      <Image className={style.Image} src={close} alt={"close"}  />
    </div>
  );
}
