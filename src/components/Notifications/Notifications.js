import React, { Component } from "react";
import "./Notifications.scss";

export default class Notifications extends Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    };
  }

  render() {
    return (
      <div className="notifications w-48 md:w-96 fixed top-24 left-0 z-40">
        {this.props.notifications.length > 0 &&
          this.props.notifications.map((notification) => {
            if (notification.type === "add") {
              return (
                <div
                  key={notification.id}
                  className="notification fav-added-notification shadow-lg bg-white p-4 mb-2"
                >
                  Image was added to favorites
                </div>
              );
            } else {
              return (
                <div
                  key={notification.id}
                  className="notification fav-removed-notification shadow-lg bg-white p-4 mb-2"
                >
                  Image was removed from favorites
                </div>
              );
            }
          })}
      </div>
    );
  }
}
