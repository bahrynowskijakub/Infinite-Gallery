import React, { Component } from "react";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import Header from "./components/Header/Header";
import Notifications from "./components/Notifications/Notifications";
import Gallery from "./components/Gallery/Gallery";
import Favorites from "./components/Favorites/Favorites";

export default class App extends Component {
  constructor() {
    super();
    this.state = {
      images: [],
      favorites: [],
      notifications: [],
      shouldLoadMoreImages: false, //Helper for checking if user scroll position is near bottom and if there is need to load more images
      isFavoritesModalVisible: false,
    };
    this.toggleFavoritesModal = this.toggleFavoritesModal.bind(this);
    this.addToFavorites = this.addToFavorites.bind(this);
    this.removeFromFavorites = this.removeFromFavorites.bind(this);
  }

  componentDidMount = () => {
    this.checkLocalStorageForFavorites();
    this.getImages(16);
    window.addEventListener("scroll", () => {
      this.checkScrollPositionToBottom();
    });
  };

  componentDidUpdate = (prevProps, prevState) => {
    this.updateLocalStorageFavorites();
    if (
      !prevState.shouldLoadMoreImages &&
      this.state.shouldLoadMoreImages &&
      prevState.images.length === this.state.images.length
    ) {
      this.getImages(16);
      setTimeout(() => {
        //Timeout for avoiding multiple onScroll event calls
        this.setState({
          shouldLoadMoreImages: false,
        });
      }, 1000);
    }
    if (prevState.notifications.length !== this.state.notifications.length) {
      setTimeout(() => {
        this.setState({
          notification: this.state.notifications.shift(),
        });
      }, 5000);
    }
  };

  /**
   * Function for receiving images from shibe.online API
   */
  getImages(number) {
    axios
      .get(`/shibes?count=${number}`)
      .then((res) => {
        const tempArray = res.data.map((src) => {
          return {
            src,
            id: uuidv4(),
          };
        });
        this.setState({
          images: this.state.images.concat(tempArray),
        });
      })
      .catch(() => {
        console.log("Data could not be received");
      });
  }

  /**
   * Function for checking distance to bottom of the page and if it's less than window.innerHeight it should ask for more images.
   */
  checkScrollPositionToBottom() {
    const pixelsToBottom =
      document.body.offsetHeight - window.innerHeight - window.scrollY;
    if (
      pixelsToBottom < window.innerHeight &&
      !this.state.shouldLoadMoreImages
    ) {
      this.setState({
        shouldLoadMoreImages: true,
      });
    }
  }

  /**
   * Function for handling favorites modal visibility
   */
  toggleFavoritesModal() {
    this.setState({
      isFavoritesModalVisible: !this.state.isFavoritesModalVisible,
    });
  }

  /**
   * Function for checking if there are some favorite images in localStorage
   */
  checkLocalStorageForFavorites() {
    if (localStorage.getItem("favorites")) {
      this.setState({
        favorites: JSON.parse(localStorage.getItem("favorites")),
      });
    }
  }

  /**
   * Function for updating localStorage
   */
  updateLocalStorageFavorites() {
    if (
      JSON.parse(localStorage.getItem("favorites")) !== this.state.favorites
    ) {
      localStorage.setItem("favorites", JSON.stringify(this.state.favorites));
    }
  }

  /**
   * Function for adding image to favorites list
   */
  addToFavorites(image) {
    const tempArray = [...this.state.favorites, image];
    const notification = {
      id: uuidv4(),
      type: "add",
    };
    this.setState({
      favorites: tempArray,
      notifications: [...this.state.notifications, notification],
    });
  }

  /**
   * Function for removing image from favorites list
   */
  removeFromFavorites(image) {
    const tempArray = [...this.state.favorites];
    tempArray.splice(this.state.favorites.indexOf(image), 1);
    const notification = {
      id: uuidv4(),
      type: "remove",
    };
    this.setState({
      favorites: tempArray,
      notifications: [...this.state.notifications, notification],
    });
  }

  render() {
    return (
      <>
        <Header toggleFavoritesModal={this.toggleFavoritesModal} />
        <Notifications notifications={this.state.notifications} />
        <Gallery
          images={this.state.images}
          favorites={this.state.favorites}
          addToFavorites={this.addToFavorites}
          removeFromFavorites={this.removeFromFavorites}
        />
        {this.state.isFavoritesModalVisible && (
          <Favorites
            favorites={this.state.favorites}
            removeFromFavorites={this.removeFromFavorites}
            toggleFavoritesModal={this.toggleFavoritesModal}
          />
        )}
      </>
    );
  }
}
