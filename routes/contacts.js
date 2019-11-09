const router = require('express').Router();
const Contact = require('../models/Contacts');
const ensureAuth = require('./VerifyToken');
const { contactValidation, contactUpdateValidation } = require('../common/validation');
const { ObjectID } = require('mongodb')


router.get('/getData', ensureAuth, async (req, res) => {
    try {
        const pagination = req.query.pagination ? parseInt(req.query.pagination) : 10;
        const page = req.query.page ? parseInt(req.query.page) : 1;


        const contactList = await Contact.find({
            user: req.user._id
        },'-__v').skip((page - 1) * pagination)
            .limit(pagination)
            .sort({ createdAt: -1 });

        res.status(200).send(JSON.stringify(contactList));
    } catch (error) {
        res.status(400).send(error);
    }

})

router.post('/createContact', ensureAuth, async (req, res) => {
    let { error } = contactValidation(req.body);
    let errorMsg = `${error}`;
    if (error) return res.status(400).send(errorMsg);

    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        address: req.body.address,
        user: req.user._id
    });

    try {
        let savedContact = await contact.save();
        res.send(JSON.stringify({"msg":"Contact Successfully Created for loggedin User","data":savedContact}));
    } catch (error) {
        res.status(400).send(error);
    }

})

router.put('/updateContact/:id', ensureAuth, async (req, res) => {
    let { error } = contactUpdateValidation(req.body);
    let errorMsg = `${error}`;
    if (error) return res.status(400).send(errorMsg);

    const updates = Object.keys(req.body);
    const allowedUpdates = ["name", "address", "email"];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))
    if (!isValidOperation) {
        res.status(400).send('Invalid field for updates')
    }

    try {
        const _id = req.params.id
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send("Object ID format is not correct");
        }
        const contact = await Contact.findOne({ _id, user: req.user._id })

        if (!contact) {
            res.status(404).send("Invalid Contact ID");
        }

        updates.forEach((update) => contact[update] = req.body[update])
        await contact.save()

        res.send("Successfully Updated contact for loggedin User");
    } catch (error) {
        res.status(400).send(error);
    }

})

router.delete('/deleteContact/:id', ensureAuth, async (req, res) => {

    try {
        const _id = req.params.id
        if (!ObjectID.isValid(_id)) {
            return res.status(404).send("Object ID format is not correct");
        }
        const deletecontact = await Contact.findOneAndDelete({ _id, user: req.user._id })

        if (!deletecontact) {
            res.status(404).send("Invalid Cotact ID");
        }

        res.send("Successfully Deleted contact for loggedin User");
    } catch (error) {
        res.status(400).send(error);
    }

})


module.exports = router