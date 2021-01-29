import Vue from 'vue'
import VueRouter from 'vue-router'

import store from '../store/index'

import Dashboard from '../views/Dashboard.vue'

import AdminBase from '../views/Admin/Base.vue'
import UserBase from '../views/User/Base.vue'
import AuthBase from '../views/Auth/Base.vue'

Vue.use(VueRouter)

const routes = [
  // Dashboard
  
  {
    path: '/',
    name: 'Dashboard',
    meta: {
      auth: true
    },
    component: Dashboard
  },

  //  Auth

  {
    path: '/auth',
    name: 'Auth',
    component: AuthBase,
    children: [
      {
        path: 'login',
        component: () => import(/* webpackChunkName: "login" */ '../views/Auth/Login.vue')
      },
      {
        path: 'register',
        component: () => import(/* webpackChunkName: "register" */ '../views/Auth/Register.vue')
      },
      {
        path: 'send-verify-email',
        component: () => import(/* webpackChunkName: "send-verify-email" */ '../views/Auth/SendVerifyEmail.vue')
      },
      {
        path: 'verify-email/:id',
        component: () => import(/* webpackChunkName: "verify-email" */ '../views/Auth/VerifyEmail.vue')
      },
      {
        path: 'send-reset-password-email',
        component: () => import(/* webpackChunkName: "send-reset-password-email" */ '../views/Auth/SendResetPasswordEmail.vue')
      },
      {
        path: 'reset-password/:id',
        component: () => import(/* webpackChunkName: "reset-password" */ '../views/Auth/ResetPassword.vue')
      },
    ]
  },

  // Base

  {
    path: '/admin',
    name: 'Admin',
    component: AdminBase,
    meta: {
      auth: true,
      admin: true
    },
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/Admin/Dashboard.vue')
      },
      {
        path: 'profile/:id',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      },
      // Data Guru
      {
        path: 'data-guru',
        component: () => import(/* webpackChunkName: "data-guru" */ '../views/Admin/Guru/Table.vue')
      },
      {
        path: 'data-guru/create',
        component: () => import(/* webpackChunkName: "create-data-guru" */ '../views/Admin/Guru/Add.vue')
      },
      {
        path: 'data-guru/edit/:id',
        component: () => import(/* webpackChunkName: "edit-data-guru" */ '../views/Admin/Guru/Edit.vue')
      },
      // PKG
      {
        path: 'pkg/create',
        component: () => import(/* webpackChunkName: "pkg" */ '../views/Admin/Pkg/PkgStart.vue')
      },
      {
        path: 'pkg/create/confirm',
        component: () => import(/* webpackChunkName: "pkg" */ '../views/Admin/Pkg/PkgConfirm.vue')
      },
      {
        path: 'pkg/create/:idQuestion',
        component: () => import(/* webpackChunkName: "pkg" */ '../views/Admin/Pkg/PkgQuestions.vue')
      },
      {
        path: 'hasil-pkg',
        component: () => import(/* webpackChunkName: "hasil-pkg" */ '../views/Admin/Pkg/PkgHasil.vue')
      },
      {
        path: 'hasil-pkg/:idGuru',
        component: () => import(/* webpackChunkName: "hasil-pkg-detail" */ '../views/Admin/Pkg/PkgHasilDetail.vue')
      },
      {
        path: 'hasil-pkg/:idGuru/:idFeedback',
        component: () => import(/* webpackChunkName: "hasil-pkg-detail-kompetensi" */ '../views/Admin/Pkg/PkgHasilDetailKompetensi.vue')
      },
    ]
  },

  {
    path: '/user',
    name: 'User',
    component: UserBase,
    meta: {
      auth: true
    },
    children: [
      {
        path: 'home',
        component: () => import(/* webpackChunkName: "home" */ '../views/User/Dashboard.vue')
      },
      {
        path: 'profile/:id',
        component: () => import(/* webpackChunkName: "profile" */ '../views/Profile.vue')
      },
      {
        path: 'hasil-pkg/:idGuru',
        component: () => import(/* webpackChunkName: "hasil-pkg-detail" */ '../views/User/PkgHasilDetail.vue')
      },
      {
        path: 'hasil-pkg/:idGuru/:idFeedback',
        component: () => import(/* webpackChunkName: "hasil-pkg-detail-kompetensi" */ '../views/User/PkgHasilDetailKompetensi.vue')
      },
    ]
  },

  // 404
  {
    path: '*',
    component: () => import(/* webpackChunkName: "home" */ '../views/404.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach((to, from, next) => {
  // jika routing ada meta auth-nya maka
  if (to.matched.some(record => record.meta.auth)) {
    // jika user adalah guest
    if (store.getters['auth/guest']) {
      // tampilkan pesan bahwa harus login dulu
      store.dispatch('alert/set', {
        status: true,
        text: 'Login first',
        color: 'error',
      })
      // catat link sebelum nya
      store.dispatch('prevUrl/setPrevUrl', to.path)

      //redirect ke form login
      next('/auth/login')
    } 
    // Jika Routing ada meta admin-nya maka
    else if (to.matched.some(record => record.meta.admin)) {
      // jika user bukan admin
      if (store.getters['auth/user'].profile.role != 'admin') {
        // tampilkan pesan Unauthorized !
        store.dispatch('alert/set', {
          status: true,
          text: 'Bukan Admin!',
          color: 'error',
        })

        //redirect ke dashboard
        next('/')
      } else {
        next()
      }
    } 
    // Bukan auth dan admin lanjut
    else {
      next()
    }
  } 
  // Bukan Auth
  else {
    next()
  }
})

export default router
