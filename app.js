window.onload = () => {
  let ER = new EventRecommender();
  ER.users.push(new User("tom", 1), new User("dick", 2), new User("harry", 3));
  ER.events.push(
    new Event("Diego's 30th", "2019-05-17", "Birthday Parties", 1),
    new Event("Cat's 30th", "2018-08-08", "Birthday Parties", 2),
    new Event("Sockhop", "2020-10-20", "School Dance", 3)
  );

  //(re)prints user list
  let printUsers = () => {
    let userList = [];
    ER.users.forEach((element) => {
      userList.push(element.name);
    });
    document.getElementById("all-users").innerHTML =
      "<li>" + userList.join("</li><li>") + "</li>";
  };
  printUsers();

  //adding new user event
  document.getElementById("add-user-button").addEventListener("click", () => {
    ER.addUser(
      document.getElementById("add-user-name").value,
      document.getElementById("add-user-id").value
    );
    printUsers();
  });
  //delete user event
  document
    .getElementById("delete-user-button")
    .addEventListener("click", () => {
      ER.deleteUser(parseInt(document.getElementById("delete-user-id").value));
      printUsers();
    });

  //(re)prints Event list
  let printEvents = () => {
    let eventList = [];
    ER.events.forEach((element) => {
      eventList.push(
        element.title + " " + element.date + " " + element.category
      );
    });
    document.getElementById("all-events").innerHTML =
      "<li>" + eventList.join("</li><li>") + "</li>";
  };
  printEvents();

  //adding new event event
  document
    .getElementById("submit-event-button")
    .addEventListener("click", () => {
      ER.addEvent(
        new Event(
          document.getElementById("add-event-name").value,
          document.getElementById("add-event-date").value,
          document.getElementById("add-event-category").value,
          document.getElementById("add-event-id").value
        )
      );
      printEvents();
    });

  //delete user event
  document
    .getElementById("delete-event-button")
    .addEventListener("click", () => {
      ER.deleteEvent(
        parseInt(document.getElementById("delete-event-id").value)
      );
      printEvents();
    });
  //prints events found by date
  let printEventsByDate = (EventsArray) => {
    let eventsList = [];
    EventsArray.forEach((element) => {
      eventsList.push(element.title);
    });
    if (eventsList.length === 0) {
      return alert("No Events on that Date");
    }
    document.getElementById("find-by-date-results").innerHTML =
      "<li>" + eventsList.join("</li><li>") + "</li>";
  };
  //filters results by date
  let filterByDate = (date) => {
    return ER.events.filter((event) => {
      return event.date === date;
    });
  };

  //event listener for filtering by date
  document
    .getElementById("find-by-date-button")
    .addEventListener("click", () => {
      printEventsByDate(
        filterByDate(document.getElementById("date-search-id").value)
      );
    });
  //prints events found by category
  let printEventsByCategory = (EventsArray) => {
    let eventsList = [];
    EventsArray.forEach((element) => {
      eventsList.push(element.title);
    });
    if (eventsList.length === 0) {
      return alert("No Events in that category");
    }
    document.getElementById("find-by-category-results").innerHTML =
      "<li>" + eventsList.join("</li><li>") + "</li>";
  };
  //filters results by category
  let filterByCategory = (category) => {
    return ER.events.filter((event) => {
      return event.category === category;
    });
  };

  //event listener for filtering by category
  document
    .getElementById("find-by-category-button")
    .addEventListener("click", () => {
      printEventsByCategory(
        filterByCategory(document.getElementById("category-search-id").value)
      );
    });
  // get event from ID
  let findEventById = (id) => {
    return ER.events.filter((event) => {
      event.id === id;
    });
  };
  //adds event to personal user array by id
  document
    .getElementById("save-event-for-user-button")
    .addEventListener("click", () => {
      ER.saveUserEvent(
        parseInt(document.getElementById("save-event-id").value),
        parseInt(document.getElementById("save-user-id").value)
      );
    });
  let printFoundEvents = (arr) => {
    document.getElementById("ticketmaster-results").innerHTML =
      "<li>" + arr.join("</li><li>") + "</li>";
  };

  let getEventsFromTicketmaster = (searchTerm) => {
    const url = new URL("https://app.ticketmaster.com/discovery/v2/events");
    url.search = new URLSearchParams({
      apikey: env.TMapikey,
      keyword: searchTerm,
      locale: "*",
    });
    fetch(url)
      .then((response) => response.json())
      .then((json) => json._embedded.events)
      .then((events) => {
        console.log(events);
        let names = [];
        events.forEach((event) => {
          names.push(event.name);
        });
        return names;
      })
      .then((namesArray) => {
        printFoundEvents(namesArray);
      });
  };

  let submitEventSearch = () => {
    let searchString = document.getElementById("ticketmaster-search-field")
      .value;
    getEventsFromTicketmaster(searchString);
  };

  document
    .getElementById("submit-search-ticketmaster")
    .addEventListener("click", submitEventSearch);
};
