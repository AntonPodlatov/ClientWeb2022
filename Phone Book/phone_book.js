$(document).ready(function () {
    var phoneField = $("#phone");
    var nameField = $("#name");
    var surnameField = $("#surname");

    phoneField.inputmask({regex: phoneField[0].pattern});
    nameField.inputmask({regex: "[а-яА-ЯёЁa-zA-Z- ]*"});
    surnameField.inputmask({regex: "[а-яА-ЯёЁa-zA-Z- ]*"});

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
        $(".tbody_checkbox").not(this).prop('checked', this.checked);
    });

    function appendRow() {
        var newRow = $(
            "<tr class='table_row'><td></td><td>" + surnameField.val() +
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
            return one.closest(".table_row");
        });
    }
});