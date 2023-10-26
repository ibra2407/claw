# GH2024

## For SKH DO

Currently the game design and features are:

Flow:

Link w/ uID -> access game -> play game -> game complete -> dialog shows prize -> 2 re-rolls -> submit email to claim prize -> restrict player from continue playing

#### UI KIV
- storyboard
- fancy animations
- music/sound

#### UI issues
- need higher res images of the heroes and claw
- inform someone in DO how to update image assets
- colour scheming

### Development Notes

React Component hierarchy
App>Game>Animation>DialogBox>EmailForm

#### Tasks per stage
- 'play game'
-- object overlap to trigger game completion
---- not priority, this can be edited and is part of the 'fluff' of the game
---- just need to define 'completion' for the movement
-- stop regeneration of superhero in DialogBox

- '2 re-rolls'
-- set and display counter
-- set logic to remove re-roll button once 3 tries are hit
-- does the game restart? all boxes regen?

2.	Improve game mechanics
    a.	claw movement
    b.	what happens if 2nd try to the greenboxes?
    c.	Do we reset?
    d.	How to make the illusion better?
    e.	Set probabilities on the heroes
3.	Wipe the rest of the UI
4.	Set up for easy image insertion into Claw and GreenBoxes; choose a suitable background, code out the fancy stuff like the claw machine wire
5.	MS automate for linkage with backend
6.	Hosting on server – once code is completed, can host on github first to check 
7.	Documenting and passing of project to SKHDO


