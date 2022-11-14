const redis_controller =require('../controller/redisController')
const router =require('express').Router()
router.get('/repos/:username',redis_controller.getRepos)
router.get('/Cache_data',redis_controller.cache)

module.exports =router