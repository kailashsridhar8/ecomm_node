$(document).ready(function(){          //$ MEANS JQUERY ....  $(document).ready(function() SYSTEM DEF FUNC
    $('form').on('submit',function(){
            var item =$('form input');
            var listitem={item: item.val()};

            $.ajax({
                type:'POST',
                url:'/backlog',
                data: listitem,
                success: function(data){
                    location.reload();
                }
            });
            return false;
    });
    $('li.remove').on('click',function(){
        var item=$(this).text().replace(/ /g,"-");
        $.ajax({
            type:'DELETE',
            url:'/backlog/'+ item,
            success: function(data){
                location.reload();
            }
        });
    });
    $('li.acart').on('click',function(){
        var item=$(this).text();
        var cartitem={item: item};
        $.ajax({
            type:'POST',
            url:'/cart',
            data:cartitem,
            success: function(data){
                location.reload();
            }
        });
    });

});   