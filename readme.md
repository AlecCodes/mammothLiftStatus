## Ideas:

### Backend
- Create a Document each hour w lift status
- This should be a new model,to return simple jSON like {"Chair23": "Open"}
- But for proof of concept, I Will try to use insert mongo command first first

### Frontend
- React app with a calendar. Slider on the calender adjusts time frame. Slider triggers state change -> state changes trigger new API call (like blip UI)

### Ideas
- Each hour add an embedded status document to a lift document
- What if we used MongoDB's 'time-series' feature? Could be cool if we rebuild our backend.