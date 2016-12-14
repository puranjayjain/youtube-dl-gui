// the class to do all the work
class wbnfs {
  // init the icon and other relevant items
  constructor() {
    this.icon = 'images/favicon-32x32.png';
  }

  show(message, title = 'Youtube-dl GUI') {
    if(Notification.permission === "granted") {
      let notification = new Notification(title, {
        body: message,
        icon: this.icon
      });
      // also add event listener to the notification
      notification.addEventListener('click', (e) => {
        notification.close();
      });
      // auto close the notification after a certain time
      // https://developer.mozilla.org/en-US/docs/Web/API/Notifications_API/Using_the_Notifications_API
      setTimeout(notification.close.bind(notification), 12000);
    } else if(Notification.permission !== 'denied') {
      this.request(message, title);
    }
  }

  request(message, title) {
    Notification.requestPermission((permission) => {
      // If the user accepts, let's create a notification
      if(permission === "granted") {
        this.show(message, title);
      } else {
        // silently log them
        console.log('notification: ' + message);
      }
    });
  }
}

const webnotifications = new wbnfs();