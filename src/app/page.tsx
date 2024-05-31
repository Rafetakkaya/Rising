"use client"
import Image from "next/image";
import { Aside, Grid, Header, Main, Nav } from "./components/grid/grid";
import Banner from "./components/home/Banner";
import Navbar from "./components/home/Navbar";
import SideBar from "./components/home/SideBar";
import Menu from "./components/home/Menu";
import style from "./app.module.css";
import { useRouter } from "next/navigation";
import Login from "./login/page";
import { useEffect } from "react";
import { useAtomValue } from "jotai";
import { jwtAtom } from "./utils/atoms";

export default function Home() {
  
  const router = useRouter();
 const useJWT=useAtomValue(jwtAtom)
 useEffect(()=>{

 },[useJWT])

const token = localStorage.getItem("jwt");

  return (
    <div className={style.appHeader}>
      {token ? (  
        <Grid>
          <Aside>
            <SideBar />
          </Aside>
          <Header>
            <Banner />
          </Header>
          <Nav>
            <Navbar />
          </Nav>
          <Main>
            <Menu />
          </Main>
        </Grid>
      ) : (
        <Login />
      )}
    </div>
  );
}
