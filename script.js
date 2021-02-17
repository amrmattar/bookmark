function saveBookmark(){
    var siteName =document.getElementById('siteName').value;
    var siteUrl =document.getElementById('siteUrl').value;
    $(".valid").hide();
    $("#v1").hide();
    if(!validateForm(siteName, siteUrl)){
    return false;
    }
    var bookmark = {
    name: siteName,
    url: siteUrl
    }

    if(localStorage.getItem('bookmarks') === null){
    var bookmarks = [];
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    bookmarks.push(bookmark);
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    }

    document.getElementById('myForm').reset();
    fetchBookmarks();
    e.preventDefault();
}

function fetchBookmarks(){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    var bookmarksResults = document.getElementById('bookmarksResults');
    bookmarksResults.innerHTML = '';
    for(var i = 0; i < bookmarks.length; i++){
    var name = bookmarks[i].name;
    var url = bookmarks[i].url;
    bookmarksResults.innerHTML += '<div class="well">'+
                                '<h3>'+name+
                                ' <a class="btn btn-primary "  target="_blank" href="'+addhttp(url)+'">Visit</a> ' +
                                ' <a onclick="displayBookmark(\''+url+'\')"  style="mx-auto" class="btn btn-warning" href="#">update</a> ' +
                                ' <a onclick="deleteBookmark(\''+url+'\')" style="mx-auto" class="btn btn-danger" href="#">Delete</a> ' +
                                '</h3>'+
                                '</div>';
    }
}

function addhttp(url) {
if (!/^(?:f|ht)tps?\:\/\//.test(url)) {
    url = "http://" + url;
    }
return url;
}

function deleteBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
        bookmarks.splice(i, 1);
    }
    }
    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
}
function displayBookmark(url){
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    for(var i =0;i < bookmarks.length;i++){
    if(bookmarks[i].url == url){
        var x = i;
        document.getElementById('siteName').value = bookmarks[i].name;
        document.getElementById('siteUrl').value  = bookmarks[i].url;
    }
    }
        document.getElementById("submit").innerHTML="Update";
        document.getElementById("submit").onclick=function() { updatebookmark(x);};
}

function updatebookmark(x){
        var siteName =document.getElementById('siteName').value;
        var siteUrl =document.getElementById('siteUrl').value;
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
        var bookmark = {
        name: siteName,
        url: siteUrl
    }
    bookmarks[x] = bookmark;
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    fetchBookmarks();
    document.getElementById("submit").innerHTML="submit";
    document.getElementById('myForm').reset();
}

function validateForm(siteName, siteUrl){
    if(!siteName || !siteUrl){
    $(".valid").show();
        //alert('Please fill in the form');
    return false;
    }
    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if(!siteUrl.match(regex)){
    //alert('Please use a valid URL');//call here
    $("#v1").show();
    return false;
    }
    return true;
}


