import Drawer from './Drawer';

it('Drawer draws', () => {
    const drawer = new Drawer();
    drawer.execute(`
        C 20 4
        L 1 2 6 2
        L 6 3 6 4 
        R 16 1 20 3
        B 10 3 o
    `);
    const result = drawer.getResult(); 
    console.log(result);
    expect((result)).toEqual(`----------------------
|                    |
|                    |
|                    |
|                    |
----------------------
----------------------
|                    |
|xxxxxx              |
|                    |
|                    |
----------------------
----------------------
|                    |
|xxxxxx              |
|     x              |
|     x              |
----------------------
----------------------
|               xxxxx|
|xxxxxx         x   x|
|     x         xxxxx|
|     x              |
----------------------
----------------------
|oooooooooooooooxxxxx|
|xxxxxxooooooooox   x|
|     xoooooooooxxxxx|
|     xoooooooooooooo|
----------------------
`);   
});