## Q1 — How to Run

Prerequisites: Node.js 18+

1. Clone the repo:
   git clone https://github.com/RKAnalytics/country-comparator

2. Go into the folder:
   cd country-comparator

3. Install dependencies:
   npm install

4. Start the app:
   npm run dev

5. Open your browser and go to:
   http://localhost:5173

## Q2 — Stack Choice

I decided to use React + Vite because for this app, real-time state updates are required: adding and removing items from the shopping list. 
country cards dynamically is clean using the component model of React. Vite makes it set up quickly with 
no unnecessary complexity.

For the API, I selected REST Countries as it was totally free, no API key required, and was 
CORS-enabled (works directly from the browser), and provides rich data such as population, area, 
flags, languages and currencies.

It would have been a bad idea to use just HTML + jQuery. Managing 4 country cards' state with statecharts: 
Without any valid reason would become messy real quick — adding, removing, and updating cards without any 
a component model results in difficult-to-read, difficult-to-extend code.

## Q3 — One Real Edge Case

File: src/api/countries.js

A slow or hung API is handled by the AbortController timeout on line 8. If the request takes 
If it exceeds the timespan of > 8 seconds, the controller aborts the operation and returns a timeout error to the app. 
Time out when it tries to connect to the database.

Otherwise, user would be stuck with an infinite spinning loader without any effect from API hang. 
They would now have no feedback and no way to recover, they would have to refresh the page manually.

## Q4 — AI Usage

I created the API layer (src/api/countries.js) using Claude (claude.ai). I asked it 
Write a fetch function that is able to handle errors and timeouts.

The default timeout had been set as 5 seconds by the AI. I changed it to 8 seconds because 5 seconds wasn't long enough. 
Light streaming users, particularly in areas with poor network bandwidth, will find the download and upload speeds too fast. 
latency like Pakistan. 8 seconds is a reasonable time limit without compromising on a complete 
hung request.

## Q5 — Honest Gap

Only the first result of the API is returned. If someone types "Guinea" they might 
Get "Guinea-Bissau" instead of "Guinea" because we only want one match in the API's response. 
pick index 0.

I would get all the matches and display them as a drop down list below the search box on a new day, 
and give the user the option to choose which country he or she would like to include in the comparison before adding it.