## Ideas:

### Backend
- Create an Endpoint that returns the current lift report, and one that returns lift report at any given (valid) time stamp (reportTime field)
- Create a Document each hour w lift status
- This should be a new model,to return simple jSON like {"Chair23": "Open"}
- But for proof of concept, I Will try to use insert mongo command first first
- lift report includes time of report. runs 8 times a day, every hour 8AM - 4PM

### Frontend
- React app with a calendar. Slider on the calender adjusts time frame. Slider triggers state change -> state changes trigger new API call (like blip UI)

### !PROBLEMS!

- We need a production and development environment key, so documents aren't created twice

### Ideas
- Each hour add an embedded status document to a lift document
- What if we used MongoDB's 'time-series' feature? Could be cool if we rebuild our backend.