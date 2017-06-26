var type = ["dogs", "cats", "birds"];

      function displayInfo() {

        var animal = $(this).attr("data-name");
        var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + animal + "&api_key=d4174006986541299ed0df9da9e675a7&limit=10";

        $.ajax({
          url: queryURL,
          method: "GET"
        })

        .done(function(response) {

        var results = response.data;

        $("#result-view").empty();

        for (var i = 0; i < results.length; i++) {

            var animalDiv = $("<div>");
            animalDiv.addClass("gif-Image");
       
            var p = $("<p>").text("Rating: " + results[i].rating.toUpperCase());
            p.addClass('test')
       
            var animalImage = $("<img>");
            animalImage.attr("src", results[i].images.fixed_height_still.url);
            animalImage.attr('data-still', results[i].images.fixed_height_still.url);
            animalImage.attr('data-state', 'still');
            animalImage.addClass('gif');
            animalImage.attr('data-animate', results[i].images.fixed_height.url);
            animalDiv.append(p);
            animalDiv.append(animalImage);

            $("#result-view").prepend(animalDiv);
          }
        
        });

      }

      function renderButtons() {

        $("#buttons-view").empty();
  
        for (var i = 0; i < type.length; i++) {
      
          var a = $("<button>");
          a.addClass("animal");
          a.addClass("btn btn-info") 
          a.attr("data-name", type[i]);     
          a.text(type[i]);
   
          $("#buttons-view").append(a);
        
        }
      }

      $("#add-animal").on("click", function(event) {
        
        event.preventDefault();
   
        var animal = $("#animal-input").val().trim();

        type.push(animal);
    
        renderButtons();
      
      });

      $(document).on("click", ".animal", displayInfo);

      renderButtons();

      $(document).on("click", ".gif", function() {

      var state = $(this).attr("data-state");
      var animate = $(this).attr("data-animate")
      var still = $(this).attr("src", $(this).attr("data-still"));

      if (state === "still") {
        $(this).attr("src", animate );
        $(this).attr("data-state", "animate");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    }); 