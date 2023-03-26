const express = require("express")
const noteRouter = express.Router()
const { NoteModel } = require("../model/note.model")
const jwt = require("jsonwebtoken")


/**
 * @swagger
 * components:
 *   schemas:
 *     Note:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         sub:
 *           type: string
 *         body:
 *           type: string
 *         userID:
 *           type: string
 */

/**
 * @swagger
 * /notes:
 *   get:
 *     summary: This route is get all the notes from database.
 *     responses:
 *       200:
 *         description: The list of all the notes.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Note'
 */
noteRouter.get("/", async (req, res) => {
    try {
        const notes = await NoteModel.find()
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})

noteRouter.get("/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        const notes = await NoteModel.findOne({ _id: noteID })
        res.status(200).send(notes)
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


/**
 * @swagger
 * /notes/add:
 *  post:
 *      summary: To post a new notes to the database
 *      tags: [Notes]
 *      requestBody:
 *          required: true
 *          content:
 *              application/json:
 *                  schema:
 *                      $ref: '#/components/schemas/Note'
 *      responses:
 *          200:
 *              description: The note was successfully added.
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Note'
 *          400:
 *              description: Some server error
 */
noteRouter.post("/add", async (req, res) => {
    try {
        const note = new NoteModel(req.body)
        await note.save()
        res.status(200).send({ "msg": "A New Note has been added" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


/**
 * @swagger
 * /notes/update/:noteId:
 *   put:
 *     summary: To update a notes in the database using noteID
 *     tags: [Notes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Note'
 *     responses:
 *       200:
 *         description: The note was successfully updated.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Note'
 *       400:
 *         description: The specified user noteID does not exist.
 *       400:
 *         description: Some server error
 */
noteRouter.patch("/update/:noteID", async (req, res) => {
    const payload = req.body
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndUpdate({ _id: noteID }, payload)
        res.status(200).send({ "msg": "A New Note has been updated" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


/**
* @swagger
* /notes/delete/:noteId:
*   delete:
*     summary: To delete a user from the database using noteID 
*     tags: [Notes]
*     requestBody:
*       required: true
*       content:
*         application/json:
*           schema:
*             $ref: '#/components/schemas/Note'
*     responses:
*       200:
*         description: The note was successfully deleted.
*         content:
*           application/json:
*             schema:
*               $ref: '#/components/schemas/Note'
*       400:
*         description: The specified user noteID does not exist.
*       400:
*          description: Some server error
*/
noteRouter.delete("/delete/:noteID", async (req, res) => {
    const noteID = req.params.noteID
    try {
        await NoteModel.findByIdAndDelete({ _id: noteID })
        res.status(200).send({ "msg": "A New Note has been deleted" })
    } catch (err) {
        res.status(400).send({ "msg": err.message })
    }
})


module.exports = {
    noteRouter
}