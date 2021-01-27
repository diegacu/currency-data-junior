$(document).ready(function() {
    $("#exchange").click(function() { //Exchanges the 'from' currency and the 'to' currency
        let from_currency = $("#currency_from").val();
        let to_currency = $("#currency_to").val();
       
        if(to_currency != "EUR"){
            $("#currency_to")
            .find('option')
            .remove()
            .end()
            .append(`<option value="EUR"> EUR </option>`)
            $("#currency_from").val(to_currency)
        }

        else {
            $("#currency_from").val(to_currency)
            $("#currency_to")
            .find('option')
            .remove()
            .end()
            .append(`<option value="USD"> USD </option>
            <option value="CHF"> CHF </option>`)
            $("#currency_to").val(from_currency)
        }
    });

    $("#currency_from").change(function(){ //Makes sure that when trying to convert to CHF/USD when selecting EUR and vice versa
        let from_currency = $("#currency_from").val();
        if(from_currency == "EUR"){
            $("#currency_to")
            .find('option')
            .remove()
            .end()
            .append(`<option value="USD"> USD </option>
            <option value="CHF"> CHF </option>`)
        }
        else {
            $("#currency_to")
            .find('option')
            .remove()
            .end()
            .append(`<option value="EUR"> EUR </option>`)
        }
    });

    $("#submit").click(function(){ //Makes post call and obtains the result conversion
        var amount =  $("#amount").val()
        var from_currency = $("#currency_from").val();
        var to_currency = $("#currency_to").val();

        let obj = {
            amount : amount,
            from_currency: from_currency,
            to_currency: to_currency
        }
        let send = JSON.stringify(obj)

        let display = $("#result").css('display')

        if(!isNaN(amount) && amount) {
           $.post("/run",send)
           .done(function(result) {
                if(!isNaN(amount)){
                    $("#error_text").empty();
                    $("#result_title").empty();
                    $("#result_quantity").empty();
                    $("#result_title").append("The result of converting " + amount + " " + from_currency + " to " + to_currency +" is:");
                    $("#result_quantity").append(amount+" " + to_currency);
                    if(display == "none"){
                        $("#result").slideToggle("slow")
                    }
                }
                else{
                    console.error(result)
                }
            })
            .fail(function(xhr, status, error) {
                $("#result_title").empty()
                $("#result_quantity").empty()
                $("#error_text").empty();
                $("#error_text").append("There was an error in the server side, please check it");
                if(display == "none"){
                    $("#result").slideToggle("slow")
                }
            });
        }
        else {
            $("#result_title").empty();
            $("#error_text").empty();
            $("#result_quantity").empty()
            $("#error_text").append("The amount introduced should be a number");
            if(display == "none"){
                $("#result").slideToggle("slow")
            }
        }

        return false;
    });
});
