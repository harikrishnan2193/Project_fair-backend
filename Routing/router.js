//router.js used to setup path to resolve request

//1) import express.
const express = require('express')
//2) import projectController
const projectsController = require('../controllers/projectsController')

//import jwtmiddleware
const jwtMiddleware = require('../Modals/Middleware/jwtMiddleware')

//5) import controler
const userController = require('../controllers/userController')
const multerConfig = require('../Modals/Middleware/multerMiddleware')
const jwtMiddleWare = require('../Modals/Middleware/jwtMiddleware')

//2)create an object for Router() class in the express modules
const router = new express.Router()

//3)path to resolve the request
    // syntax = router.httpreq('path',()=>{how to solve})
    //a)register
      router.post('/users/register',userController.register)

      //b)login
      router.post('/users/login',userController.login)

      //c) add project
      router.post('/project/add',jwtMiddleware,multerConfig.single(`projectImage`),projectsController.addProject)

      //d) home project
      router.get('/project/home-project',projectsController.gethomeProject)
      //e) allProject
      router.get('/project/all-project',jwtMiddleWare,projectsController.getallProject)

      //f) userProject
      router.get('/user/allproject',jwtMiddleWare,projectsController.getUserProject)

      //g) editProject
      router.put('/project/edit/:id',jwtMiddleWare,multerConfig.single('projectImage'),projectsController.editUserProject)

      //i) deleteProject
      router.delete('/project/remove/:id',jwtMiddleWare,projectsController.deleteUserProject)

      // edit profile
      router.put('/user/edit',jwtMiddleWare,multerConfig.single('profile'),userController.editUser)


//4)export router
module.exports = router