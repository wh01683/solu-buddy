var volumes = [];
var values = [];

$(function () {
    var divClone = $("#answerDiv").clone();
    var myParam = location.search.split('value=')[1]

    //Used for holding a copy of the external standard flask div
    var externalFlask;

    //Back arrow for answer page
    $("#arrowContainer img").click(function() {
        //Hide answer Div
        $("#answerDiv").hide();

        //Show page content
        $("#inputDiv").show();

        //Save the first dilution flask so that it can be cloned again later, delete the rest.
        externalFlask = $("#dilutionFlasksDiv").children().first().clone();
        $("#dilutionFlasksDiv").empty().append(externalFlask);

    });

    function validateInput(){

        var solventFormula = $("#solvent_formula").val();
        var analyteFormula = $("#analyte_formula").val();
        var analyteMolWeight = Number($("#analyte_molec_weight").val());
        var unknown = $("#unknown").val();
        var numStandards = Number($("#num_standards").val());
        var totalVolume = Number($("#total_volume_standards").val());
        var volumeStandards = Number($("#volume_standards").val());
        var analyteMolarity = Number($("#analyte_molarity").val());
        var internalMolarity = Number($("#internal_molarity").val());
        var internalFormula =  $("#internal_formula").val();
        var unknownVolume = Number($("#unknown_volume").val());

        if(analyteMolarity == "") {
            showAlert("Please enter analyte molarity!");
            return false;
        }
        if(analyteMolarity <= 0 ) {
            showAlert("Please enter an analyte molarity greater than 0!");
            return false;
        }
        if(isNaN(analyteMolarity)) {
            showAlert("Analyte Molarity must be a number!");
            return false;
        }
        //If no analyte entered
        if (analyteFormula == "") {
            showAlert("Please enter a name for your analyte!");
            return false;
        }
        // If invalid number standards entered
        if (numStandards <= 0 || numStandards > 20) {
            showAlert("Please enter a number of standards less than 20 and greater than 0!");
            return false;
        }
        //If num_standards null
        if (numStandards == "") {
            showAlert("Please enter a number of standards!");
            return false;
        }
        if (Number.isInteger(numStandards) == false) {
            showAlert("Number of standards must be an integer!");
            return false;
        }
        // If no total flask volume entered
        if (totalVolume == "") {
            showAlert("Please enter a flask volume!");
            return false;
        }
        // If total flask volume entered <= 0
        if (totalVolume <= 0) {
            showAlert("Please enter a total flask volume greater than 0!");
            return false;
        }
        if (Number.isInteger(totalVolume) == false) {
            showAlert("Total volume must be a number");
            return false;
        }
        if(myParam == "EXTERNAL") {
            //If no solvent entered
            if (solventFormula == "") {
                showAlert("Please enter a name for your solvent!");
                return false;
            }

            // If no mol weight entered
            if (analyteMolWeight == "") {
                showAlert("Please enter a Molecular Weight for your analyte!");
                return false;
            }
            if (analyteMolWeight <= 0) {
                showAlert("Please enter a Molecular Weight that is greater than 0!");
                return false;
            }
            if (isNaN(analyteMolWeight)) {
                showAlert("Analyte Molecular Weight must be a number!");
                return false;
            }
            
        } else if(myParam == "INTERNAL") {

            if(internalFormula == "") {
                showAlert("Please enter a name for your internal standard!");
                return false;
            }
            if(internalMolarity == "") {
                showAlert("Please enter internal standard molarity!");
                return false;
            }
            if(internalMolarity <= 0 ) {
                showAlert("Please enter an internal standard molarity greater than 0!");
                return false;
            }
            if(isNaN(internalMolarity)) {
                showAlert("Internal Standard Molarity must be a number!");
                return false;
            }
        } else if (myParam == "ADDITION") {
            if(unknown == "") {
                showAlert("Please enter a name for the unknown!");
                return false;
            }
            if(unknownVolume == "") {
                showAlert("Please enter a volume of the unknown to put in each flask!");
                return false;
            }
            if(unknownVolume <= 0 ) {
                showAlert("Please enter an unknown volume greater than 0!");
                return false;
            }
            if(isNaN(unknownVolume)) {
                showAlert("Unknown volume for each flask must be a number!");
                return false;
            }
            if(unknownVolume >= totalVolume) {
                showAlert("Volume of unknown can't be greater than total volume of flask!");
                return false;
            }
        }

        hideAlert();
        return true;
    }

    //Hide the alert DIV
    function hideAlert(alertMessage){
        $("#myAlert").css("display","none");
    }
    //Show the alert div
    function showAlert(alertMessage){
        $("#myAlert").css("display","block").html(alertMessage);
    }

    $("#nextButton").click(function () {

        if (validateInput()) {
            //Hide page content
            $("#inputDiv").hide();
            //Show answer div
            $("#answerDiv").show();

            var solventFormula = $("#solvent_formula").val();
            var analyteFormula = $("#analyte_formula").val();
            var analyteMolWeight = Number($("#analyte_molec_weight").val());
            var unknown = $("#unknown").val();
            var numStandards = Number($("#num_standards").val());
            var totalVolume = Number($("#total_volume_standards").val());
            var volumeStandards = Number($("#volume_standards").val());
            var analyteMolarity = Number($("#analyte_molarity").val());
            var internalMolarity = Number($("#internal_molarity").val());
            var internalFormula = $("#internal_formula").val();
            var unknownVolume = Number($("#unknown_volume").val());


            if (myParam == "EXTERNAL") {
                $("#answerDivHeader").text("External Standards Method");
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#standardSolutionDiv").hide();

                //Iterate through number of flasks inputted and add them to the page.
                for (var i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);
                }
            }
            else if (myParam == "INTERNAL") {

                $("#answerDivHeader").text("Internal Standards Method");
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);
                $("#SolutionDescription").text('Internal Standard: ' + internalFormula);
                $("#dilutionFlask0").prepend($('<input type="text" id="volumeOfIS" class="flaskInputIS" placeholder="Enter volume of internal standard to add to the solution">'));

                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);
                }

            }
            else if (myParam == "ADDITION") {
                $("#answerDivHeader").text("Standard Addition Method filled with Water");
                $("#SolutionDescription").html('Unknown: ' + unknown);
                $("#analyteSolutionDescription").html('Analyte: ' + analyteFormula);


                //Iterate through number of flasks inputted and add them to the page.
                for (i = 0; i < numStandards - 1; i++) {
                    dilutionFlask = $("#dilutionFlask0").clone();
                    //Set flask number
                    dilutionFlask.find("#flaskNumber").text(i + 2);
                    $("#dilutionFlasksDiv").append(dilutionFlask);

                }
                $($("#dilutionFlasksDiv").children()[0].children[0].children[0]).hide();
                $($("#dilutionFlasksDiv").children()[0].children[1].children[0]).html('Molarity ' + SingleDilution(1, totalVolume/1000).solute_molarity(unknownVolume));
            }
        }

        if (myParam == "EXTERNAL") {
            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);

                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                var vNum = Number(v.val());

                if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
                if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum);
                    console.log(molarity);
                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity ' + molarity);
                }
            });
        } else if(myParam == "INTERNAL") {

            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);
                window.v = v;
                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                var vNum = Number(v.val());

                if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
                if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum);

                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity with Analyte ' + molarity + '\n');
                }

            });

            $(".flaskInputIS", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);

                if (v.val() == "") {
                    window.alert("Please enter a volume of internal standard for the flask!");
                    valid = false;
                }

                var vNum = Number(v.val());

                if (vNum <= 0) {
                    window.alert("Please enter a volume of internal standard greater than 0");
                    valid = false;
                }
                if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of internal standard that is not greater than the total volume of the flask");
                    valid = false;
                }
                if (isNaN(vNum)) {
                    window.alert("Volume of internal standard must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum);

                    /* TODO print molarity to div

                     */
                }

            });

        } else if(myParam == "ADDITION") {
            $(".flaskInput", "#dilutionFlasksDiv").on('focusout', function () {
                var valid = true;
                var v = $(this);

                if (v.val() == "") {
                    window.alert("Please enter a volume of analyte for the flask!");
                    valid = false;
                }

                var vNum = Number(v.val());

                if (vNum <= 0) {
                    window.alert("Please enter a volume of analyte greater than 0");
                    valid = false;
                }
                if (vNum >= totalVolume) {
                    window.alert("Please enter a volume of analyte that is not greater than the total volume of the flask");
                    valid = false;
                }
                if (isNaN(vNum)) {
                    window.alert("Volume of analyte must be a number");
                    valid = false;
                }
                if (valid) {
                    var molarity = new SingleDilution(analyteMolarity, (totalVolume / 1000)).solute_molarity(vNum + unknownVolume);
                    $($(v).parent().next().children(".flaskCalc")[0]).html('Molarity ' + molarity);
                }
            });
        }
    });

});
