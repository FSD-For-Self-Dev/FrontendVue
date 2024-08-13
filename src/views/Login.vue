<script lang="ts">
import {defineComponent} from 'vue'
import Input from "@/components/UI/input/Input.vue";
import Button from "@/components/UI/button/Button.vue";
import PageLayout from "@/components/UI/page-layout/PageLayout.vue";
import axios from "axios";


// qwavy1
// qwavy1@gmail.com
// qweasdzxcrty50

export default defineComponent({
  name: "Login",
  components: {PageLayout, Button, Input},
  data() {
    return{
      username:"",
      email:"",
      password:"",
      usernameValidationText:"",
      emailValidationText:"",
      passwordValidationText:"",
      rememberMe:false
    }
  },
  methods:{
    loginAccount(event){
      event.preventDefault()
      if(!this.validateEmail()){
        return
      }
      axios.post("https://linguista.onrender.com/api/auth/login/",{
        username: this.username,
        email: this.email,
        password: this.password,
      }).then((response) => {
        console.log(response)
        if(response.status == 200){
          alert("Успешно вошли")
        }else{
        }
      }).catch((err) => {
        console.log(err)
        const errMesage = err.response.data.non_field_errors[0]
        this.usernameValidationText = errMesage
        this.emailValidationText = errMesage
        this.passwordValidationText = errMesage
      })
    },
    validateEmail() {
      const emailPattern = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/;
      if(!emailPattern.test(this.email)){
        this.emailValidationText = 'Пожалуйста, введите корректный email.';
        return false
      }
      this.emailValidationText = ""
      return true
    }
  }
})
</script>

<template>
  <PageLayout>

    <div class="page-wrapper">
      <form class="page-form">
        <h2 class="title">Рады видеть вас снова!</h2>
        <div class="page-inputs">
          <Input class="page-input" v-model="username"  label="" placeholder="Логин" :validation-error="usernameValidationText" required/>
          <Input class="page-input" v-model="email"  label="" placeholder="Почта" :validation-error="emailValidationText" required/>
          <Input class="page-input" v-model="password" label="" type="password" placeholder="Пароль" :validation-error="passwordValidationText" required/>
        </div>
        <div class="form-actions">
          <div class="remember-me">
            <input v-model="rememberMe" model-value="" label="" type="checkbox" @click="!rememberMe"/>
            <span>Запомните меня </span>
          </div>
          <RouterLink to="#" class="link">Забыли пароль?</RouterLink>
        </div>
        <Button  class="page-button" @click="loginAccount" >Войти</Button>
        <div class="another-way-button">
        <span>Нет аккаунта?
          <RouterLink class="link" to="#">Зарегистрироваться</RouterLink>
        </span>
        </div>
      </form>
      <img class="page-image" src="../assets/images/auth-image.png" alt="auth image">
    </div>
  </PageLayout>
</template>

<style scoped lang="scss">
.page-wrapper{
  display: flex;
  justify-content: center;
}
.title{
  font-size: 20px;
  display: flex;
  justify-content: left;
  width: 100%;
  margin-left: 10px;
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

.form-actions{
  display: flex;
  justify-content: space-between;

  min-width: 32rem;

}

.page-button{
  min-width: 32rem;
  display: flex;
  justify-content: center;
  font-size: 16px;
  cursor: pointer;
}

.link{
  color: $primary-500;
}

.page-image{
}
</style>