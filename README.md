The original Weather-App I created was built primarly using HTML, CSS and JavaScript, but I wanted it to be something more than than just a static website. 

I read about Electron, its advantages, and ease of use, so I decided to make convert my existing weather application and make it Electron Based with a React framework.
The transition allows the Weather Application to become cross platform with any device and operating system. 

The UI is rebuilt but the main features are still there, such as weather conditions and search functionality. 

What is new is the interactive map that display's the current location visually of the city the user inputted. A function takes the longitude and latitude of the information received
from the OpenWeatherMap API and inputs it into the Map.tsx, which then places a marker on the map of the location. The map is based off  the Leaflet JavaScript library. 
