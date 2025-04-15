# portfolio-web-scripting
This is a multipage website made as a portfolio to show off some apps. It is on GitHub Pages at [stanpanman.github.io/portfolio-web-scripting/](https://stanpanman.github.io/portfolio-web-scripting/)

## Getting Started
You will start on the Home page of the website. Click on an app name in the navigation bar at the top to go to the page for that app.

### To Do App
This app lets you make a list of all the things you need to do.
<br>**Note:** It uses local storage to automatically save your entries.
- Click into the text box and enter anything you have to do.
- Click "Add" and it will go into the To Do List.
- If you need, you can click "Clear All To Do Items" to delete all entries.
- Once something has been added to the list, you may also edit the item or delete it by clicking the coresponding button.<br><br>

### Simple Fetch Demo
This app is to showcase the fetch() method to get data from the JSON Placeholder free API at [https://jsonplaceholder.typicode.com/todos](https://jsonplaceholder.typicode.com/todos)

### Local Fetch Demo
This app let you start up a Docker container and then fetch the data from it to display on the webpage.
- Clone the GitHub repo at [https://github.com/StanPanMan/random-number-express-app](https://github.com/StanPanMan/random-number-express-app)<br>
- Then follow the README instructions there.

### Pixel-art Maker
This app lets you draw art using pixels. Click on one of the pixels in the grid to color it. The tools are explained below
#### Tool Bar Explained
- The rectangle with color inside is where you choose what color you would like to use. It defaults to black. Click on it and a color selector will appear.
- The "Save Grid" button will save your drawing to local storage. **Note:** If the page is reloaded the image will be lost unless saved. If it is saved you will need to use the "Load Grid" button.
- The "Load Grid" button loads the drawing from local storage and will display it in the grid. **Note:** Only one drawing can be saved at a time currently. Feel free to take a screenshot for long time storage.
- The "Undo" button will reverse any changes you make. It saves the entire history of changes you have made.
- The "Redo" button can be used after you have used Undo. It will bring the changes back after Undo has reversed them.<br>
**Warning:** Redo will not work if you draw after using Undo. Make sure to Redo anything you need before continuing to draw.
- The "Eraser Toggle" button will toggle between on & off. When on, click on a pixel just like drawing to erase the color from it. Click the "Eraser Toggle"
- The "1x1 Brushsize" button is set to on by default. When it is toggled, only the one pixel you click on is colored.
- The "3x3 Brushsize" button can be clicked to toggle on. When on, the pixel clicked as well as the 8 surrounding pixels are colored, forming a 3x3 square.<br>
**Note:** Only one of the Brushsize buttons may be toggled on at a time. When you click on one, the other is automatically toggled off

## Architecture
- Each option in the navigation bar sends you to a separate page with its own link.
