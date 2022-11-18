const express = require("express");
const pool = require("../config");
const techRoute = express.Router();

techRoute.get("/tickets/campus/:id", async (req, res) => {
  console.log('11')
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT * FROM tickets WHERE campus_id = $1;",
      [id]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});

/* Add a tech route for the single page tickets.*/

techRoute.get("/ticket/:id", async (req, res) => {

  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT tickets.ticket_id, tickets.priority, tickets.descrip, tickets.category,tickets.user_id, TO_CHAR(create_date, 'Mon dd, yyyy'), campus.name FROM tickets JOIN campus ON tickets.campus_ID = campus.campus_id WHERE ticket_id = $1",
      [id]
    );
    // second query gets the user account who made the ticket coming the query above
    const result = await pool.query("SELECT * FROM accounts WHERE user_id=$1", [rows[0].user_id])
    const test = result.rows[0]

    res.status(200).send([...rows, test])
  } catch (err) {
    console.error(err.message)
  }
});

techRoute.get("/ticket/:id/comment", async (req, res) => {
  console.log('33')
  try {
    const { id } = req.params;
    const { rows } = await pool.query(
      "SELECT comment FROM ticket_Comments WHERE ticket_id = $1",
      [id]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});

techRoute.post("/ticket/comment", async (req, res) => {
  console.log('44')
  try {
    const { user_id, ticket_id, comment } = req.body;
    const { rows } = await pool.query(
      "INSERT INTO ticket_Comments(user_id, ticket_id, comment) VALUES($1, $2, $3)",
      [user_id, ticket_id, comment]
    );
    res.status(200).send(rows);
  } catch (err) {
    console.error(err.message);
  }
});
// /* Add patch route for edit comment on single ticket page.*/
// techRoute.patch("//edit/:id", async (req, res) => {
//   const { id } = req.params;
//   try {
//     const { userName } = req.body;
//     const { rows } = await pool.query(
//       "UPDATE accounts SET userName = $1 WHERE user_id = $2 RETURNING *;",
//       [userName, id]
//     );
//     res.status(200).send(rows);
//   } catch (err) {
//     console.error(err.message);
//   }
// });

module.exports = techRoute;
