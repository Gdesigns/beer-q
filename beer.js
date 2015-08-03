$(document).ready(function() {
    
    // Global Variables

    var numberCorrect = 0;
    var currentQuestion = 0;
    var previousQuestion = currentQuestion - 1;
    var counter;

    // SET COUNTER AT 1;
    var resetCounters = function() {
        counter = 1;
        $('.current').text(counter);
    }

    resetCounters();
    
    // Questions

    var questions = [{
        question: "What are the four main ingredients in beer?",
        choices: ["Sugar, yeast, wheat, water","Malts, water, sugar, hops","Water, hops, malts, yeast","Wheat, yeast, water, hops"],
        qNum : 0,
        correct : 2,
        fact: "In it's most basic form, beer is made of four basic ingredients: Water, yeast, Malts, and hops."
        },
        {
        question: "What is the oldest active brewery in the world?",
        choices: ["Anheuser-Busch","Molson","Heineken","Weihenstephan"],
        qNum : 1,
        correct : 3,
        fact: "The Weihenstephan Brewery was licensed by the City of Freising in 1040, making it the oldest continuously operating brewery in the world."
        },
        {
        question: "This logo belongs to which brewery?",
        choices: ["Spaten","Beck's","Lowenbrau","Newcastle"],
        qNum : 2,
        correct : 1,
        fact: "Beck's Brewery, also known as Brauerei Beck & Co., is a German brewery. Beck's is the world's best selling German beer."
        },
        {
        question: "What was the first beer to win a blue ribbon at the 1893 World's Fair?",
        choices: ["Budweiser","Boston Lager","Busch","Pabst"],
        qNum : 3,
        correct : 3,
        fact: "Pabst Brewing Company claims their flagship beer (originally called Best Select) was renamed Pabst Blue Ribbon after winning the award for America's Best at the World's Fair in Chicago."
        },
        {
        question: "What US City is known as Beervana, because of all of the microbreweries there?",
        choices: ["Portland, OR","San Francisco, CA","Boston, MA","St. Louis, MO"],
        qNum : 4,
        correct : 0,
        fact: "With 61 breweries in the metro area alone, Portland has more brewpubs per capita than any other city in the United States."
    }]

    // Index Button - Start Game

    $("#index").on("click", "#enter", function (event) {
        $("#index").hide();
        $('.header').show();
        $('#quizQuestions').show();
        loadQuestion();
        imgChange();
        event.preventDefault();
    });

    // Answer Button

    $("#quizQuestions").on("click", "#submit", function (event) {
        answerCheck();
        event.preventDefault();
    });

    // Next Question Button

    $("#answerDiv").on("click", "#cont", function (event) {
        if (currentQuestion < 4) {
            currentQuestion++;
            counterInc();
            loadQuestion();
            imgChange();
            $('#answerDiv').hide();
            $('.resultIncorrect').hide();
            $('.resultCorrect').hide();
            $('#quizQuestions').show();
        }else{
            finalRank();
            $('#quizQuestions').hide();
            $('#answerDiv').hide();
            $('.resultIncorrect').hide();
            $('.resultCorrect').hide();
            $('#finalDiv').slideDown();
            $("#result").html("" +numberCorrect+ "");
        };
        event.preventDefault();
    });

    // Move Counter Forward

    var counterInc = function() {
        counter += 1;
        $('.current').text(counter);
    }

    // Play Again Button

    $("#finalDiv").on("click", "#retry", function (event) {
        retry();
        event.preventDefault();
    });

    // Load Question

    function loadQuestion() { 
            var newQuestion = '<h2 class="question">'+questions[currentQuestion].question+'</h2></br><div id="answerSelect"><ul class="choices"><li><input type="radio" id="radio1" name="option" class="option" value="0"><label for="radio1"><span class="answer">'+questions[currentQuestion].choices[0]+'</span></label></li><li><input type="radio" id="radio2" name="option" class="option" value="1"><label for="radio2"><span class="answer">'+questions[currentQuestion].choices[1]+'</span></label></li><li><input type="radio" id="radio3" name="option" class="option" value="2"><label for="radio3"><span class="answer">'+questions[currentQuestion].choices[2]+'</span></label></li><li><input type="radio" id="radio4" name="option" class="option" value="3"><label for="radio4"><span class="answer">'+questions[currentQuestion].choices[3]+'</span></label></li></div>';
            $("#questionArea").html(newQuestion);   
    };

    // Check Answer

    function answerCheck() {
        var answer = $("input[type='radio']:checked").val();
        if (answer == undefined) {
                alert('Please select an answer');
        }else if (answer == questions[currentQuestion].correct){
                numberCorrect++;
                ansChange();
                $('#quizQuestions').hide();
                $('#answerDiv').show();
                $('.resultCorrect').show();
                $("#explain").html("<p>"+questions[currentQuestion].fact+"</p>");
        }else{
                ansChange();
                $('#quizQuestions').hide();
                $('#answerDiv').show();
                $('.resultIncorrect').show();
                $("#explain").html("<p>"+questions[currentQuestion].fact+"</p>");
        };
    }

    // Change Question Image

    function imgChange() {
        if (currentQuestion == 0) {
            document.getElementById("charIcon").src = "images/question1.jpg";
        } else if (currentQuestion == 1){
            document.getElementById("charIcon").src = "images/question2.jpg";
        } else if (currentQuestion == 2){
            document.getElementById("charIcon").src = "images/question3.jpg";
        } else if (currentQuestion == 3){
            document.getElementById("charIcon").src = "images/question4.jpg";
        } else if (currentQuestion == 4){
            document.getElementById("charIcon").src = "images/question5.jpg";
        };
    }

    // Change Answer Image

    function ansChange() {
        if (currentQuestion == 0) {
            document.getElementById("ansIcon").src = "images/answer1.jpg";
        } else if (currentQuestion == 1){
            document.getElementById("ansIcon").src = "images/answer2.jpg";
        } else if (currentQuestion == 2){
            document.getElementById("ansIcon").src = "images/answer3.jpg";
        } else if (currentQuestion == 3){
            document.getElementById("ansIcon").src = "images/answer4.jpg";
        } else if (currentQuestion == 4){
            document.getElementById("ansIcon").src = "images/answer5.jpg";
        };
    }

    // Player Rank and Title

    var finalRank = function() {
        if (numberCorrect == 0) {
            $('.scoreTitle').text("Do you even drink beer?");
        } else if (numberCorrect == 1) {
            $('.scoreTitle').text("You should drink more beer!");
        } else if (numberCorrect == 2) {
            $('.scoreTitle').text("Occasional beer drinker");
        } else if (numberCorrect == 3) {
            $('.scoreTitle').text("Social beer drinker");
        } else if (numberCorrect == 4) {
            $('.scoreTitle').text("Beer Afficionado!");
        } else if (numberCorrect == 5) {
            $('.scoreTitle').text("Brewmaster!");
        };
    }

    // Play Again Function

    function retry() {
        numberCorrect = 0;
        currentQuestion = 0;
        $("#index").show();
        $('#finalDiv').hide();
        $('.header').hide();
    }
}); 