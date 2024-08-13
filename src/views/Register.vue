<script lang="ts">
import {defineComponent} from 'vue'
import Input from "@/components/UI/input/Input.vue";
import Button from "@/components/UI/button/Button.vue";
import PageLayout from "@/components/UI/page-layout/PageLayout.vue";
import axios from "axios";

export default defineComponent({
  name: "Register",
  components: {PageLayout, Button, Input},
  data() {
    return{
      username:"",
      email:"",
      password:"",
      confirmPassword:""
    }
  },
  methods:{
    registerAccount(){
      axios.post("https://linguista.onrender.com/api/auth/registration/",{
        username: this.username,
        email: this.email,
        password1: this.password,
        password2: this.confirmPassword
      }).then((response) => {
        console.log(response)
        if(response.status == 204){
          alert("Успешно зарегистрировались")
        }
      })
    },
    test(){
      console.log(this.username , this.password)
    }
  }
})
</script>

<template>
  <PageLayout>

  <div class="page-wrapper">
    <div class="page-form">
      <h1>Добро пожаловать!</h1>
      <div class="page-inputs">

      <Input class="page-input" v-model="username"  label="" placeholder="Логин"/>
      <Input class="page-input" v-model="email" label="" type="email" placeholder="Email"/>
      <Input class="page-input" v-model="password" label="" type="password" placeholder="Пароль"/>
      <Input class="page-input" v-model="confirmPassword" label="" type="password" placeholder="Подтвердите пароль"/>
      </div>
      <Button  class="page-button" @click="registerAccount" >Создать Аккаунт</Button>
      <div class="page-divider">
      <span>
        или
      </span>
      </div>
      <Button size="normal" type="left-icon" icon="vk-default" variant="secondary" class="page-button yandex-button">Войти с помощью Яндекс</Button>
      <div class="another-way-button">
        <span>Уже есть аккаунт?
          <RouterLink class="another-way-link" to="#">Войти</RouterLink>
        </span>
      </div>
    </div>
    <img class="page-image" src="../assets/images/auth-image.png" alt="auth image">
  </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.page-wrapper{
  display: flex;
  justify-content: center;
}
  .page-form{
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 24px;
    padding: 45px;
  }
  .page-inputs{
    display: flex;
    flex-direction: column;
    gap: 12px;
  }
  .page-input{
  }
  .page-button{
    width: 80%;
    display: flex;
    justify-content: center;
    font-size: 16px;
    cursor: pointer;
  }
  .yandex-button{
    color: $primary-500;
  }
.page-divider {
  display: flex;
  align-items: center; // align text and lines vertically
  width: 80%;
}
.page-divider > span{
  margin:0 8px;
  color: $neutrals-600;
}
.page-divider::before,
.page-divider::after {
  content: '';
  height: 1px;
  background-color: silver;
  flex-grow: 1;
}
.another-way-button{

}
.another-way-link{
  color: $primary-500;
}
  .page-image{
  }
</style>