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

---

How to reload the page

window.location.reload();

---

color theme names:

by layout

1. main container - background, text, hover (logo, top bar label, spiner)
2. header - text, background/hover, border (buttons)
3. feature content - text, background
4. feature button - text, background, border, hover
5. top bar - border, background, text, hover (buttons)
6. list - background, text, text disabled, text link, hover link
7. modal - background, text
8. app message - background, text

bg - 1, 2, 3, 4, 5, 6, 7, 8
text - 1, 2, 3, 4, 5, 6, 7, 8
hover bg - 2, 4, 5
hover text - 1, 6
border - 2, 4, 5
fill - 1, need to check!!!

From current scheme:

main - main container
button/primary - header
light box - modal, list
feature - both content and button
