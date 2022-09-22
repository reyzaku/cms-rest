const Invoice = require('./model')
const { policyFor } = require('../../utils/index');
const { subject } = require('@casl/ability');

const show = async (req, res, next) => {
    try {
        let { order_id } = req.params
        let invoice = await Invoice.findOne({ order: order_id })
            .populate('order')
            .populate('user', '-token -password -createdAt -updatedAt -role')
            
            
        let policy = policyFor(req.user);
        let subjectInvoice = subject('Invoice', { ...invoice, user_id: invoice.user._id })
        if (!policy.can('read', subjectInvoice)) {
            return res.json({
                error: 1,
                message: 'Anda tidak memiliki akses untuk melihat invoice ini'
            })
        }
        return res.json(invoice)
    } catch (err) {
        if (err && err.name === 'ValidationError') {
            res.json({
                errpr: 1,
                message: 'Error when getting invoice',
                fields: err.errors
            })
        }
        next(err)
    }
}

module.exports = { show }