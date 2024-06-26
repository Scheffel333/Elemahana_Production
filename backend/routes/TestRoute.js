import {TestRecord} from "../models/TestModel.js";
import express from "express";

const router = express.Router();

// create a new record
router.post('/', async (request, response) => {
    try {
        if (
            !request.body.first_name ||
            !request.body.last_name ||
            !request.body.uemail ||
            !request.body.country ||
            !request.body.street_address ||
            !request.body.city ||
            !request.body.region ||
            !request.body.postal_code
        ) {
            return response.status(400).send({
                message: 'Send all required fields: name, country, city',
            });
        }

        const NewTestRecord = {
            first_name: request.body.first_name,
            last_name: request.body.last_name,
            uemail: request.body.uemail,
            country: request.body.country,
            street_address: request.body.street_address,
            city: request.body.city,
            region: request.body.region,
            postal_code: request.body.postal_code,
        };

        const testRecord = await TestRecord.create(NewTestRecord);
        return response.status(201).send(testRecord);

    }catch (error) {
        console.log(error.message);
        response.status(500).send({message: error.message});
    }
});

// Route for Get All from database

router.get('/', async (request, response) => {
    try {
        const testRecords = await TestRecord.find({});

        return response.status(200).json({
            count: testRecords.length,
            data: testRecords,
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Get One Book from database by id
router.get('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const testRecord = await TestRecord.findById(id);

        return response.status(200).json(testRecord);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Route for Update a Book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.first_name ||
            !request.body.last_name ||
            !request.body.uemail ||
            !request.body.country ||
            !request.body.street_address ||
            !request.body.city ||
            !request.body.region ||
            !request.body.postal_code
        ) {
            return response.status(400).send({
                message: 'Send all required fields: title, author, publishYear',
            });
        }

        const { id } = request.params;

        const result = await TestRecord.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});


// Route for Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        const result = await TestRecord.findByIdAndDelete(id);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;