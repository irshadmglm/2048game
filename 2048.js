var board;
var score=0;
var rows =4;
var columns =4;
let startX, startY;

window.onload= function(){
    setGame();
}
function setGame(){
    board=[
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0],
        [0 ,0 ,0 ,0]
    ]
       
    for (let r = 0 ; r < rows ; r++){
        for(let c=0; c < columns; c++ ){
            let tile= document.createElement('div');
            tile.id= r.toString()+ "-" +c.toString();
            let num = board[r][c];
            updateTile(tile,num);
            document.getElementById('board').append(tile);
        }
    }
    setTwo();
    setTwo()

    function hasEmptyTile(){
        for(let r =0; r< rows; r++){
        for(let c= 0; c < columns; c++){
            if(board[r][c] == 0){
                return true;
            }
        }
       
        }
        return false;
    }

    function setTwo(){
            if(!hasEmptyTile()){
                return;
            }

        let found = false;
        if(!found){
            let r=Math.floor(Math.random() * rows);
            let c=Math.floor(Math.random() * columns);

            if(board[r][c] == 0){
                board[r][c] = 2;
                let tile = document.getElementById(r.toString() + "-" + c.toString())
                tile.innerText= "2";
                tile.classList.add("x2");
                found = true;

            }
        }
    }

    function updateTile(tile,num){
        tile.innerText='';
        tile.classList.value='';
        tile.classList.add("tile");
        if(num >0 ){
            tile.innerText=num;
            if(num <= 4096){
                tile.classList.add('x'+num.toString())
            }else{
                tile.classList.add('x8192');
            }
        }

    }

    document.addEventListener("keyup",(e)=>{
        if(e.code == "ArrowLeft"){
            slideLeft();
            setTwo();
        }
        else if(e.code == "ArrowRight"){
            slideRight();
            setTwo();
        }
         else if(e.code == "ArrowDown"){
            slideDown();
            setTwo();
        }
         else if(e.code == "ArrowUp"){
            slideUp();
            setTwo();
        }
        document.getElementById('score').innerText= score;
    })
    document.getElementById('board').addEventListener('touchstart', handleTouchStart, false);
    document.getElementById('board').addEventListener('touchmove', handleTouchMove, false);

    function handleTouchStart(event) {
        startX = event.touches[0].clientX;
        startY = event.touches[0].clientY;
    }
    
    function handleTouchMove(event) {
        if (!startX || !startY) {
            return;
        }
    
        let endX = event.touches[0].clientX;
        let endY = event.touches[0].clientY;
    
        let deltaX = endX - startX;
        let deltaY = endY - startY;
    
        if (Math.abs(deltaX) > Math.abs(deltaY)) {
            if (deltaX > 0) {
                // Swipe right
                slideRight();
                setTwo();
            } else {
                // Swipe left
                slideLeft();
                setTwo();
            }
        } else {
            if (deltaY > 0) {
                // Swipe down
                slideDown();
                setTwo();
            } else {
                // Swipe up
                slideUp();
                setTwo();
            }
           
        }
        document.getElementById('score').innerText= score;
        startX = startY = null; // Reset initial touch position
    }





    function filterZero(row){
        return row.filter(num => num != 0);

    }
    function slide(row){
        row =filterZero(row)

        for(let i=0 ; i < row.length-1 ; i++){
            if(row[i] == row[i+1]){
                row[i] *= 2;
                row[i+1] = 0;
                score += row[i];
            }
        }

        row = filterZero(row);

        while(row.length < columns){
            row.push(0);
        }
        return row;

    }
    function slideLeft(){
        for(let r=0; r < rows; r++){
           let row =board[r];
            row = slide(row);
            board[r] =row;

            for(let c=0 ; c < columns ; c++){
                let tile= document.getElementById(r.toString() + "-" + c.toString())
                let num = board[r][c];
                updateTile(tile,num);
            }
        }
    }

        function slideRight(){
        for(let r=0; r < rows; r++){
           let row =board[r];
           row.reverse();
            row = slide(row);
            row.reverse();
            board[r] =row;

            for(let c=0 ; c < columns ; c++){
                let tile= document.getElementById(r.toString() + "-" + c.toString())
                let num = board[r][c];
                updateTile(tile, num);
            }
        }
    }
    function slideUp(){
        for(let c=0; c< columns ; c++){
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
             row = slide(row);
            // board[0][c] = board[0];
            //  board[1][c] = board[1];
            //   board[2][c] = board[2];
            //    board[3][c] = board[3];

                for(let r=0 ; r < rows ; r++){
                    board[r][c] = row[r];
                let tile= document.getElementById(r.toString() + "-" + c.toString())
                let num = board[r][c];
                updateTile(tile,num);
            }
        }
    }

    function slideDown(){
        for(let c=0; c< columns ; c++){
            let row = [board[0][c], board[1][c], board[2][c], board[3][c]];
             row.reverse();
             row = slide(row);
              row.reverse();
            // board[0][c] = board[0];
            //  board[1][c] = board[1];
            //   board[2][c] = board[2];
            //    board[3][c] = board[3];

                for(let r=0 ; r < rows ; r++){
                    board[r][c] = row[r];
                let tile= document.getElementById(r.toString() + "-" + c.toString())
                let num = board[r][c];
                updateTile(tile,num);
            }
        }
    }

}
