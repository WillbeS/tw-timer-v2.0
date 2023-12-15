---------------------- IMPORTANT!!!!! -----------------------------------------------
The last working version with all todos parsing done (almost with minting, need to calculate next overflow) is in commit - Minting parser complete!!!!

Turns out my countdown timer is making the whole row render so will go back to the original one with the many intervals (after measuring with Chrome profile is shows that the original is way faster)

This will break my curretn alarm and probably a shit more stuff so this is the point of this note and the last commit - in case it gets too messy!!!

It should be done with branches but I don' t remember well how and can't be bothered now
---------------------- IMPORTANT!!!!! -----------------------------------------------

with the separate intervals implementation:

each timer will import the alarm and will call it from within, the alarm should maybe have an isPlaying property now, also the timer and the hook will be moved in the alarm feature

## need to revisit the state, is it necessary to keep track of them?

---

inactive tab throttling - need to find a fix

---

Status codes and response body:

GET - 200 - the resource
POST - 201 - empty response body
DELETE/PUT/PATCH - 204, empty response body
