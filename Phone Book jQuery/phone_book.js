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
        surnameField.toggleClass("is-invalid", !nameRegex.test(surnameField.val()));
    });

    nameField.on("input", function () {
        nameField.toggleClass("is-invalid", !nameRegex.test(nameField.val()));
    });

    $("#button").click(function () {
        var form = $(".needs-validation");

        if (!form[0].checkValidity()) {
            form.addClass('was-validated');
        } else {
            if ($.inArray(phoneField.val(), getPhonesArray()) !== -1) {
                alert("Контакт с таким номером уже есть в списке.");
                return;
            }

            appendRow();
            phoneField.val("");
            nameField.val("");
            surnameField.val("");
            form.removeClass("was-validated");
        }
    });

    $("#checkAll").on("change", function () {
        $(".tbody_checkbox").not(this).prop("checked", this.checked);
    });

    function appendRow() {
        var newRow = $(
            "<tr class='tbody_row align-middle text-center'>" +
            "<td class='text-start'><input type='checkbox' class='form-check-input tbody_checkbox'></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td></td>" +
            "<td class='phone_table_detail'></td>" +
            "<td></td>" +
            "<tr>"
        );

        newRow.children().eq(2).text(surnameField.val());
        newRow.children().eq(3).text(nameField.val());
        newRow.children().eq(4).text("+7-" + phoneField.val());
        newRow.children().eq(5).html(createRemoveRowButton(newRow));

        var tbody = $(".phonebook_table_body");
        newRow.appendTo(tbody);
    }

    function createRemoveRowButton(row) {
        return $("<input type='button' value='Удалить запись' class='btn btn-outline-danger'" +
            " data-bs-toggle='modal' data-bs-target='#removeConfirmation'>")
            .click(function () {
                var content = $("#modal-content");
                var checkedRows = getCheckedRows();

                $("#canceledRemoveButton").click(function () {
                    content.text("");
                });
                $("#modal_window_close_button").click(function () {
                    content.text("");
                });

                if (checkedRows.length > 0) {
                    content.text("Удалить отмеченные контакты?");

                    $("#confirmedRemoveButton").click(function () {
                        $(checkedRows).remove();
                        content.text("");
                        $("#checkAll").prop("checked", false);
                    });
                } else {
                    var surname = row.children().get(1).innerHTML;
                    var name = row.children().get(2).innerHTML;
                    var phone = row.children().get(3).innerHTML;

                    $("<p><b>Фамилия:</b> " + surname + "</p>").appendTo(content);
                    $("<p><b>Имя:</b> " + name + "</p>").appendTo(content);
                    $("<p><b>Номер телефона:</b> " + phone + "</p>").appendTo(content);

                    $("#confirmedRemoveButton").on("click", function () {
                        row.remove();
                        content.text("");
                    });
                }
            });
    }

    function getPhonesArray() {
        return $(".phone_table_detail").map(function () {
            return this.textContent.substring(3);
        });
    }

    function getCheckedRows() {
        return $(".tbody_row :first-child :checked")
            .closest(".tbody_row");
    }
});