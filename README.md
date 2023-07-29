## Getting Started
### Install
    yarn
### Start local server
    yarn dev --host

### Testing
    yarn test

## E2E Testing
    yarn cypress:open

    yarn cypress:run


## The Problem
Context: You are hosting a dinner party for your developer friends and you just realised that the shops are closed
and you can only cook with the ingredients available at your house.
You: You, a React front-end developer, and your friends have this great idea to create an app that can be used by
anybody in similar situations. Your friend is a back-end developer and he assures you he can create a RestAPI that
will return recipes if you query it with the following parameters: ingredients, quantity, available cooking time,
number of ingredients and meal type.
Your big idea: What’s your plan on building this application in order to convince your friend to go into business
together?
Let's go.
### Ingredient List:
https://www.themealdb.com/api/json/v1/1/list.php?i=list
### Filter by Main Ingredient:
https://themealdb.com/api/json/v1/1/filter.php?i=cherry_tomatoes
### Recipe:
www.themealdb.com/api/json/v1/1/lookup.php?i=52772

### Images
#### Meal Thumbnail Images
Add /preview to the end of the meal image URL
/images/media/meals/llcbn01574260722.jpg/preview
#### Ingredient Thumbnail Images
www.themealdb.com/images/ingredients/Lime.png
www.themealdb.com/images/ingredients/Lime-Small.png
#### All API Endpoints:
https://www.themealdb.com/api.php