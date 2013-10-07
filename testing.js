console.log("Welcome Home");

var input = "undefined"

//helper function that returns the longest string of characters
function longest_word(strings) {
    var temp = strings[0];
    for (n = 0; n < strings.length; n++)
        if (strings[n].length > temp.length)
            temp = strings[n];
    return temp;
}

//this will find the longest string of characters seperated by spaces
function longest_sentence(input) {
    console.log("you entered:", input);
    var strings = input.split(" ");
    var word = longest_word(strings);
    return word;
}

