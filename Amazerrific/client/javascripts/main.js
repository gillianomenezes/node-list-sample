var main = function(){
    "use strict";
    
    loadTabs();
}

var loadTabs = function(){
    createAddTab();

    $.get('tags', function(tags){
        var $tabs = $('.tabs');
        tags.forEach((tag)=>{
            var $tab = $('<a>').attr('href','#').append($('<span>').text(tag));
            $tabs.append($tab);            
        });    
        
        setTabClickEvent();
    });
}

var createAddTab = function(){
    var $span = $('<span>').text('Add');
    $span.addClass('active add-tab')
    var $tab = $('<a>').attr('href', '#').append($span);
    $('.tabs').append($tab);
    writeAddTabContent();
}

var setTabClickEvent = function(){
    var $tabs = $('.tabs').find('span').toArray();
    $tabs.forEach((tab) =>{
        $(tab).on("click", function(e){
            var tag = e.target.innerText;
            setActive(e.target);

            if($(tab).hasClass('add-tab')){
                writeAddTabContent();
            }else{
                $.get('findByTag/' + tag , function(todoObjects){
                    writeContent(todoObjects);
                })
            }
        })
    })
}

var setActive = function(tab){
    var $spanTabs = $('.tabs').find('span').toArray();
    $spanTabs.forEach((spanTab) =>{
        $(spanTab).removeClass('active');
    });
    $(tab).addClass('active');
}

var writeContent = function(todoObjects){
    $('.content').empty();
    var $content = $('<ul>');
    todoObjects.forEach(function(toDo){
        $content.append($('<li>').text(toDo.description));
    });

    $('.content').append($content);
}

var writeAddTabContent = function(){
    $('.content').empty();
    var $descriptionLabel = $('<label>').text('Descrição:');    
    var $inputDescription = $('<input>');
    var $tagslabel = $('<label>').text('Tags:');
    var $inputTags = $('<input>');
    $('.content').append($descriptionLabel);
    $('.content').append($inputDescription);
    $('.content').append($tagslabel);
    $('.content').append($inputTags);
}

$(document).ready(main);