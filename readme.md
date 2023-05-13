## Ideas:

### Backend
- Create a Document each hour w lift status
- This should be a new model,to return simple jSON like {"Chair23": "Open"}
- But for proof of concept, I Will try to use insert mongo command first first
- lift report includes time of report. runs 8 times a day, every hour 8AM - 4PM

### Frontend
- React app with a calendar. Slider on the calender adjusts time frame. Slider triggers state change -> state changes trigger new API call (like blip UI)

### !PROBLEMS!
- Once deployed, the Render.com node runtime seems to running on the incorrect timezone. This means that lift reports are pulled during Mammoth mountain's closed hours. How can we fix this?
    - Proposed solution: we modify the cron.schedule method so that we can specify timezone. As of right now, it is running in UTC -0.00. This is likely the cause of the issue

### Ideas
- Each hour add an embedded status document to a lift document
- What if we used MongoDB's 'time-series' feature? Could be cool if we rebuild our backend.