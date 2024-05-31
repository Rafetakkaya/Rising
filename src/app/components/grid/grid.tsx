import React from "react";
import "./grid.css";

export function Grid(props:any) {
  return <div id="grid">{props.children}</div>;
}

export function Header(props:any) {
  return <header>{props.children}</header>;
}
export function Nav(props:any) {
  return <nav>{props.children}</nav>;
}
export function Article(props:any) {
  return <article>{props.children}</article>;
}
export function Main(props:any) {
  return <main>{props.children}</main>;
}

export function Aside(props:any) {
  return <aside>{props.children}</aside>;
}

