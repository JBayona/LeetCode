/**
 * 
 # My Notes:
 
- Make sure to ask if the timezone matters, e.g. do we need to send a batch of notifications
  at 12 PM Eastern Time and another batch at 12 PM Pacific Time?
- Ask clarifying questions, like what if there is a tie where two events happen at the same time. 
  What should you do in that scenario? Just take the first event.
 
"""
The solution you are writing is part of a marketing engine for our StubHub website.
You will be implementing the setup and business logic for different marketing campaigns that find “relevant” events for a user and notifies them accordingly.
We are first looking for the correctness and performance of your solution, but also the extensibility and long-term maintainability.
 
Q1
    This code is missing some key elements. Define the MarketingEngine class and implement a send_customer_notifications method to notify the customer of all the events happening in the same city as the customer.
 
    While in the real world we would notify the customer of these events via email or text, for the purposes of this exercise, we want you to output the text content we intend to send to the customer and print it to the console.
 
    Please note that this method will be invoked multiple times for multiple different customers.
 
Q2 
    Extend the solution to add a new campaign which sends a notification to the customer with the event closest to their next or upcoming birthday.
 
    Please note that this campaign will be run multiple times for multiple different customers.
    # Just pick the first event
    # 100_000 customers
 
Q3
    We now need to implement a new campaign that notifies the customer of the 5 closest events to the customer based on the distance between the customer and the event. 
 
    You should assume that we have about 10 million events and we need to call this per user.
 
Q4
    In the stubhub backend we have a simple restful api that you can call that will return prices for events:
 
    For all event prices: https://sh-mockapi.azurewebsites.net/api/ticketprice 
 
    For a price per event: https://sh-mockapi.azurewebsites.net/api/ticketprice?eventId={EventId} 
 
    i.e https://sh-mockapi.azurewebsites.net/api/ticketprice?eventId=1
 
    Can you call this service from your solution to send a notification of the 5 cheapest tickets within a Y mile radius of the customer? We can test with various radiuses.
 
 */

const axios = require("axios");

class City {
  constructor(name, x, y) {
    this.name = name;
    this.x = x;
    this.y = y;
  }
}

class Event {
  constructor(id, name, city, eventDate) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.eventDate = eventDate;
  }
}

class Customer {
  constructor(id, name, city, birthDate) {
    this.id = id;
    this.name = name;
    this.city = city;
    this.birthDate = birthDate;
  }
}

// Question 3
function distance(city1, city2) {
  return Math.sqrt(
    (city1.x - city2.x) * (city1.x - city2.x) +
      (city1.y - city2.y) * (city1.y - city2.y)
  );
}

class MarketingEngine {
  constructor(events) {
    this.events = events;
    this.cityToEvents = {};

    /*
            ONLY THIS FOR QUESITON 4
        */
    this.idToEvent = {};

    // This is not part of question 4 - CODE IT!
    this.filter(events);
  }
  // BE CAREFUL WITH THE ASYNC, THIS IS ONLY IN QUESTION 4
  async filter(events) {
    let now = Date.now();
    // Filter events that are old
    this.events = this.events.filter((event) => event.eventDate >= now);
    // Format from city to event
    for (let event of this.events) {
      if (!(event.city in this.cityToEvents)) {
        this.cityToEvents[event.city] = [];
      }
      this.cityToEvents[event.city].push(event);
    }

    // QUESTION 2 - DO NOT ADD IT
    // Format date to event
    this.sortedDates = this.events.sort((a, b) => a.eventDate - b.eventDate);

    // QUESTION 4 - DO NOT ADD
    this.lastPriceCache = Date.now();
    this.TTL = 86400000; // One day ms
    this.limit = 5;
    // STILL QUESTION 4
    const response = await axios.request(
      "https://sh-mockapi.azurewebsites.net/api/ticketprice"
    );
    this.priceData = response.data;
    for (let event of this.priceData) {
      this.idToEvent[event.Id] = event;
    }
  }

  // Question 1
  sendCustomerNotification(customer) {
    let customerCity = customer.city;
    console.log(
      `Sending customers notifications to the customer ${customer.name}`
    );
    return customerCity in this.cityToEvents
      ? this.cityToEvents[customerCity]
      : [];
  }

  // Question 2
  sendCustomerBirthdayNotification(customer) {
    let customerBirthday = new Date(customer.birthDate);

    let now = new Date();
    let nextBirthDay = new Date(
      now.getFullYear(),
      customerBirthday.getMonth(),
      customerBirthday.getDate()
    );
    // Nexy year's birthday
    if (now > nextBirthDay) {
      // Add one year to the Birthday if the birthday is already gone
      nextBirthDay = nextBirthDay.setFullYear(nextBirthDay.getFullYear() + 1);
      // Birthday for the next year
      console.log(`${customer.name} next birthday is ${nextBirthDay}`);
    }

    // Get the closer event
    let start = 0;
    let end = this.sortedDates;
    let target = nextBirthDay;
    // Binary search to get closer
    while (start < end) {
      const mid = Math.fstartor((start + end) / 2);
      if (arr[mid] < target) {
        start = mid + 1;
      } else {
        end = mid;
      }
    }
    // This will have the closer date and event
    return this.sortedDates[start];
  }

  // Question 3
  sendCustomerProximityNotification(customer, limit) {
    if (!(customer.city in CITY_MAP)) {
      return `${customerCity} has no events`;
    }

    let customerCity = CITY_MAP[customer.city];

    // Get the array of cities with its values and create a new array
    // With the city and the distance calculated between the customer city and the city
    let sortedArr = Object.values(CITY_MAP)
      .map((city) => {
        return { city: city, distance: distance(customerCity, city) };
      })
      .sort((a, b) => a.distance - b.distance);
    // { city: City { name: 'New York', x: 3572, y: 1455 }, distance: 0 }, { .....}

    // Get the closests events
    // console.log(sortedArr);
    let result = [];
    // Sorted array has all cities with events that are probably old
    // and not in our map, that's why we need the empty array
    for (let prop of sortedArr) {
      let events = this.cityToEvents[prop.city.name] || [];
      for (let event of events) {
        result.push(event);
        if (result.length === limit) {
          break;
        }
      }
      // This can be extracted into a function to reduce code duplication
      if (result.length === limit) {
        break;
      }
    }
    return result;
  }

  // Question 4
  async cheapestWithinRatio(customer, radious) {
    if (!(customer.city in CITY_MAP)) {
      return `${customerCity} has no events`;
    }

    let customerCity = CITY_MAP[customer.city];

    // Talk about caching here to save constant HTTP calls
    let now = Date.now();

    let data;
    // Data stale older than 1 day - Update cache
    if (now - this.lastPriceCache < this.TTL) {
      const response = await axios.request(
        "https://sh-mockapi.azurewebsites.net/api/ticketprice"
      );
      this.priceData = response.data;
      for (let event of this.priceData) {
        this.idToEvent[event.Id] = event;
      }
      this.lastPriceCache = now;
    }

    // Get cheapest cities in y-mile radious
    let citiesWithinRadious = Object.values(CITY_MAP).filter((city) => {
      let d = distance(customerCity, city);
      // console.log(`${city.name}-${d}`);
      return d <= radious;
    });
    // console.log(citiesWithinRadious);

    let eventIdInRadious = [];
    for (let city of citiesWithinRadious) {
      // console.log(city);
      // We might have some cities that have been filtered so we need to validate that
      // city to evenents has filtered values depending on date
      let events = this.cityToEvents[city.name] || [];
      // console.log(events);
      for (let event of events) {
        eventIdInRadious.push(event);
      }
    }
    // console.log("Event in radious");
    // console.log(eventIdInRadious)
    // Prices and events
    let priceAndEvents = [];
    for (let event of eventIdInRadious) {
      let price = this.idToEvent[event.id].Price;
      priceAndEvents.push({ event: event, price: price });
    }

    // Sort
    priceAndEvents.sort((a, b) => a.price - b.price);

    // Cut the array regardless if it's less or not
    let cut = priceAndEvents.slice(0, 5 + 1);
    let result = [];
    for (let prop of cut) {
      result.push(prop.event);
    }
    console.log("EVENT FINAL");
    console.log(result);
    return result;
  }
}

// Assume a static number of cities
// Question 3
let CITY_MAP = {
  "New York": new City("New York", 3572, 1455),
  "Los Angeles": new City("Los Angeles", 462, 975),
  Boston: new City("Boston", 3778, 1566),
  Chicago: new City("Chicago", 2608, 1525),
  "San Francisco": new City("San Francisco", 183, 1233),
  Washington: new City("Washington", 3358, 1320),
};

let customer = new Customer(1, "Amos", "New York", Date.parse("1995-05-11"));

// Date.parse("2023-12-23") converts a string into a unix timestamp
const events = [
  new Event(1, "Phantom of the Opera", "New York", Date.parse("2023-12-23")),
  new Event(2, "Metallica", "Los Angeles", Date.parse("2024-12-02")),
  new Event(3, "Metallica", "New York", Date.parse("2024-12-06")),
  new Event(4, "Metallica", "Boston", Date.parse("2024-10-23")),
  new Event(5, "LadyGaGa", "New York", Date.parse("2023-09-20")),
  new Event(6, "LadyGaGa", "Boston", Date.parse("2024-08-01")),
  new Event(7, "LadyGaGa", "Chicago", Date.parse("2024-07-04")),
  new Event(8, "LadyGaGa", "San Francisco", Date.parse("2024-07-07")),
  new Event(9, "LadyGaGa", "Washington", Date.parse("2023-05-22")),
  new Event(10, "Metallica", "Chicago", Date.parse("2024-01-01")),
  new Event(
    11,
    "Phantom of the Opera",
    "San Francisco",
    Date.parse("2024-07-04")
  ),
  new Event(12, "Phantom of the Opera", "Chicago", Date.parse("2025-05-15")),
];

let marketEngine = new MarketingEngine(events);

// Question 1
console.log("Notification to customer for events in the same city:");
console.log(marketEngine.sendCustomerNotification(customer));

// Question 2
console.log("Notification for events closer to customer's birtday:");
console.log(marketEngine.sendCustomerBirthdayNotification(customer));

// Question 3
console.log("Notification for events close to customer's location:");
console.log(marketEngine.sendCustomerProximityNotification(customer, 5));

// Question 4
console.log("Notification for cheapest events within ratio:");
console.log(marketEngine.cheapestWithinRatio(customer, 400));
