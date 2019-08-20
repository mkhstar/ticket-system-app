const express = require("express");
const router = express.Router();
const Ticket = require("../models/Ticket");
const paginate = require("array-paginate");

const uploadFiles = require("../utils/uploadFiles");
const deleteFiles = require("../utils/deleteFiles");

/**
 * @route   GET /api/customer?customerName=customer name
 * @desc    GET ALL TICKETS FROM CUSTOMER BY NAME
 * @access  PUBLIC
 */

router.get("/", async (req, res) => {
  const {
    customerName,
    page = 1,
    limit = 10,
    status,
    sortByDate = 1
  } = req.query;
  if (!customerName) return res.json({});
  else {
    try {
      const tickets = await Ticket.find({
        customerName,
        status: new RegExp(status || ".*", "gi")
      })
        .sort({ date: Number(sortByDate) })
        .lean();

      return res.json(paginate(tickets, Number(page), Number(limit)));
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

/**
 * @route   GET /api/customer/:id
 * @desc    GET ONE TICKET OF A CUSTOMER
 * @access  PUBLIC
 */

router.get("/:id", async (req, res) => {
  const { customerName } = req.query;
  const { id } = req.params;

  if (!customerName) return res.status(400).json("ERROR CREDENTIALS");
  else {
    try {
      const ticket = await Ticket.findOne({
        customerName,
        _id: id
      });

      return res.json(ticket);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

/**
 * @route   POST /api/customer
 * @desc    POST ONE TICKET
 * @access  PUBLIC
 */

router.post("/", async (req, res) => {
  const { isValid, errors } = require("../validations/ticketCustomer")(
    req.body,
    req.files
  );
  if (!isValid) return res.status(400).json(errors);
  else {
    try {
      const ticket = new Ticket({
        customerName: req.body.customerName,
        subject: req.body.subject,
        message: req.body.message
      });

      if (req.files && req.files.filesUploadedCustomer) {
        try {
          const fileNames = await uploadFiles(req.files.filesUploadedCustomer);
          ticket.filesUploadedCustomer = fileNames;
        } catch (err) {
          return res.status(500).json({ errType: "ERROR UPLOADING FILE", err });
        }
      }

      const ticketSaved = await ticket.save();
      return res.json(ticketSaved._id);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

/**
 * @route   PUT /api/customer
 * @desc    EDIT ONE TICKET
 * @access  PUBLIC
 */

router.put("/:id", async (req, res) => {
  const { isValid, errors } = require("../validations/editTicketCustomer")(
    req.body,
    req.files,
    req.params.id
  );
  if (!isValid) return res.status(400).json(errors);
  else {
    try {
      let ticket = await Ticket.findOne({
        customerName: req.body.customerName,
        _id: req.params.id
      });

      if (req.files && req.files.filesUploadedCustomer) {
        try {
          const fileNames = await uploadFiles(req.files.filesUploadedCustomer);
          if (ticket.filesUploadedCustomer.length > 0)
            await deleteFiles(ticket.filesUploadedCustomer);
          ticket.filesUploadedCustomer = fileNames;
        } catch (err) {
          res.status(500).json({ errType: "ERROR UPLOADING FILE", err });
        }
      }
      if (req.body.subject) ticket.subject = req.body.subject;
      if (req.body.message) ticket.message = req.body.message;
      const ticketUpdated = await ticket.save();
      return res.json(ticketUpdated);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

/**
 * @route   DELETE /api/customer/:id
 * @desc    DELETE ONE TICKET
 * @access  PUBLIC
 */

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const { customerName } = req.query;

  if (!customerName) res.status(400).json("Please submit required fields");
  else {
    try {
      const ticket = await Ticket.findOne({ customerName, _id: id });
      if (!ticket) return res.status(404).json("Ticket doesn't exist");
      else {
        const filesUploaded = [
          ...(ticket.filesUploadedCustomer || []),
          ...(ticket.filesUploadedAdmin || [])
        ];
        if (filesUploaded.length > 0) await deleteFiles(filesUploaded);
        await ticket.remove();
        return res.json("Successfully deleted ticket");
      }
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

module.exports = router;
