const customer = require('../models/customer.js')

exports.index = (req, res) => {
    res.send('<h1>Customer Application</h1><hr><a href="/api/customer">รายชื่อลูกค้า</a>')
}

exports.create = (req, res) => {
    const c = new customer(req.body)
    
    c.save().then(data => {
        res.json(data)
    }).catch(err => {
        return res.staus(500).json({
            msg: "Can't add any data bacause: " + err.message 
        })
    })
}

exports.findAll = (req, res) => {
    customer.find().then(data => {
        res.json(data)
    }).catch(err => {
        res.status(500).send({
            msg: err.message
        })
    })
}


exports.findById = (req, res) => {
    customer.findById(req.params.customerId).then(data=>{
        if(!data){
            return res.status(404).json({
                msg: "Can't find ID record" + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "Error occur because: " +err.message
        })
    })
}

exports.update = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId, {$set: req.body}, {new: true})
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "Can't find record ID: " + req.params.customerId
            })
        }
        res.json(data)
    }).catch(err => {
        return res.status(500).json({
            msg: "Can't Update data because: " + err.message
        })
    })
}

exports.delete = (req, res) => {
    customer.findByIdAndUpdate(req.params.customerId)
    .then(data => {
        if(!data){
            return res.status(404).json({
                msg: "Can't find record ID: " + req.params.customerId
            })
        }
        res.json({ msg: "Data Deleted!"})
    }).catch(err => {
        return res.status(500).json({
            msg: "Can't Update data because: " + err.message
        })
    })
}