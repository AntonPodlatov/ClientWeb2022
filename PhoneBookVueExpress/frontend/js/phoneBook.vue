<template>
  <div v-cloak class="container">
    <h4 class="text-center mt-3">Телефонная книга</h4>
    <form id="form" class="needs-validation" :class="{'was-validated' : isFormValidated}" novalidate @submit.prevent>
      <div class="row g-2 justify-content-end">
        <div class="col-sm-4">
          <label for="surname" class="form-label">Фамилия</label>
          <input v-model="newSurname" @input="checkNewSurname" :class="{'is-invalid' : isNewSurnameInvalid}"
                 type="text" class="form-control" required pattern="^[а-яА-ЯёЁa-zA-Z- ]*$">
          <div class="invalid-feedback">
            Укажите фамилию, используйте только буквы и дефис.
          </div>
        </div>
        <div class="col-sm-4">
          <label for="name" class="form-label">Имя</label>
          <input v-model="newName" @input="checkNewName" :class="{'is-invalid' : isNewNameInvalid}" type="text"
                 class="form-control" required pattern="^[а-яА-ЯёЁa-zA-Z- ]*$">
          <div class="invalid-feedback">
            Укажите имя, используйте только буквы и дефис.
          </div>
        </div>
        <div class="col-sm-4">
          <label for="phone" class="form-label">Номер телефона</label>
          <div class="input-group has-validation">
            <span class="input-group-text" id="prepend">+7</span>
            <input @input="isNewPhoneDuplicate = false"
                   v-model="newPhone"
                   v-mask="'###-###-####'"
                   :class="{'is-invalid':isNewPhoneDuplicate}"
                   type="tel" class="form-control" required placeholder="777-777-7777"
                   pattern="\d{3}-\d{3}-\d{4}">
            <div v-if="isNewPhoneDuplicate" class="invalid-feedback">
              <p class="flex-grow-1">Номер уже в списке.</p>
            </div>
            <div v-else class="invalid-feedback">
              Укажите номер телефона, используйте только цифры.<br>
              Указывать последние 10 цифр, без префикса "+7".
            </div>

          </div>
        </div>
        <div class="col-sm-4 d-flex mt-4 mt-sm-2">
          <button @click="addRecord" class="flex-grow-1 btn btn-outline-primary
                 text-nowrap" type="submit">Добавить запись
          </button>
        </div>
      </div>
    </form>

    <h4 class="mt-3">Поиск</h4>
    <form class="mt-2" @submit.prevent="loadRecords">
      <div class="d-flex">
        <input v-model="term" type="text" class="form-control"/>
        <button type="submit" class="ms-2 btn btn-outline-primary">Поиск</button>
      </div>
    </form>

    <div class="table-responsive">
      <table class="table table-hover mt-5">
        <thead>
        <tr class="text-center">
          <th scope="col">
            <input v-model="isAllChecked" @change="checkAllCheckboxes" type="checkbox"
                   class="form-check-input">
          </th>
          <th scope="col">#</th>
          <th scope="col">Фамилия</th>
          <th scope="col">Имя</th>
          <th scope="col">Номер телефона</th>
          <th scope="col">Удаление</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, index) in records" :key="record.id" class="tbody_row align-middle text-center">
          <td><input type="checkbox" class="form-check-input" v-model="record.isChecked"></td>
          <td>{{ index + 1 }}</td>
          <td>
            <div class="text-break text-wrap">{{ record.surname }}</div>
          </td>
          <td>
            <div class="text-break text-wrap">{{ record.name }}</div>
          </td>
          <td>{{ record.phone }}</td>
          <td class="justify-content-center">
            <button type="button" class="btn btn-outline-danger text-nowrap"
                    @click="showRemovingDialog(record)">Удалить запись
            </button>
          </td>
        </tr>
        </tbody>
      </table>
    </div>

    <div class="modal fade" tabindex="-1" id="modal" ref="modal_window" aria-hidden="true">
      <div class="modal-dialog">
        <div class="modal-content">

          <div class="modal-header">
            <h5 v-if="isSomethingChecked" class="modal-title">Удаление</h5>
            <h5 v-else class="modal-title">Удалить запись?</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Закрыть"></button>
          </div>

          <div ref="modal_body" class="modal-body text-start">
            <div v-if="isSomethingChecked"><b>Удалить отмеченные записи?</b></div>
            <div v-else>
              <p><b>Фамилия: </b>{{ recordToDelete.surname }}</p>
              <p><b>Имя: </b>{{ recordToDelete.name }}</p>
              <p><b>Номер телефона: </b>{{ recordToDelete.phone }}</p>
            </div>
          </div>

          <div class="modal-footer">
            <button @click="remove" type="button" class="btn btn-outline-danger"
                    data-bs-dismiss="modal">Да
            </button>
            <button type="button"
                    class="btn btn-outline-secondary" data-bs-dismiss="modal">Нет
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import VueMask from "v-mask";
import {Modal} from "bootstrap";
import $ from "jquery";

Vue.use(VueMask);

function get(url, data) {
  return $.get({
    url,
    data
  });
}

function post(url, data) {
  return $.post({
    url,
    data: JSON.stringify(data),
    contentType: "application/json"
  });
}

export default {
  data() {
    return {
      newName: "",
      newSurname: "",
      newPhone: "",
      term: "",

      nameRegex: /^[а-яА-ЯёЁa-zA-Z- ]*$/,

      isFormValidated: false,
      isNewNameInvalid: false,
      isNewSurnameInvalid: false,
      isNewPhoneDuplicate: false,

      records: [],
      recordToDelete: {},

      isSomethingChecked: false,
      isAllChecked: false
    }
  },

  created() {
    this.loadRecords();
  },

  methods: {
    loadRecords() {
      get("api/getRecords", {term: this.term})
          .done(records => {
            records.forEach(record => {
              record["isChecked"] = false;
            });

            this.records = records;
          })
          .fail(() => alert("Can`t load records."));
    },

    addRecord() {
      this.newName = this.newName.trim();
      this.newSurname = this.newSurname.trim();

      if (this.newName === "" || this.newSurname === "" ||
          this.newPhone === "" || this.newPhone.length < 12) {
        this.isFormValidated = true;
        return;
      }

      if (this.isNewSurnameInvalid || this.isNewNameInvalid) {
        return;
      }

      console.log(this.newPhone);

      post("/api/createRecord", {
        name: this.newName,
        surname: this.newSurname,
        phone: "+7-" + this.newPhone
      })
          .done(res => {
            if (res.success) {
              this.loadRecords();

              this.isFormValidated = false;
              this.newSurname = "";
              this.newName = "";
              this.newPhone = "";
            } else {
              if (res.messageArray.includes("Phone is a duplicate.")) {
                this.isNewPhoneDuplicate = true;
              } else {
                console.log(res.messageArray);
              }
            }
          })
          .fail(res => alert(res.message));
    },

    checkAllCheckboxes() {
      const isAllChecked = this.isAllChecked;

      this.records.forEach(function (record) {
        record.isChecked = isAllChecked;
      });
    },

    showRemovingDialog(record) {
      this.recordToDelete = record;
      this.isSomethingChecked = false;

      this.records.forEach(record => {
        if (record.isChecked) {
          this.isSomethingChecked = true;
        }
      });

      const modalWindow = this.$refs.modal_window;
      const modal = new Modal(modalWindow, {backdrop: true, keyboard: true, focus: true});
      modal.show();
    },

    remove() {
      const recordToDelete = this.recordToDelete;
      let idArray = [];

      if (this.isSomethingChecked) {
        this.records.forEach(record => {
          if (record.isChecked) {
            idArray.push(record.id);
          }
        });
      } else {
        idArray = [recordToDelete.id];
      }

      post("api/removeRecord", {
        idArray: idArray
      }).done(res => {
        if (res.success) {
          this.loadRecords();
        } else {
          console.log(res.message)
        }
      }).fail(() => alert("Can`t remove record(s)."));
    },

    checkNewName() {
      this.isNewNameInvalid = !this.nameRegex.test(this.newName);
    },

    checkNewSurname: function () {
      this.isNewSurnameInvalid = !this.nameRegex.test(this.newSurname);
    },
  }
}
</script>