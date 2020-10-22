describe("EventRecommender", () => {
  const { EventRecommender, User, Event } = require("../../eventRecommender"); // Update with your class names and file name
  let er;
  let ev;
  let us;
  beforeEach(() => {
    er = new EventRecommender();
    ev = new Event("My Birthday", "Tomorrow", "Party");
    us = new User("Diego");
    date = "Tomorrow";
  });

  describe("addEvent", () => {
    it("adds a new Event to the system", () => {
      er.addEvent(ev);
      expect(er.events.length).toEqual(1);
      expect(er.events[0].title).toEqual("My Birthday"); // what are some other things you can test?
    });
  });

  describe("addUser", () => {
    it("adds a new User to the system", () => {
      er.addUser(us);
      expect(er.users.length).toEqual(1);
    });
  });

  describe("saveUserEvent", () => {
    it("adds an event to a user's personal event array", () => {
      er.addEvent(ev);
      er.addUser(us);
      er.saveUserEvent(ev, us); // change these to match your method signature
      expect(er.users[0].personalEvents.length).toEqual(1);
    });
  });

  describe("deleteUser", () => {
    it("removes a User from the system", () => {
      er.addUser(us);
      er.deleteUser(us);
      expect(er.users.length).toEqual(0);
    });
  });

  describe("deleteEvent", () => {
    it("removes the event from the system", () => {
      er.addEvent("A new event that you will delete later");
      er.deleteEvent("Change Me");
      expect(er.events.length).toEqual(0);
    });
  });

  describe("findEventsByDate", () => {
    it("returns events from given date", () => {
      er.addEvent(ev);
      expect(er.findEventsByDate(date).length).toEqual(1);
    });
  });
});
