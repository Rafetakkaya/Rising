import Image from "next/image";
import { Aside, Grid, Header, Main, Nav } from "./components/grid/grid";
import Banner from "./components/home/Banner";
import Navbar from "./components/home/Navbar";
import SideBar from "./components/home/SideBar";
import Menu from "./components/home/Menu";
import style from "./app.module.css";





export default function Home() {


  return (
    <div className={style.appHeader}>
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
     
    </div>
  );
}
