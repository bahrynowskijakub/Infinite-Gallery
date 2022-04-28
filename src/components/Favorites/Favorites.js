import React, { Component } from "react";
import SingleFavoriteImage from "../SingleFavoriteImage/SingleFavoriteImage";
import "./Favorites.scss";

export default class Favorites extends Component {
  render() {
    return (
      <div className="favorites-modal w-full h-screen fixed top-0 left-0 z-30 flex justify-end items-center">
        <div
          onClick={() => this.props.toggleFavoritesModal()}
          className="favorites-overlay w-full min-h-full absolute top-0 left-0"
        ></div>
        <div className="favorites-content w-4/5 md:w-2/3 h-full bg-white z-40 overflow-y-scroll overflow-x-hidden">
          <h2 className="text-lg md:text-2xl px-4 py-2">Favorites</h2>
          <div className="favorites-content__images-wrapper w-full px-4 pb-4">
            {this.props.favorites.length > 0 ? (
              this.props.favorites.map((image) => {
                return (
                  <SingleFavoriteImage
                    key={image.id}
                    image={image}
                    favorites={this.props.favorites}
                    removeFromFavorites={this.props.removeFromFavorites}
                  />
                );
              })
            ) : (
              <p>You don't have any favorite image</p>
            )}
          </div>
        </div>
      </div>
    );
  }
}
