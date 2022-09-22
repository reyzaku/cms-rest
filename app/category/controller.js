const path = require('path')
const fs = require('fs')
const config = require('../config')
const Categories = require('./model')

const store = async (req,res,next) => {
    try {
        let payload = req.body
        let category = new Categories(payload)
        await category.save()
        return res.json(category)
    } catch (err) {
        if (err && err.name === 'Vaidation Error') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const index = async (req,res,next) => {
    try {
        let {skip = 0, limit =10} = req.query
        let category = await Categories.find().skip(parseInt(skip)).limit(parseInt(limit))
        return res.json(category)
    } catch (err) {
        next(err)
    }
}

const update = async (req,res,next) => {
    try {
        let payload = req.body
        let {id} = req.params
        let category  = await Categories.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators:true
        })
        return res.json(category)
    } catch (err) {
        if (err && err.name === 'Vaidation Error') {
            return res.json({
                error: 1,
                message: err.message,
                fields: err.errors
            })
        }
        next(err);
    }
}

const destroy  = async (req,res,next) => {
    let category = await Categories.findByIdAndDelete(req.params.id)
    return res.json(category)
}

module.exports = {store, index, update, destroy}