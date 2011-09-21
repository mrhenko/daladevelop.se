var TILE_WIDTH = 16;

colors = {
    0: "#002000",
    1: "#387d98",
    2: "#71809f",
    3: "#fb9c6c",
    4: "#d55121",
    5: "#cfe990",
    6: "#eafbc5",
    7: "#9c75c5",
    8: "#ffffff"
};

// Object: Block
function Block(blueprint) {
    this.blueprint = blueprint;
    this.x = 3;
    this.y = 0;

    this.Rotate = function() {
        var tmp = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
                ];

        for (y = 3; y >= 0; y--) {
            for (x = 0; x < 4; x++) {
                tmp[x][3 - y] = this.blueprint[y][x];
            }
        }

        this.blueprint = tmp;
    }

    this.RotateBack = function() {
        var tmp = [
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0],
            [0,0,0,0]
                ];

        for (y = 3; y >= 0; y--) {
            for (x = 0; x < 4; x++) {
                tmp[x][y] = this.blueprint[y][3 - x];
            }
        }

        this.blueprint = tmp;
    }

    this.MoveLeft = function() {
        --this.x;
    }

    this.MoveRight = function() {
        ++this.x;
    }

    this.MoveDown = function() {
        ++this.y;
    }

    this.MoveUp = function() {
        --this.y;
    }

    this.Draw = function(ctx) {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                if (this.blueprint[i][j]) {
                    ctx.fillStyle = colors[this.blueprint[i][j]];
                    ctx.fillRect(
                            TILE_WIDTH * (this.x + i),
                            TILE_WIDTH * (this.y + j),
                            TILE_WIDTH, TILE_WIDTH);
                }
            }
        }
    }
}



//-------------------------------------------------------



function BlockHandler() {
    this.blueprints = [
        // 0: Line
        [[0,1,0,0],
         [0,1,0,0],
         [0,1,0,0],
         [0,1,0,0]],
        // 1: Tee
        [[0,0,0,0],
         [2,2,2,0],
         [0,2,0,0],
         [0,0,0,0]],
        // 2: Box
        [[0,0,0,0],
         [0,3,3,0],
         [0,3,3,0],
         [0,0,0,0]],
        // 3: Left L
        [[0,4,0,0],
         [0,4,0,0],
         [4,4,0,0],
         [0,0,0,0]],
        // 4: Right L
        [[0,5,0,0],
         [0,5,0,0],
         [0,5,5,0],
         [0,0,0,0]],
        // 5: Left Squiggly
        [[0,0,0,0],
         [6,6,0,0],
         [0,6,6,0],
         [0,0,0,0]],
        // 6: Right Squiggly
        [[0,0,0,0],
         [0,7,7,0],
         [7,7,0,0],
         [0,0,0,0]],
    ];

    this.ctor = function() {
        this.tiles = new Array();
        for (x = 0; x < 10; x++) {
            this.tiles.push(new Array());
            for (y = 0; y < 20; y++) {
                this.tiles[x].push(false);
            }
        }
        this.NewPending();
        this.Next();

        this.score = 0;
    }

    // Push the pending block to the array, set the current index to this
    //   block.  Generate the next pending block.
    this.Next = function() {
        this.current = this.pending;
        this.current.x = 3;
        this.current.y = 0;
        this.NewPending();
        if (this.CheckCollision(this.current)) {
            alert("GAME OVER MAN!!! GAME OVER!!!");
            this.ctor();
        }
    }

    // Generate a new pending block
    this.NewPending = function() {
        this.pending = new Block(this.blueprints[Math.floor(7 * Math.random())]);
        this.pending.x = 12;
        this.pending.y = 1;
    }

    this.CheckRows = function() {
        rows = 0;
        for (y = 0; y < 20; y++) {
            rowFilled = true;
            for (x = 0; x < 10; x++) {
                if(this.tiles[x][y] == false) {
                    rowFilled = false;
                }
            }
            if (rowFilled) {
                rows++;
                for (dy = y; dy > 0; dy--) {
                    for (x = 0; x < 10; x++) {
                        this.tiles[x][dy] = this.tiles[x][dy - 1];
                    }
                }
                for (x = 0; x < 10; x++) {
                    this.tiles[x][0] = false;
                }
            }
        }

        switch (rows) {
            case 1:
                this.score += 100;
                break;
            case 2:
                this.score += 250;
                break;
            case 3:
                this.score += 800;
                break;
            case 4:
                this.score += 2000;
                break;
        }
    }

    // Move current block down, if a collision occurs, settle the block
    //   and create a new.
    this.MoveCurrentDown = function() {
        this.current.MoveDown();
        if (this.CheckCollision(this.current)) {
            this.current.MoveUp();
            for (i = 0; i < 4; i++) {
                for (j = 0; j < 4; j++) {
                    if(this.current.blueprint[i][j]) {
                        this.tiles[this.current.x + i][this.current.y + j] = this.current.blueprint[i][j];
                    }
                }
            }
            this.Next();
            this.CheckRows();
        }
    }

    // Move current block left, if collision, move back right.
    this.MoveCurrentLeft = function() {
        this.current.MoveLeft();
        if(this.CheckCollision(this.current)) {
            this.current.MoveRight();
        }
    }

    // Move current block right, if collision, move back left.
    this.MoveCurrentRight = function() {
        this.current.MoveRight();
        if(this.CheckCollision(this.current)) {
            this.current.MoveLeft();
        }
    }

    // Rotate block
    this.Rotate = function() {
        this.current.Rotate();
        if(this.CheckCollision(this.current)) {
            this.current.RotateBack();
        }
    }

    this.CheckCollision = function(block) {
        for (i = 0; i < 4; i++) {
            for (j = 0; j < 4; j++) {
                if (block.blueprint[i][j]) {
                    world_x = block.x + i;
                    world_y = block.y + j;
                    // Check boundary collisions
                    if (world_x < 0 || 10 <= world_x || world_y >= 20) {
                        return true;
                    }
                    // Check tile collisions
                    else if (this.tiles[world_x][world_y]) {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    this.Draw = function(ctx) {
        for (x = 0; x < 10; x++) {
            for (y = 0; y < 20; y++) {
                if (this.tiles[x][y]) {
                    ctx.fillStyle = colors[this.tiles[x][y]];
                    ctx.fillRect(TILE_WIDTH * x, TILE_WIDTH * y, TILE_WIDTH, TILE_WIDTH);
                }
            }
        }

        this.current.Draw(ctx);
        this.pending.Draw(ctx);

        ctx.fillStyle = colors[8];
        ctx.font = "10px monospace";
        ctx.fillText("Score: " + this.score, 178, 128);
    }

    this.tiles;
    this.pending;
    this.current;
    this.score;

    this.ctor();
}



//-------------------------------------------------------



function World() {
    this.width = 10;
    this.height = 20;
    this.frameCounter = 0;

    this.blockHandler = new BlockHandler();

    this.ctor = function() {
        window.addEventListener('keydown', this.OnKeyDown, true);
    }

    this.Update = function() {
        this.frameCounter++;
        if (this.frameCounter == 50) {
            this.blockHandler.MoveCurrentDown();
            this.frameCounter = 0;
        }
    }

    this.Draw = function() {
        // Clear
        doc = document.getElementById("canvas");
        ctx = doc.getContext("2d");
        ctx.fillStyle = colors[0];
        ctx.beginPath();
        ctx.rect(0, 0, TILE_WIDTH * this.width, TILE_WIDTH * this.height);
        ctx.rect(11 * TILE_WIDTH, 0, TILE_WIDTH * 6, TILE_WIDTH * 6);
        ctx.rect(11 * TILE_WIDTH, TILE_WIDTH * 7, TILE_WIDTH * 6, TILE_WIDTH * 2);
        ctx.closePath();
        ctx.fill();
        
        this.blockHandler.Draw(ctx);
    }

    this.ctor();
}



//-------------------------------------------------------



function GameEngine() {
    //this.world = new World();

    this.Init = function() {
        // Doesn't work, could be nice to set the canvas size from inside the
        // game engine
        /*
        $("canvas").height = 320;
        $("canvas").width = 272;
        */

        $(document).keydown(function(e) {
            if (e.which == "37") {
                world.blockHandler.MoveCurrentLeft();
            } else if (e.which == "39") {
                world.blockHandler.MoveCurrentRight();
            } else if (e.which == "40") {
                world.blockHandler.MoveCurrentDown();
            } else if (e.which == "32" || e.which == "38") {
                world.blockHandler.Rotate();
            }
        });
    }

    this.Loop = function() {
        world.Update();
        world.Draw();
    }

    this.Start = function() {
        setInterval(this.Loop, 10);
    }
}

// It didn't work with this as a class member.  Global because workaround.
world = new World();
