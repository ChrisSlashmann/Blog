(function(){
    // let invocation = new XMLHttpRequest();
    // let url = 'https://gorest.co.in/public-api/posts?page=10';

        // function callOtherDomain() {
        //     if(invocation) {
        //         invocation.open('GET', url, true);
        //         invocation.onreadystatechange = 'handler';
        //         invocation.send();
        //     }
        // }

        // callOtherDomain();    

    // Создание заголовка
    function createBlogTitle(title) {
        let titleSection = document.createElement('section');
        titleSection.classList.add('py-5', 'text-center', 'container', 'title-section');
            
        let blogTitle = document.createElement('h2');
        blogTitle.classList.add('fw-light', 'blog__title');
        blogTitle.innerHTML = title;

        titleSection.append(blogTitle)

        return titleSection;
    };
       

    // Создание списка статей
    function createArticleList() {
        let listField = document.createElement('ul');
        listField.classList.add('py-5', 'bg-light', 'container', 'row', 'row-cols-1', 'row-cols-sm-2', 'row-cols-md-3', 'g-3', 'list');
            
        return listField;
    };

    
    // Создание статьи
    function createArticleItem({title, body, comments, index}) {
        let item = document.createElement('li');
        item.classList.add('col', 'card', 'shadow-sm', 'card-body', 'item');
                        
        let itemTitle = document.createElement('h3');
        itemTitle.classList.add('item__title');

        let titleLink = document.createElement('a');
        titleLink.textContent = title;
        titleLink.setAttribute('href', 'article.html?' + index);
        // titleLink.addEventListener('click', () => {
        //     titleLink.classList.add('item__title_link');
        // });
            
        let itemText = document.createElement('p');
        itemText.classList.add('item__text');
        itemText.textContent = body;

        itemTitle.append(titleLink);
        item.append(itemTitle);
        item.append(itemText);
        
        return item;
    }

        
    // Создание навигации
    function createPagination(pages) {
        let paginationSection = document.createElement('div');
        paginationSection.classList.add('py-5', 'text-center', 'container', 'pagination');

        let linkGroup = document.createElement('ul');
        let paginationClass = 'pagination__list';
        linkGroup.classList.add(paginationClass);

        for (let i = 0; i < pages; i++) {
            let linkItem = document.createElement('li');
            linkItem.classList.add(paginationClass + '_item');

            let link = document.createElement('a');
            link.classList.add(paginationClass + '_link');
            link.textContent = i + 1;
            link.setAttribute("href", "index.html?page=" + [i + 1])

            linkItem.append(link);
            linkGroup.append(linkItem);
        }

        let prevlink = document.createElement('a');
        prevlink.classList.add('btn', 'btn-secondary', 'my-2');
        prevlink.textContent = '<'

        let nextlink = document.createElement('a');
        nextlink.classList.add('btn', 'btn-primary', 'my-2');
        nextlink.textContent = '>'

        paginationSection.append(prevlink);
        paginationSection.append(linkGroup);
        paginationSection.append(nextlink);
            
        return paginationSection;
    };


    // Async
    function action(blog, title, source) {
        let mainTitle = createBlogTitle(title);
        blog.append(mainTitle);
        let articleList = createArticleList();

        let position = source.indexOf('?');
        let sourceSearchParams = source.slice(position + 1);
        let searchParams = new URLSearchParams(sourceSearchParams);

        async function getData() {
            let dataSource = await fetch(source, {
                 method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: 'Bearer af6f5589f6ff2707390bee9afd6cc07abd8642c68faf13e81bb3a7c037c98724'
                }
            });
            let dataBase = await dataSource.json();
            console.log(dataBase.data.length);
                
            for ( let i = 0; i < dataBase.data.length; i++) {
                console.log(dataBase.data[i].id);
                let value = {title: dataBase.data[i].title, body: dataBase.data[i].body, comments: '', index: dataBase.data[i].id};
                let articleItem = createArticleItem(value);
                articleList.append(articleItem);
                blog.append(articleList);
            }
                
            let pagination = createPagination(dataBase.meta.pagination.limit);
            blog.append(pagination);
    
            return dataBase;
        };

        getData();
    }
        
    window.action = action;
    
})();
