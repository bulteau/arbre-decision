
class Tree {
  constructor() {
    this.data = this.loadData();
  }

  loadData() {
    return treeData;
  }

  searchQuestion(data, id) {
    if(data.id == id) {
      return data;
    } else {
      if(data.answers) {
        for(let i=0;i<data.answers.length;i++) {
          const res = this.searchQuestion(data.answers[i], id);
          if (res) {
            return res;
          }
        }
      }
    }
  }

  getQuestion(id = 0) {
    return this.searchQuestion(this.data, id);
  }
}

function displayQuestions(dataQuestion) {
  $('#tree h1').html(dataQuestion.question);
  $('#tree li').remove();
  $('#tree-links div').remove();

  //Display Answer
  if(dataQuestion.answers) {
    dataQuestion.answers.forEach(
      (e) => $('#tree ul').append(`<li data-id=${e.id}>${e.label}</li>`)
    );
    $("#tree li").click(function() {
      displayQuestions(myTree.getQuestion($( this ).attr("data-id")));
    });
  } else {
    //Display Links
    if(dataQuestion.links) {
      dataQuestion.links.forEach(
        (e) => $('#tree-links').append(`<div><h2>${e.title}</h2><p>${e.desc}</p><a href=${e.url}>Découvrir</a></div>`)
      );
    }
  }
}
const myTree = new Tree();
$( document ).ready(function() {



    $('#exampleModal').on('show.bs.modal', function (event) {
      displayQuestions(myTree.getQuestion());
    });

});
