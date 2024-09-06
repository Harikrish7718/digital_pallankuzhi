$(() => {
  let totalMarbles = 35;

  // Tracks the current player's turn
  let currentPlayer = null;

  // Tracks the current number of marbles to distribute
  let numMarbles = null;

  // Tracks the location of the hole where marbles were grabbed
  let startIndex = null;

  var p1name,p2name;
  
// Pre-canned marble colors
  const marbleColors = [
    ['#e54ed0, #ff72ff'],
    ['#b106df, #06dfb1'],
    ['#1e48e2, #060e2d'],
    ['#42e100, #f6ff6a'],
    ['#fab340, #fe8787'],
    ['#b400a2, #9e0031']
  ]
  
  let P1=0,P2=0;

  // User defined class node
  class Node {
    // constructor
    constructor(ind,ro)
    {
      this.ro = ro;
      this.ind = ind;
      this.next = null;
    }
  }

  var node0 = new Node(0,1);
  var node1 = new Node(1,1);
  var node2 = new Node(2,1);
  var node3 = new Node(3,1);
  var node4 = new Node(4,1);
  var node5 = new Node(5,1);
  var node6 = new Node(6,1);
  var node7 = new Node(6,2);
  var node8 = new Node(5,2);
  var node9 = new Node(4,2);
  var node10 = new Node(3,2);
  var node11 = new Node(2,2);
  var node12 = new Node(1,2);
  var node13 = new Node(0,2);

  node0.next=node1;
  node1.next=node2;
  node2.next=node3;
  node3.next=node4;
  node4.next=node5;
  node5.next=node6;
  node6.next=node7;
  node7.next=node8;
  node8.next=node9;
  node9.next=node10;
  node10.next=node11;
  node11.next=node12;
  node12.next=node13;
  node13.next=node0;


// Functions ==============================================

  const randomRotate = () => { // used to randomly rotate marble layers
    return 'rotate(' + Math.floor(Math.random() * 360) + 'deg)';
  }


  const randomMarbleColor = (arr) => {
    const random = Math.floor(Math.random() * 6)
    return 'radial-gradient(' + arr[random] + ')';
  }
  // === Hole hover behavior ========================
  const mouseEnterHole = (event) => {
    const hoverNumber = $(event.currentTarget).children('.marble-layer').children().length;
    $(event.currentTarget).children('.hover-number').css('visibility', 'visible').text(hoverNumber);
  }


  const mouseLeaveHole = (event) => {
    $(event.currentTarget).children('.hover-number').css('visibility', 'hidden')
  }

  // Event handlers =========================================

  const setVariables = (event) => { // Setting up game logic for a single play
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    numMarbles = $hole.children().children().length; // store the number of marbles in the selected hole
    if(numMarbles==0){
      alert("Please choose valid hole");
      setVariables();
    }
    startIndex = $hole.index(); // set the index equal to the location of the selected hole
    removeMarbles(event);
  }


  const removeMarbles = (event) => {
    const $hole = $(event.currentTarget); // create variable to store the hole that was clicked
    $hole.children('.marble-layer').remove(); // remove the marbles from the selected hole
    turn($hole,$hole.index());
  }


  // === Creating marble layers =============================

  const checkMarbleLayers = (i, row) => { // check for how many marble layers exist for a hole
    const numMarbleLayers = $(row).children().eq(i).children('.marble-layer').length;
    if (numMarbleLayers === 0) {
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $(row).children().eq(i).append($marbleLayer);
      checkMarbleLayers(i, row);
    }
    else {
      checkLastLayer(numMarbleLayers, i, row); // pass the number of layers to checkLastLayer function
    }
  }


  const checkLastLayer = (numMarbleLayers, i, row) => {
    const numLastLayerMarbles = $(row).children().eq(i).children('.marble-layer').eq(numMarbleLayers - 1).children().length;
    createMarbleLayers(numMarbleLayers, numLastLayerMarbles, i, row); // pass the number of marbles in the last layer to createMarbleLayers function
  }


  const createMarbleLayers = (numMarbleLayers, numLastLayerMarbles, i, row) => {
    const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // create a marble
    if (numLastLayerMarbles < 5) { // check if the last marble layer has less than 5 marbles
      $(row).children().eq(i).children('.marble-layer').eq(numMarbleLayers - 1).append($marble); //add marble to that marble layer
    }
    else {
      const $marbleLayer = $('<div>').addClass('marble-layer').css('transform', randomRotate());; // create a new marble layer .css('transform', randomRotate())
      $(row).children().eq(i).append($marbleLayer); // add this to the hole
      $marbleLayer.append($marble); //add marble to the new marble layer
    }
  }

const checkRow = (temp) => {
  if(temp==node7 && temp.ro==1){
   temp.ro=2;
  }
  else if(temp==node0 && temp.ro==2){
    temp.ro=1;
  }
}

const turn = ($hole,startIndex) => { //core logic for single player turn
    let roww=1;
    if(currentPlayer==2)
      roww=2;
    let flag=1;
    if(roww==1){
      temp=node0;
      do{
        if(temp.ind==startIndex)
            break;
      temp=temp.next;
      }while(temp!=node7);
    }
    if(roww==2){
      temp=node7;
      do{
        if(temp.ind==startIndex)
            break;
      temp=temp.next;
      }while(temp!=node0);
    }
    while(1){
      if(currentPlayer==1){
        while(numMarbles>0){
          temp=temp.next;
          startIndex=temp.ind;
          checkRow(temp);
          if(temp.ro==1){

            checkMarbleLayers(startIndex, '#row-1');
            numMarbles--; //decrease the marbles to distribute
          }
          if(temp.ro==2){
            checkMarbleLayers(startIndex, '#row-2');
            numMarbles--;
          }
          if($('.hole-1').eq(startIndex).children().children().length==4){
            P1+=4;
            $('.hole-1').eq(startIndex).children('.marble-layer').remove();
          }
          if($('.hole-2').eq(startIndex).children().children().length==4){
            P2+=4;
            $('.hole-2').eq(startIndex).children('.marble-layer').remove();
          }
        }
        temp=temp.next;
        startIndex=temp.ind;
        checkRow(temp);
        if(temp.ro==1){
          numMarbles = $('.hole-1').eq(startIndex).children().children().length;
          $('.hole-1').eq(startIndex).children('.marble-layer').remove();
        }
        if(temp.ro==2){
          numMarbles = $('.hole-2').eq(startIndex).children().children().length;
          $('.hole-2').eq(startIndex).children('.marble-layer').remove();
        }
        if(numMarbles==0)
            flag=0;
      }
      if(flag==0){
        temp=temp.next;
        startIndex=temp.ind;
        checkRow(temp);
        if(temp.ro==1){
          P1+= $('.hole-1').eq(startIndex).children().children().length;
          $('.hole-1').eq(startIndex).children('.marble-layer').remove();
        }
        if(temp.ro==2){
          P1+= $('.hole-2').eq(startIndex).children().children().length;
          $('.hole-2').eq(startIndex).children('.marble-layer').remove();
        }
        currentPlayer=2;
        break;
      }
      if(currentPlayer==2){
        while(numMarbles>0){
          temp=temp.next;
          startIndex=temp.ind;
          checkRow(temp);
          if(temp.ro==1){
            checkMarbleLayers(startIndex, '#row-1');
            numMarbles--; //decrease the marbles to distribute
          }
          if(temp.ro==2){
            checkMarbleLayers(startIndex, '#row-2');
            numMarbles--;
          }
          if($('.hole-1').eq(startIndex).children().children().length==4){
            P1+=4;
            $('.hole-1').eq(startIndex).children('.marble-layer').remove();
          }
          if($('.hole-2').eq(startIndex).children().children().length==4){
            P2+=4;
            $('.hole-2').eq(startIndex).children('.marble-layer').remove();
          }
        }
        temp=temp.next;
        startIndex=temp.ind;
        checkRow(temp);
        if(temp.ro==1){
          numMarbles = $('.hole-1').eq(startIndex).children().children().length;
          $('.hole-1').eq(startIndex).children('.marble-layer').remove();
        }
        if(temp.ro==2){
          numMarbles = $('.hole-2').eq(startIndex).children().children().length;
          $('.hole-2').eq(startIndex).children('.marble-layer').remove();
        }
        if(numMarbles==0)
            flag=0;
      }
      if(flag==0){
        temp=temp.next;
        startIndex=temp.ind;
        checkRow(temp);
        if(temp.ro==1){
          P2+= $('.hole-1').eq(startIndex).children().children().length;
          $('.hole-1').eq(startIndex).children('.marble-layer').remove();
        }
        if(temp.ro==2){
          P2+= $('.hole-2').eq(startIndex).children().children().length;
          $('.hole-2').eq(startIndex).children('.marble-layer').remove();
        }
        currentPlayer=1;
        break;
      }
  }
  scorefunc();
  if (currentPlayer === 2) { 
    enablePlayer2();
    currentPlayer = 2;
    disablePlayer1();
  }
  else {
    enablePlayer1();
    currentPlayer = 1;
    disablePlayer2();
  }
  determineRoundOver();
}

// === Disabling players =====================================
  const disablePlayer1 = () => {
    $('#player-1').css('color', 'black');
    $('#player-1').css('font-weight', 'lighter');
    $('.hole-1').off('click', setVariables); // disabling all of player 1's holes
  }


  const disablePlayer2 = () => {
    $('#player-2').css('color', 'black');
    $('#player-2').css('font-weight', 'lighter');
    $('.hole-2').off('click', setVariables); // disabling all of player 2's holes
  }

// === Enabling players =====================================
  const enablePlayer1 = () => {
    $('#player-1').css('color', 'white');
    $('#player-1').css('font-weight', '1000');
    $('.hole-1').on('click', setVariables); // adding an event listner to all the holes
  }


  const enablePlayer2 = () => {
    $('#player-2').css('color', 'white');
    $('#player-2').css('font-weight', '1000');
    $('.hole-2').on('click', setVariables); // adding an event listner to all the holes
  }

// === Picking first player ==================================
  const determineFirstPlayer = () => {
    currentPlayer = 1;
    enablePlayer1();
    disablePlayer2();
    scorefunc();
  }

// === Checking if game is over ==============================
  const determineRoundOver = () => {
    if (checkPlayer1Marbles() || checkPlayer2Marbles()) { // Round is over only after all a player's holes are empty
      determineWinner();
    }
  }
 const determineWinner = () => {
    p1name = document.forms["myForm"]["name1"].value;
    p2name = document.forms["myForm"]["name2"].value;
    if(p1name=="")
        p1name="Player 1";
    if(p2name=="")
        p2name="Player 2";
    disablePlayer1();
    disablePlayer2();
    if (checkPlayer2Marbles()){
      for (let i = 0; i < $('.hole-1').length; i++) {
        if ($('.hole-1').eq(i).children('.marble-layer').children().length>0)
            P1+=$('.hole-1').eq(i).children('.marble-layer').children().length;
      }
    }
    if (checkPlayer1Marbles()){
      for (let i = 0; i < $('.hole-2').length; i++) {
        if ($('.hole-2').eq(i).children('.marble-layer').children().length>0)
            P2+=$('.hole-1').eq(i).children('.marble-layer').children().length;
      }
    }
    scorefunc();
    const $p = $('<p>').attr('id', 'winner');
    $('#winning-message').prepend($p);
    if (P1 > P2) {
      $p.text(p1name+' is the winner!');
      win=p1name+' is the winner!';
    }
    else if (P1 < P2) {
      $p.text(p2name+' is the winner!');
      win=p2name+' is the winner!';
    }
    else {
      $p.text('It\'s a tie, great job!');
      win='It\'s a tie, great job!';
    }
    Score();
    $('#winning-modal').css('visibility', 'visible');
    $('.yes').on('click', newRound);
    $('.no').on('click', endRound);
}

function Score(){
  p1name = document.forms["myForm"]["name1"].value;
  p2name = document.forms["myForm"]["name2"].value;
  if(p1name=="")
        p1name="Player 1";
    if(p2name=="")
        p2name="Player 2";
  var table = document.getElementById("myTable");
  var row = table.insertRow(1);
  var cell1 = row.insertCell(0);
  var cell2 = row.insertCell(1);
  var cell3 = row.insertCell(2);
  cell1.innerHTML = p1name;
  cell2.innerHTML = p2name;
  cell3.innerHTML = win;
}

function scorefunc(){
      document.getElementById("p1point").innerHTML = P1;
      document.getElementById("p2point").innerHTML = P2;
}
  const checkPlayer1Marbles = () => {
    for (let i = 0; i < $('.hole-1').length; i++) {
      if ($('.hole-1').eq(i).children('.marble-layer').length > 0) { // stop the function once a hole is found not empty
        return false;
      }
    }
    return true; // only return true if all player 1 holes are empty
  }


  const checkPlayer2Marbles = () => {
    for (let i = 0; i < $('.hole-2').length; i++) {
      if ($('.hole-2').eq(i).children('.marble-layer').length > 0) { // stop the function once a hole is found not empty
        return false;
      }
    }
    return true; // only return true if all player 2 holes are empty
  }

  // === Winning modal window button functions =================
  const newRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
    createBoard();
    P1=0;
    P2=0;
    win="";
    if(startFlag)
      determineFirstPlayer();
  }

  const endRound = (event) => {
    $('#winning-modal').css('visibility', 'hidden');
    $('#winner').remove();
    clearBoard();
  }



  // === Clear/create board ====================================
  const clearBoard = () => {
    $('.marble-layer').remove();
  }
const createBoard = () => { // Creating initial mancala board setup
    $('#row-1').empty();
    $('#row-2').empty();

    // player 2
    for (let i = 0; i < 7; i++) {
      const $hole = $('<div>').addClass('hole-2'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-2').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles/7; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      $hole.hover(mouseEnterHole, mouseLeaveHole);
    }
    // player 1
    for (let i = 0; i < 7; i++) {
      const $hole = $('<div>').addClass('hole-1'); // creating holes (not the mancala)
      const $hoverNumber = $('<div>').addClass('hover-number');
      $('#row-1').append($hole); // adding holes to the mancala board
      const $marbleLayer = $('<div>').addClass('marble-layer');
      $hole.append($marbleLayer); // adding marble layer to holes
      for (let j = 0; j < totalMarbles/7; j++) {
        const $marble = $('<div>').addClass('marble').css('background', randomMarbleColor(marbleColors)); // creating marbles
        $marbleLayer.append($marble); // adding marbles to the marble layer
      }
      $hoverNumber.text($hole.children('.marble-layer').children().length);
      $hole.append($hoverNumber);
      $hole.hover(mouseEnterHole, mouseLeaveHole);
    }
  }

  // Event listeners ===========================================

  $('#start-over').on('click', newRound); // begin a new round when the "Start Over" button is clicked
  $('#instructions-button').on('click', () => { // open up the "How to Play" modal window when that button is clicked
    $('#wrapper').css('opacity','0.5');
    $('#instructions-modal').css('visibility', 'visible');
  });
  $('#close-button').children().on('click', () => { // close the "How to Play" modal window when the "Close" button is clicked
    $('#instructions-modal').css('visibility', 'hidden');
    $('#wrapper').css('opacity','1');
  });
  $('#playy').on('click', () => { // open up the "How to Play" modal window when that button is clicked
    $('#wrapper').css('opacity','0.5');
    $('#start-play').css('visibility', 'visible');
  });
  $('#y').on('click', () => { // open up the "How to Play" modal window when that button is clicked
    $('#start-play').css('visibility', 'hidden');
    $('#wrapper').css('opacity','1');
    startFlag=1;
    determineFirstPlayer();
  });
  $('#n').on('click', () => { // close the "How to Play" modal window when the "Close" button is clicked
    $('#start-play').css('visibility', 'hidden');
    $('#wrapper').css('opacity','1');
  });
  $('#close-button1').children().on('click', () => { // close the "How to Play" modal window when the "Close" button is clicked
    $('#stats').css('visibility', 'hidden');
    $('#wrapper').css('opacity','1');
  });
  $('#statistics').on('click', () => { // open up the "How to Play" modal window when that button is clicked
    $('#wrapper').css('opacity','0.5');
    const $p1 = $('<p>');
    $('#statsss').prepend($p1);
    $p1.text('Player 2 is the winner!');
    $('#stats').css('visibility', 'visible');
  });
  // Function invocations ======================================

  P1=0;
  P2=0;
  let startFlag=0;
  let win="";
  createBoard(); // display the board with the initial setup

}) //end
