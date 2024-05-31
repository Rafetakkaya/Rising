"use client"; // Client component olduğunu belirtiyoruz
import React, { useState } from "react";
import style from "./sideBar.module.css";
import logo from "../../../../public/assets/img/Rising.png";
import card from "../../../../public/assets/img/card.svg";
import person from "../../../../public/assets/img/default.svg";
import vector from "../../../../public/assets/img/Vector.svg";
import exit from "../../../../public/assets/img/logout.svg";
import Image from "next/image";

const images = [vector, card, person, exit];

const SideBar: React.FC = () => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number>(0);

  const handleItemClick = (index: number) => {
    setSelectedImageIndex(index);
  };

  return (
    <div className={style.sideBar}>
      <Image src={logo} alt="Logo" width="54" height="55" />

      <div className={style.sideBar}>
        {images.map((image, index) => (
          <div
            key={index}
            onClick={() => handleItemClick(index)}
            className={`${style.imageContainer} ${selectedImageIndex === index ? style.selected : ""}`}
          >
            <Image src={image} alt={`Image ${index + 1}`} width="30" height="30" className={style.image} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default SideBar;
