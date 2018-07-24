var main = function(){
    "use strict";

    $.get('tags', function(tags){
        var $tabs = $('.tabs');
        tags.forEach((tag)=>{
            var $tab = $('<a>').attr('href','#').append($('<span>').text(tag));
            $tabs.append($tab);
            $tab.on("click", function(e){
                var tag = e.target.innerText;
                $.get('findByTag/' + tag , function(todoObjects){
                    writeContent(todoObjects);
                })
            })
        });        
    });
}

var writeContent = function(todoObjects){
    $('.content').empty();
    var $content = $('<ul>');
    todoObjects.forEach(function(toDo){
        $content.append($('<li>').text(toDo.description));
    });

    $('.content').append($content);
}

$(document).ready(main);