$(function(){

	var events = {
		
		render: function() {
			var source = $(".b-main__template").html();
			var templ = Handlebars.compile(source);
			$.getJSON('lections.json', function(data){
				var lections = data;
				$(".b-main__article").html(templ(lections));
			});
		}
	}

	events.render();
});