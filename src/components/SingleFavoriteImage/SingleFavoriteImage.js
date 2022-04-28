import React, { Component } from "react";
import Close from "../Icons/Close";
import "./SingleFavoriteImage.scss";

export default class SingleFavoriteImage extends Component {
  render() {
    return (
      <figure className="single-favorite-image-wrapper mb-4 relative">
        <div className="single-favorite-image-wrapper__buttons-overlay w-12 lg:w-full h-12 lg:h-full absolute top-0 right-0 lg:left-0 flex lg:hidden justify-center items-center z-10">
          <button
            onClick={() => this.props.removeFromFavorites(this.props.image)}
          >
            <Close />
          </button>
        </div>
        <img
          src={this.props.image.src}
          alt="Shiba Inu dog"
          className="single-favorite-image-wrapper__image w-full h-full object-cover"
        />
      </figure>
    );
  }
}
