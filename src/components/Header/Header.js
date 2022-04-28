import React, { Component } from "react";
import FavIconDefault from "../Icons/FavIconDefault";
import "./Header.scss";

export default class Header extends Component {
  render() {
    return (
      <header className="header w-full h-20 p-4 bg-white fixed top-0 z-20">
        <div className="header__wrapper max-w-7xl h-full m-auto flex justify-between items-center">
          <h1 className="logo text-xl md:text-3xl lg:pl-4">
            Blix Infinite Gallery
          </h1>
          <div className="favorites w-32 h-full relative flex justify-end items-center">
            <button
              onClick={() => this.props.toggleFavoritesModal()}
              className="favorites__button w-16 h-full flex justify-center items-center"
            >
              <FavIconDefault />
            </button>
          </div>
        </div>
      </header>
    );
  }
}
