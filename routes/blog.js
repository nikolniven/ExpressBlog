const express = require("express");
const router = express.Router();

const db = require("../data/database");

router.get("/", function (req, res) {
  res.redirect("/posts");
});

router.get("/posts", async function (req, res) {
  // try {
  //   const query = `
  //     SELECT posts.*,
  //     authors.name AS author_name
  //     FROM posts
  //     INNER JOIN authors ON posts.author_id = authors.idauthors`;
  //   const [posts] = await db.query(query);
  //   res.render("posts-list", { posts: posts });
  // } catch (error) {
  //   console.error("Error fetching posts:", error);
  //   res.status(500).send("Internal Server Error");
  // }
  const query = `
  SELECT posts.*, authors.name AS author_name 
  FROM posts
  INNER JOIN authors ON posts.author_id = authors.idauthors`;
  const [posts] = await db.query(query);
  res.render("posts-list", { posts: posts });
});

router.get("/new-post", async function (req, res) {
 const [authors] = await db.query("SELECT * FROM authors");
    console.log("Authors fetched successfully:", authors);
    res.render("create-post", { authors: authors });
  } catch (error) {
    console.error("Error fetching authors:", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post("/posts", async function (req, res) {
  const { title, summary, content, author } = req.body;

  console.log("Request body:", req.body); // Log the request body

  // Validate author_id
  const authorId = parseInt(author, 10);
  if (isNaN(authorId) || authorId <= 0) {
    return res.status(400).json({ message: "Invalid or missing author ID" });
  }

  const data = [title, summary, content, authorId];

  try {
    const result = await db.query(
      "INSERT INTO posts (title, summary, body, author_id) VALUES (?, ?, ?, ?)",
      data,
    );
    res.redirect("/posts");
  } catch (error) {
    console.error("Error saving post:", error);
    res
      .status(500)
      .json({ message: "Failed to create post", error: error.message });
  }
});

router.get("/posts/:iddop", async function (req, res) {
  const query = `
  SELECT posts.*, authors.name AS author_name, authors.email AS author_email FROM posts
  INNER JOIN authors ON posts.author_id = authors.idauthors
  WHERE posts.id = ? `;
  const [posts] = await db.query(query, [req.params.iddop]);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  const postData = {
    ...posts[0],
    date: posts[0].date.toISOString(),
    humanReadableDate: posts[0].date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }),
  };

  console.log(posts[0].date);

  res.render("post-detail", { post: postData });
});

router.get("/posts/:id/edit", async function (req, res) {
  const query = `
  SELECT * FROM posts WHERE id = ?`;
  const [posts] = await db.query(query, [req.params.id]);
  if (!posts || posts.length === 0) {
    return res.status(404).render("404");
  }
  res.render("update-post", { post: posts[0] });
});

router.post("/posts/:idd/edit", async function (req, res) {
  const query = `
  UPDATE posts SET title = ?, summary = ?, body = ?
  WHERE id = ?
`;
  await db.query(query, [
    req.body.title,
    req.body.summary,
    req.body.content,
    req.params.idd,
  ]);

  res.redirect("/posts");
});

router.post("/posts/:id/delete", async function (req, res) {
  await db.query("DELETE FROM posts WHERE id = ?", [req.params.id]);
  res.redirect("/posts");
});
module.exports = router;
