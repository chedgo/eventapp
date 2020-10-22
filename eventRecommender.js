class User {
  constructor(name, id) {
    this.name = name;
    this.id = id;
    this.personalEvents = [];
  }
}
class Event {
  constructor(title, date, category, id) {
    this.title = title;
    this.date = date;
    this.category = category;
    this.id = id;
  }
}

class EventRecommender {
  constructor() {
    // All main properties should go here.

    this.events = [];
    this.users = [];
  }

  addEvent(event) {
    // Adds a new Event to the System
    this.events.push(event);
  }

  addUser(user, ID) {
    // Adds a new User to the System
    this.users.push(new User(user, parseInt(ID)));
  }

  saveUserEvent(eventId, userId) {
    // Allow users to save events to a personal Events array.
    let thisUserIndex = this.users.findIndex((user) => {
      return user.id === userId;
    });
    let thisEventIndex = this.events.findIndex((event) => {
      return event.id === eventId;
    });
    this.users[thisUserIndex].personalEvents.push(this.events[thisEventIndex]);
  }

  deleteUser(userId) {
    if (
      this.users.findIndex((user) => {
        return user.id === userId;
      }) === -1
    ) {
      return alert("Not a User");
    }
    this.users.splice(
      this.users.findIndex((user) => {
        return user.id === userId;
      }),
      1
    );
    // Deletes a User from the system
  }

  deleteEvent(eventId) {
    if (
      this.events.findIndex((event) => {
        return event.id === eventId;
      }) === -1
    ) {
      return alert("Not an Event");
    }
    this.events.splice(
      this.events.findIndex((event) => {
        return event.id === eventId;
      }),
      1
    );
    // Deletes the Event from the system
  }

  findEventsByDate(date) {
    return this.events.filter((x) => x.date === date);
    // Returns all events on a given date
  }

  findEventsbyCategory(category) {
    return this.events.filter((x) => x.category === category);
    // Returns all events in a given category
  }
}
if (typeof module != "undefined") {
  console.log("it is!");
  module.exports = { EventRecommender, User, Event };
}
