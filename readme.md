## Ideas:

### Backend
- Create a Document each hour w lift status
- This should be a new model,to return simple jSON like {"Chair23": "Open"}
- But for proof of concept, I Will try to use insert mongo command first first
- lift report includes time of report. runs 8 times a day, every hour 8AM - 4PM

### Frontend
- React app with a calendar. Slider on the calender adjusts time frame. Slider triggers state change -> state changes trigger new API call (like blip UI)

### !PROBLEMS!
- Node Cron is not running once deployed on render.com. This is likely because it's not using the right timezone at runtime
    - Changing the TZ environment variable to LA time may have solved this
- It's pulling the wrong date as well for the lift report date (Server.js line 47). As of rn it's pulling the UTC time for reportdate. Perhaps we can just have our frontend convert this to the client's time?


### Ideas
- Each hour add an embedded status document to a lift document
- What if we used MongoDB's 'time-series' feature? Could be cool if we rebuild our backend.