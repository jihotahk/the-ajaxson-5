$(document).ready(function() {
    // register our function as the "callback" to be triggered by the form's submission event
    $("#form-gif-request").submit(fetchAndDisplayGif);
});

function fetchAndDisplayGif(event) {

    // prevent get request default action
    event.preventDefault();

    // first check riddle - if correct, run query, otherwise display error
    var riddle_ans = $('input[name="riddle"]').val();

    if (riddle_ans == 5) {
        // get rid of any error messages
        $('#riddle-feedback').empty()

        // get the user's input text from the DOM
        var searchQuery = $('input[name="tag"]').val();

        // configure a few parameters to attach to our request
        var params = {
            api_key: "dc6zaTOxFJmzC",
            tag : "jackson 5 "+searchQuery
        };

        // make an ajax request for a random GIF
        $.ajax({
            url: "https://api.giphy.com/v1/gifs/random",
            data: params, // attach those extra parameters onto the request
            success: function(response) {
                // jQuery passes us the `response` variable, a regular javascript object created from the JSON the server gave us
                // retrieve the image url
                var url = response['data']['image_url'];
                // set the image src attribute to the retrieved url
                $('#gif').attr('src', url);
                // toggle the status so it hides message and displays gif
                setGifLoadedStatus(true);
            },
            error: function() {
                // if something went wrong, the code in here will execute instead of the success function

                // give the user an error message
                $("#feedback").text("Sorry, could not load GIF. Try again!");
                setGifLoadedStatus(false);
                }
        });

    } else if (riddle_ans =="") {
        setGifDeletedStatus(false);
        $('#riddle-feedback').text('Please answer the riddle above.');
    } else {
        setGifDeletedStatus(false);
        $('#riddle-feedback').text('No gifs for you.');
    };

    // give user feedback while the ajax request is running
    $("#feedback").text("Loading...");
}

/**
 * toggles the visibility of UI elements based on whether a GIF is currently loaded.
 * if the GIF is loaded: displays the image and hides the feedback label
 * otherwise: hides the image and displays the feedback label
 */
function setGifLoadedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", isCurrentlyLoaded);
}

function setGifDeletedStatus(isCurrentlyLoaded) {
    $("#gif").attr("hidden", !isCurrentlyLoaded);
    $("#feedback").attr("hidden", !isCurrentlyLoaded);
}
