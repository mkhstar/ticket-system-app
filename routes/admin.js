const express = require("express");
const router = express.Router();
const paginate = require("array-paginate");
const Ticket = require("../models/Ticket");

const uploadFiles = require("../utils/uploadFiles");
const deleteFiles = require("../utils/deleteFiles");
/**
 * @route   GET /api/admin
 * @desc    GET ALL TICKETS POSTED BY CUSTOMERS
 * @access  PUBLIC
 */

router.get("/", async (req, res) => {
  const {
    customerName,
    page = 1,
    limit = 10,
    query = {},
    sort = { date: 1 }
  } = req.query;
  try {
    const tickets = await Ticket.find({
      customerName: new RegExp(customerName || ".*", "gi"),
      ...query
    })
      .sort(sort)
      .lean();

    return res.json(paginate(tickets, Number(page), Number(limit)));
  } catch (err) {
    return res.status(500).json(err);
  }
});

/**
 * @route   GET /api/admin/:id
 * @desc    GET ONE TICKET BY ADMIN
 * @access  PUBLIC
 */

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  if (!id) return res.status(400).json("ERROR CREDENTIALS");
  else {
    try {
      const ticket = await Ticket.findById(id);
      return res.json(ticket);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

/**
 * @route   PUT /api/admin/:id
 * @desc    EDIT ONE TICKET ADDING COMMENT OR CHANGING STATUS
 * @access  PUBLIC
 */

router.put("/:id", async (req, res) => {
  const { errors, isValid } = require("../validations/editCustomerByAdmin")(
    req.body,
    req.files,
    req.params.id
  );
  if (!isValid) return res.status(400).json(errors);
  else {
    try {
      const ticket = await Ticket.findById(req.params.id);
      ticket.adminResponse.message = req.body.message;
      ticket.adminResponse.date = Date.now();

      if (req.files && req.files.filesUploadedAdmin) {
        try {
          const fileNames = await uploadFiles(req.files.filesUploadedAdmin);
          if (ticket.filesUploadedAdmin.length > 0)
            await deleteFiles(ticket.filesUploadedAdmin);
          ticket.filesUploadedAdmin = fileNames;
        } catch (err) {
          return res.status(500).json({ errType: "ERROR UPLOADING FILE", err });
        }
      }
      if (req.body.status) ticket.status = req.body.status;
      const ticketUpdated = await ticket.save();
      return res.json(ticketUpdated);
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});

module.exports = router;
