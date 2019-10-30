//Ở đây ta tạo ra bộ khung chứa game

var canvas = document.querySelector('.game');
var context = canvas.getContext('2d');
var pause = 0; // biến để dừng trò chơi kết hợp vs space

var grid = 16;
// khởi tạo đối tượng rắn là 1 ô vuông

var snake = 
{
  x: 240, //vị trí của snake theo hướng x,y
  y: 240,
  dx: grid, //hướng di chuyển theo phương x hoặc y,ở đây khi start game 
  dy: 0,      
  cells: [],
  maxCells: 1
};

var count = 0;
var speed = 10;
var loop1;
var mode = "a";
var prey = {
  x: 320,
  y: 320
};


function RandomPrey(min, max)
{
  return Math.floor(Math.random() * (max  - min)) + min;
}
 // draw prey
context.fillStyle = 'red';
  context.fillRect(prey.x, prey.y, grid-1, grid-1);


  // draw snake
  context.fillStyle = 'green';
    context.fillRect(240, 240, grid-1, grid-1);
function restart()
{
    mode = "a";
    snake.x = 240;
    snake.y = 240;
    snake.cells = [];
    snake.maxCells = 1;
    snake.dx = grid;
    snake.dy = 0;

    prey.x = RandomPrey(0, 25) * grid;
    prey.y = RandomPrey(0, 25) * grid;
    cancelAnimationFrame(loop1);
    pause = 0;
    speed = 10
}

// game loop

function loop() {
//hàm này giống như setTimeout, sẽ gọi lại hàm loop khi loop thực thi xong

  loop1 = requestAnimationFrame(loop);
  if (++count < speed) 
  {
    return;
  }

  count = 0;
// xóa vị trí mà nó di chuyển
  context.clearRect(0,0,canvas.width,canvas.height);

// mỗi loop rắn sẽ di chuyển thêm 1dx đơn vị
  snake.x += snake.dx;
  snake.y += snake.dy;

  // Thêm một phần tử vào đầu mảng
  snake.cells.unshift({x: snake.x, y: snake.y});


  // Thêm 1 ô vuông phía trước phải xóa 1 cái phía sau để snake di chuyển.
  if (snake.cells.length > snake.maxCells) 
  {
    snake.cells.pop();
  }


  // draw prey

  context.fillStyle = 'red';
  context.fillRect(prey.x, prey.y, grid-1, grid-1);


  // draw snake

  context.fillStyle = 'green';
  snake.cells.forEach(function(cell, index) {
    context.fillRect(cell.x, cell.y, grid-1, grid-1);


    // snake ăn prey

    if (cell.x === prey.x && cell.y === prey.y) {
      snake.maxCells++;
      prey.x = RandomPrey(0, 25) * grid;
      prey.y = RandomPrey(0, 25) * grid;
      if(speed > 5)
      {
        speed -=0.5;
      }
      else{
        speed -= 0.1;
      }
      console.log(speed);
    }

    // chế độ a và b
    if(mode == "a")
    {
        for (var i = index + 1; i < snake.cells.length; i++) {
      // va chạm và đụng tường thì reset game

        if (cell.x === snake.cells[i].x && cell.y === snake.cells[i].y) {
            restart();
         }
        }
        if (snake.x < 0) {
            restart();
        }

        else if (snake.x == canvas.width) 
        {
            restart();
         }


          if (snake.y < 0) 
         {
            restart();
        }

        else if (snake.y == canvas.height) 
         {
            restart();
         }
    }
    if(mode == "b")
    {
        if (snake.x < 0) {
            snake.x = canvas.width - grid;
        }

        else if (snake.x >= canvas.width) 
        {
          snake.x = 0;
         }


          if (snake.y < 0) 
         {
          snake.y = canvas.height - grid;
        }

        else if (snake.y >= canvas.height) 
         {
           snake.y = 0;
         }
       }
        });

    }

//bắt sự kiện bàn phím ấn xuống

document.addEventListener('keydown', function(e) {

  // lọc sự kiện keydown để rắn không di ngược lại

  if (e.which === 37 && snake.dx === 0) {
    snake.dx = -grid;
    snake.dy = 0;

  }

  else if (e.which === 38 && snake.dy === 0) {
    snake.dy = -grid;
    snake.dx = 0;

  }

  else if (e.which === 39 && snake.dx === 0) {
    snake.dx = grid;
    snake.dy = 0;
  }

  else if (e.which === 40 && snake.dy === 0) {
    snake.dy = grid;
    snake.dx = 0;
  }

});
// để lựa chọn mode và pause game
window.addEventListener('keyup', (e) => {
        if(e.key === " ")
        {
            pause += 1;
        }
        if ((pause%2) != 0 && e.key == " ")
        {
            loop1 = requestAnimationFrame(loop);
            setInterval(snake,40000);
        }
        if((pause%2) == 0 && e.key == " ")
        {
            cancelAnimationFrame(loop1);
        }
        if(e.key == "b" || e.key == "B")
        {
            mode = "b";
        }
        if(e.key == "a" || e.key == "A")
        {
            mode = "a";
        }
    
});