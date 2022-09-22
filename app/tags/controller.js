const Tag = require('./model')

const store = async (req,res,next) => {
    try {
        let payload = req.body
        let tag = new Tag(payload)
        await tag.save()
        return res.json(tag)
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
        let tag = await Tag.find().skip(parseInt(skip)).limit(parseInt(limit))
        return res.json(tag)
    } catch (err) {
        next(err)
    }
}

const update = async (req,res,next) => {
    try {
        let payload = req.body
        let {id} = req.params
        let tag  = await Tag.findByIdAndUpdate(id, payload, {
            new: true,
            runValidators:true
        })
        return res.json(tag)
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
    let tag = await Tag.findByIdAndDelete(req.params.id)
    return res.json(tag)
}

module.exports = {store, index, update, destroy}