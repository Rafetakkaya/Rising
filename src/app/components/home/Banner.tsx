import { paragraphs } from "@/app/constant/constant";
import React from "react";
import style from "./banner.module.css";
import Image from "next/image";
import close from "../../../../public/assets/img/close.svg";

export default function Banner() {
  return (
    <div className={style.banner}>
      <h4>{paragraphs.header[0]?.text}</h4>
      <Image className={style.Image} src={close} alt={"close"}  />
    </div>
  );
}
