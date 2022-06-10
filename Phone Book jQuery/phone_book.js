$(document).ready(function () {
    var phoneField = $("#phone");
    var nameField = $("#name");
    var surnameField = $("#surname");

    var phoneRegexString = "\\d{3}-\\d{3}-\\d{4}";
    var nameRegexString = "^[а-яА-ЯёЁa-zA-Z- ]*$";
    var nameRegex = /^[а-яА-ЯёЁa-zA-Z- ]*$/;

    surnameField.prop("pattern", nameRegexString);
    nameField.prop("pattern", nameRegexString);
    phoneField.prop("pattern", phoneRegexString);
    phoneField.inputmask({regex: phoneRegexString});

    surnameField.on("input", function () {
        if (!nameRegex.test(surnameField.val())) {
            surnameField.addClass("is-invalid");
        } else {
            surnameField.removeClass("is-invalid");
        }
    });

    nameField.on("input", function () {
        if (!nameRegex.test(nameField.val())) {
            nameField.addClass("is-invalid");
        } else {
            nameField.removeClass("is-invalid");
        }
    });

    $("#button").on("click", function () {
        var form = document.querySelector(".needs-validation");

        if (!form.checkValidity()) {
            form.classList.add('was-validated');
        } else {
            if ($.inArray(phoneField.val(), getPhoneArray()) !== -1) {
                alert("Контакт с таким номером уже есть в списке.");
                return;
            }

            appendRow();
            phoneField.val("");
            nameField.val("");
            surnameField.val("");
            form.classList.remove("was-validated");
        }
    });

    $("#checkAll").on("change", function () {
        $(".tbody_checkbox").not(this).prop("checked", this.checked);
    });

    function appendRow() {
        var newRow = $(
            "<tr class='tbody_row'><td></td><td>" + surnameField.val() +
            "</td><td>" + nameField.val() +
            "</td><td class='phone_table_detail'>+7-" + phoneField.val() +
            "</td><td></td><td><input type='checkbox' class='form-check-input tbody_checkbox'></td><tr>"
        );

        var button = createRemoveRowButton(newRow);
        button.appendTo(newRow.children().get(4));

        var tbody = $("tbody");
        newRow.appendTo(tbody);
    }

    function createRemoveRowButton(row) {
        return $("<input type='button' value='Удалить запись' data-bs-toggle='modal' data-bs-target='#removeConfirmation'>")
            .on("click", function () {
                var content = $("#modal-content");
                var checkedRows = getCheckedRows();

                $("#canceledRemoveButton").on("click", function () {
                    content.text("");
                });

                if (checkedRows.length > 0) {
                    content.text("Удалить отмеченные контакты?");

                    $("#confirmedRemoveButton").on("click", function () {
                        $.each(checkedRows, function () {
                            this.remove();
                        });
                        content.text("");
                        $("#checkAll").prop("checked", false);
                    });
                } else {
                    var surname = row.children().get(1).innerHTML;
                    var name = row.children().get(2).innerHTML;
                    var phone = row.children().get(3).innerHTML;

                    $("<p>" + "Фамилия: " + surname + "</p>").appendTo(content);
                    $("<p>" + "Имя: " + name + "</p>").appendTo(content);
                    $("<p>" + "Номер телефона: " + phone + "</p>").appendTo(content);

                    $("#confirmedRemoveButton").on("click", function () {
                        row.remove();
                        content.text("");
                    });
                }
            });
    }

    function getPhoneArray() {
        var phoneTableDetails = $(".phone_table_detail");

        return $.map(phoneTableDetails, function (one) {
            return one.textContent.substring(3);
        });
    }

    function getCheckedRows() {
        var checkedRows = $(":checked");

        return $.map(checkedRows, function (one) {
            return one.closest(".tbody_row");
        });
    }
});