
class Tree {
  constructor() {
    this.data = this.loadData();
    this.breadcrumb = [];
  }

  loadData() {
    //TODO Manage Ajax call
    return treeData;
  }

  addBreadcrumb(value) {
    this.breadcrumb.push(value);
  }

  removeBreacrumb() {
    this.breadcrumb = [];
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

  getQuestion(id = "0") {
    return this.searchQuestion(this.data, id);
  }
}

function displayBreadcrumb() {
  console.log(myTree.breadcrumb);
  $('#breadcrumb li').remove();
  if(myTree.breadcrumb && myTree.breadcrumb.length > 0) {
    myTree.breadcrumb.forEach((e, index) => {
      let q = myTree.getQuestion(e);
      $('#breadcrumb li').last().append(`<span class="badge badge-pill badge-info">${q.label}</span>`);
      if(q.question) {
        $('#breadcrumb ul').append(`<li data-id=${q.id}><span class="badge badge-pill badge-success">${index+1}</span>${q.question}</li>`)
      }
    });
  } else {
    $('#breadcrumb li').remove();
  }
}

function displayQuestions(dataQuestion) {
  if(dataQuestion.id || dataQuestion.id==0) myTree.addBreadcrumb(dataQuestion.id);
  $('#tree h1').html(dataQuestion.question || "");
  $('#tree li').remove();
  $('#tree-links div').remove();

  //Display Answer
  if(dataQuestion.answers) {
    dataQuestion.answers.forEach(
      (e) => $('#tree ul').append(`<li data-id=${e.id}>${e.label}</li>`)
    );
    $("#tree li").click(function() {
      displayQuestions(myTree.getQuestion($( this ).attr("data-id")));
      displayBreadcrumb();
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
      myTree.removeBreacrumb();
      displayQuestions(myTree.getQuestion());
      displayBreadcrumb();
    });

});
