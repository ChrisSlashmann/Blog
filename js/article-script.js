document.addEventListener("DOMContentLoaded", createArticle);

function createArticle() {
    let article = document.getElementById("article");

    // Создание заголовка статьи
    function createArticleTitle(title) {
      let titleSection = document.createElement('section');
      titleSection.classList.add('py-5', 'text-center', 'container', 'title-section');
      
      let articleTitle = document.createElement('h2');
      articleTitle.classList.add('fw-light', 'article__title');
      articleTitle.innerHTML = title;

      titleSection.append(articleTitle)

      return titleSection;
    };


    // Создание текста статьи 
    function createArticleText(text) {
      let articleText = document.createElement('p');
      articleText.classList.add('py-5', 'container', 'article__text');
      articleText.textContent = text;

      return articleText;
    };
    

    // Создание списка комментариев
    function createCommentsList(list) {
      let commentsSection = document.createElement('div');
      commentsSection.classList.add('py-5', 'bg-light', 'container', 'row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'g-3')
      
      let commentTitle = document.createElement('h2');
      commentTitle.classList.add('comment-title');
      commentTitle.textContent = 'Comments';

      let commentsList = document.createElement('ul');
      commentsList.classList.add('comments-list')
      
      for (let i = 0; i < list.length; i++) {
        let content = list[i];
        console.log(content);
        let commentItem = createComment(content);
        commentsList.append(commentItem);
      }

      commentsSection.append(commentTitle)
      commentsSection.append(commentsList)

      return commentsSection;
    }


    // Создание комментария
    function createComment({name, body}) {
      let commentItem = document.createElement('li');
      commentItem.classList.add('feature', 'col', 'comments-list__item');

      let commentPerson = document.createElement('h2');
      commentPerson.classList.add('comment-name');
      commentPerson.textContent = name;

      let commentText = document.createElement('p');
      commentText.classList.add('comment-text');
      commentText.textContent = body;

      commentItem.append(commentPerson);
      commentItem.append(commentText);

      return commentItem;
    }

    let index = document.location.search.substr(1);
    console.log(index);


    // Async для заголовка и текста
    async function getArticleData(source) {
      console.log(source);
      let dataSource = await fetch(source, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer af6f5589f6ff2707390bee9afd6cc07abd8642c68faf13e81bb3a7c037c98724'
          }
      });
      let articleData = await dataSource.json();
      console.log(articleData);

      let mainTitle = createArticleTitle(articleData.data.title);
      article.append(mainTitle);

      let mainText = createArticleText(articleData.data.body);
      article.append(mainText);

      return articleData;
    };

    getArticleData('https://gorest.co.in/public-api/posts/' + index).then((data) => {
      getCommentsData('https://gorest.co.in/public-api/comments?post_id=' + index);
    });


    // Async для комментариев
    async function getCommentsData(source) {
      console.log(source);
      let dataSource = await fetch(source, {
          method: 'GET',
          headers: {
              'Content-Type': 'application/json',
              Authorization: 'Bearer af6f5589f6ff2707390bee9afd6cc07abd8642c68faf13e81bb3a7c037c98724'
          }
      });
      let commentsData = await dataSource.json();
      console.log(commentsData);

      let mainList = createCommentsList(commentsData.data);
      article.append(mainList);

      return commentsData;
    };

    

};
