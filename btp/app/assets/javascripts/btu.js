$(document).ready(function() {
    $('.popover-input').popover();
});

function saveBtu() {
    $('#btuForm').submit();
}

$(document).ready(function() {
    //http://en.wikipedia.org/wiki/Luhn_algorithm
    function sum(nums) {
        var s = 0;
        for(var i=0; i<nums.length; i++) {
            s += nums[i];
        }
        return s;
    }

    var base = 36;

    function luhn_checksum(card_number) {
        //TODO: convert O's to 0's?
        function digits_of(n) {
            var digits = [];
            for(var i=0; i<n.length; i++) {
                digits.push(parseInt(n[i], base));
            }
            return digits;
        }

        digits = digits_of(card_number);
        var checksum = 0;

        //Odd digits
        for(var i=digits.length - 1; i>=0; i -= 2) {
            checksum += digits[i];
        }

        //Even digits
        for(var i=digits.length - 2; i>=0; i -= 2) {
            checksum += sum(digits_of((new Number(digits[i] * 2)).toString(base)));
        }
        return checksum % base;
    }

    function is_luhn_valid(card_number) {
        var correctCharactersAndLength = /^[0-9A-Z]+$/i.test(card_number);
        return correctCharactersAndLength && luhn_checksum(card_number) == 0;
    }

    $.validator.addMethod("validUUID", function(value, element) {
        return is_luhn_valid(value);
    }, "The UUID must be valid");

    $('#btuForm').validate({
        rules: {
            "btu[btuID]": { validUUID: true }
        },
        errorPlacement: function(error, element) {
            element.closest("p").append(error);
        }
    });
});

