$(function() {
  function randomString() {
    var chars = '0123456789abcdefghiklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXTZ';
    var str = '';
    for (var i = 0; i < 10; i++) {
      str += chars[Math.floor(Math.random() *chars.length)];
    }
    return str;
  }
  randomString();
  
  function Column(name) {
    var self = this;
    
    this.id = randomString();
    this.name = name;
    
    this.$element = createColumn();
    
    function createColumn() {
      var $column = $('<div>').addClass('column');
      var $columnTitle = $('<h2>').addClass('column-title').text(self.name);
      var $columnCardList = $('<ul>').addClass('column-card-list');
      var $columnDelete = $('<button>').addClass('btn-delete').append('<i class="fa fa-trash-o" aria-hidden="true"></i>');
      var $columnAddCard = $('<button>').addClass('add-card').text('+');
      
      $columnDelete.click(function () {
        self.removeColumn();
      });
      
      $columnAddCard.click(function(event) {
        
        var input = prompt("Enter the name of the wisdom");
        if (input) {
          self.addCard(new Card(input));
        } else if (input === "") {
          alert('Please fill your thought');
        }}
      );
      
      $column.append($columnDelete)
      .append($columnTitle)
      .append($columnAddCard)
      .append($columnCardList);
      
      
      return $column;
    }
  }
  
  Column.prototype = {
    addCard: function(card) {
      this.$element.children('ul').append(card.$element);
    },
    removeColumn: function () {
      this.$element.remove();
    }
  };
  
  function Card(description) {
    var self = this;
    
    this.id = randomString();
    this.description = description;
    this.$element = createCard();
    
    function createCard() {
      
      var $card = $('<li>').addClass('card restored-item');
      var $cardDescription = $('<p>').addClass('card-description').text(self.description);
      var $cardDelete = $('<button>').addClass('card-delete').append('<i class="fa fa-minus" aria-hidden="true"></i>');
      var $cardEdit = $('<button>').addClass('edit').append('<i class="fa fa-pencil" aria-hidden="true"></i>');
      
      
      $cardDelete.click(function () {
        self.removeCard();
      });
      
      $cardEdit.click(function () {
        self.cardEdit($cardDescription);
      });
      
      
      $card.append($cardDelete)
      .append($cardDescription)
      .append($cardEdit);
      return $card;
    }
  }
  
  Card.prototype = {
    removeCard: function() {
      this.$element.remove();
    },
    
    cardEdit: function(newDescription) {
      var $newDescription = prompt('Edit your thought', newDescription.text());
      if ($newDescription !== null && $newDescription !== "") {
        this.$element.children('p').text($newDescription);
      }
    }
  };
  
  var board = {
    name: 'Board of Wisdom',
    addColumn: function(column) {
      this.$element.append(column.$element);
      initSortable();
    },
    $element: $('#board .column-container')
  };
  
  function initSortable() {
    $('.column-card-list').sortable({
      connectWith: '.column-card-list',
      placeholder: 'card-placeholder',
      forcePlaceholderSize: true,
      dropOnEmpty: true,
      tolerance: 'intersect'
    }).disableSelection();
  }
  
  $('.create-column').click(function() {
    var name = prompt('Enter a wisdom you are looking for');
    if (name) {
      var column = new Column(name);
      board.addColumn(column);
    }  else if (name === "") {
      alert('Please name your thought');
    }
  });
  
  
  var todoColumn = new Column('Finding Wisdom');
  var doingColumn = new Column('Thinking about Wisdom');
  var doneColumn = new Column('Forgeting Wisdom');
  
  
  board.addColumn(todoColumn);
  board.addColumn(doingColumn);
  board.addColumn(doneColumn);
  
  
  var card1 = new Card('Create card of Wisdom');
  var card2 = new Card('Move your thought');
  var card3 = new Card('Forget it!');
  
  
  todoColumn.addCard(card1);
  doingColumn.addCard(card2);
  doneColumn.addCard(card3);
});
