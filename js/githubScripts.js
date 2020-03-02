$.getJSON(
    "https://api.github.com/repos/fossasia/labs.fossasia.org/issues?labels=project&state=open&per_page=100"
)
.done(function(data){
    $('.loading').hide();
    $.each(data, function(i, item) {
        //List of Content
        var tag, tempHeading;
        $.each(item["labels"], function(i, label) {
            if (label["name"] != "project") {
                //tag = label["name"].replace(" ", "-");
    tempHeading = label["name"];
    tag = label["name"].split(" ").join("-");
            }
        });
        if ($("#" + tag + "-issues").length <= 0) {
            var a0 = $("<a>", {href: "#" + tag + "", id:"issue-tag", onClick: "desc"});
            var li0 = $("<li>", {class: "tags"});
            var ul = $("<ul>", {id: tag + "-issues"});
            var wrapperDiv = $("<div>", {id: tag + ""});
            var h1 = $("<h1>", {id: tag + "-description"});
            a0.html(tempHeading);
            li0.html(a0);
            li0.append(ul);
            $('#table').append(li0);
            h1.html(tempHeading);
            wrapperDiv.html(h1);
            $('#results_projects').append(wrapperDiv);
        }
        var a = $("<a>", {href: "#" + item["id"], id:"issue-link", onClick:"desc()"});
        var li = $("<li>");
        a.html(item["title"] + "<br>");
        li.html(a);
        $('#' + tag + '-issues').append(li);
        //Content Description
        var div = $("<div>", {id: item["id"]});
        var h4 = $("<h4>");
        var p = $("<p>");
        var bes = $("<a>",{href: item["html_url"], id: "issue-button"});
        var converter = new showdown.Converter();
        converter.setOption('simplifiedAutoLink', true);
        var body = converter.makeHtml(item["body"]);
        h4.html(item["title"]);
        p.html(body);
        bes.html("<p>"+"Read More.."+"</p>");
        div.html(h4);
        div.append(p);
        div.append(bes);
        $('#'+tag+'-description').append(div);
    });
    $("#results_projects div img").parent().css("border", "none");
    $("#results_projects div a").parent().css("list-style", "none");
});
