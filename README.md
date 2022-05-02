# nmplot

A library in Javascript to draw and animate shapes on canvas based on custom logic.

## Features

-   Renders on Canvas2D
-   Draw custom shapes on Canvas
-   Animate shapes with custom logic

## First project

```html
<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta http-equiv="X-UA-Compatible" content="ie=edge" />
        <title>Rectangle on canvas</title>
    </head>
    <body>
        <canvas id="mycanvas"></canvas>
        <script src="../src/nmplot.js"></script>
        <script>
            var s1 = new NmplotShape("rectangle", { l1: 5, l2: 3 });
            container = new NmplotContainer();
            container.add(s1);
            var nmPlotCanvas = new NmplotCanvas("mycanvas", container);
        </script>
    </body>
</html>
```

## Feedback

You can write any feedback to nikhilmittal0000@gmail.com
