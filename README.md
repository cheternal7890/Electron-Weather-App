The original Weather-App I created was built primarly using HTML, CSS and JavaScript, but I wanted it to be something more than than just a static website. 

I read about Electron, its advantages, and ease of use, so I decided to make convert my existing weather application and make it Electron Based with a React framework.
The transition allows the Weather Application to become cross platform with any device and operating system. 

The front end is rebuilt but the main features are still there, such as weather conditions and search functionality. 

What is new is the interactive map that display a marker of any city that the user inputted into the search bar. For example, if the user searched up Georgia, the map also displays a marker indicating where Georgia is.

**How does it work? **
A function takes the longitude and latitude of the information received from the OpenWeatherMap API and inputs it into the Map.tsx, which then places a marker on the map of the location. The map is based off the Leaflet JavaScript library if you 
are curious to learn more: https://leafletjs.com/reference.html.
