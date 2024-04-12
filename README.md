# F1-PROJECT
Here I have made a programme that takes in a user's input about details they would like to find out about in F1. The programme is designed to provide information about the drivers, individual races, constructors and circuits.

## EXPLANATION
In the JS file, first I created an event listener so that the program waits until the whole html page has been loaded.
In the same function, I fetched the form and assigned it to to forme, then added a prevent default which prevents the page from refreshing. The getinfo function is then called.

In the getInfo function, first I assigned the inputs of season race and addition from the user to respective constants. Under season I had to make it a number because later I have to prevent years above 2024 from being passed. If the season is input the program alerts the user to input a year to input a season and stops the programme.
I then created a series of if statements for the option chosen. If perhaps its drivers are chosen, to the parent URL, the driver's bit is added, if there is additional information, it is also added but after the driver's bit. The same would happen for circuits and constructors. However, if it was a race chosen the user must put in a race number ad that is what is added to the url. If no race is input, the user is alerted that a race is required and the program stops. if there is additional information it is added to the end of the url after the race.
The fetch then uses the product URL. If the response is not ok, an error is logged but if it is correct the response is taken into JSON format. Then the data is passed into the displayResults function. There is a catch so that it can catch an error and alert the user of the error.
Under the displayResults function first I assigned the constant details to the paraph id details then set its inner html to an empty string.
The first if statement is for races, using the race table and the races. I then assigned a constant race to the array Races in the Racetable in the JSON file. In it, there is an if statement that checks if the number of elements in the races is beyond zero, if this condition is met, the if statement is executed. In this if statement I created a constant called race list which creates an element for an ordered list and adds it to a class with the name lists.
Then I created a forEach iterator that handles each race individually. In it, I created a constant called racee that creates a new list item. Then created different div elements to represent the race name, nationality, qualifying race, race day and raceurl. Then I assigned the textcontent of the individual divs to the respecting values from the API. Under qualifying, we have a slight difference. Since qualifying races only started a few years back, previous years lack a value for this, therefore we have two options. If the qualifying date is found it is returned, if not it returns NAN. Then to the list item we created, we append the race name, nation, qualifying, race day and the URL. We then append the list to the racelist which is then appended to details.
Now, when the races have been displayed if we want to view the results for the race, the user will click. Therefore I added an event listener for clicking for any list item. When it is clicked a function is called. In this function first I had to redefine season since it was not in the scope. I did the same for the race. I also had to redefine the URL since it also wasn't in the scope.
Then I fetched the URL and it added the value of the season and at the end added results since it is results we would like to get. The data is then passed into JSON format. Afterwards, we reassigned Races as we had done before to make working with it easier but this time since I wanted results, I again created a constant results and assigned it the first index of the races, the result value in the JSON file. Once again I created a function called results list which gets the details paragraph. We then make its inner HTML into an empty string. Then for each result, I created a list item and it appended a div containing the name, the position, the constructor and the time of drivers. It is then appended to details. since we are in a fetch we also have to make a catch to catch an error and log it.
I added an event listener for hovering with the mouse that changes the colour of a list item when it is passed on by a mouse and turns back to its original colour.

Then there is an else if that now works if it is a driver we are on. First, once again I  made a constant this time called drivers. Once again I created an if statement that checks if the array drivers contain any items. In it, I created an ordered list named drivers list and also added it to the class by the name lists.
Then I created a forEach iterator that goes through the drivers array and returns the driver's name, birthdate, nationality and Wikipedia URL link.


Then there is an else if that now works if it is a circuit we are on. First, once again I  made a constant this time called circuits. Once again I created an if statement that checks if the array circuits contain any items. In it, I created an ordered list named circuit's list and also added it to the class by the name lists.
Then I created a forEach iterator that goes through the circuit's array and returns the circuit's id, name, nationality and Wikipedia URL link.

If none of these if statements are executed the text content of the details is set to NO RESULTS FOUND.

Finally, I added an event listener that listens for a change in options in the selection. if the value is a race, the box to enter a race is editable by a user, but if it is not it is not displayed.

## CONCLUSION
