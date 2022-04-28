import React, { Component } from "react";
import PreloadImage from "react-preload-image";
import FavIconWhite from "../Icons/FavIconWhite";
import FavIconWhiteFilled from "../Icons/FavIconWhiteFilled";
import "./SingleImage.scss";

export default class SingleImage extends Component {
  handleAddingToFavorites(image) {
    if (!this.props.favorites.includes(this.props.image)) {
      this.props.addToFavorites(image);
    } else {
      this.props.removeFromFavorites(image);
    }
  }

  render() {
    return (
      <figure className="single-image-wrapper relative w-full">
        <div className="single-image-wrapper__buttons-overlay w-16 lg:w-full h-16 lg:h-full flex lg:hidden absolute top-0 right-0 lg:left-0 z-10">
          <button
            onClick={() => this.handleAddingToFavorites(this.props.image)}
          >
            {this.props.favorites.includes(this.props.image) ? (
              <FavIconWhiteFilled />
            ) : (
              <FavIconWhite />
            )}
          </button>
        </div>
        <PreloadImage
          src={this.props.image.src}
          alt="Shiba Inu dog"
          className="single-image-wrapper__image w-full h-full object-cover"
          lazy
        />
      </figure>
    );
  }
}
