import React, { Component } from "react";
import SingleImage from "../SingleImage/SingleImage";
import "./Gallery.scss";

export default class Gallery extends Component {
  render() {
    return (
      <div className="infinite-gallery max-w-7xl m-auto p-4 pt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-y-4 md:gap-4 relative">
        {this.props.images.length > 0 &&
          this.props.images.map((image) => {
            return (
              <SingleImage
                key={image.id}
                image={image}
                favorites={this.props.favorites}
                addToFavorites={this.props.addToFavorites}
                removeFromFavorites={this.props.removeFromFavorites}
              />
            );
          })}
      </div>
    );
  }
}
