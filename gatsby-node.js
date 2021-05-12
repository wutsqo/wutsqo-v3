const { create } = require("domain");
const path = require("path");
const _ = require("lodash");

exports.onCreateNode = ({ node, actions, getNode }) => {
  const { createNodeField } = actions;

  if (node.internal.type === "MarkdownRemark") {
    const slug = path.basename(node.fileAbsolutePath, ".md");
    const parent = getNode(_.get(node, "parent"));

    createNodeField({
      node,
      name: "collection",
      value: _.get(parent, "sourceInstanceName"),
    });

    createNodeField({
      node,
      name: "slug",
      value: slug,
    });
  }
};

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions;
  const blogTemplate = path.resolve("./src/templates/blog.js");

  const res = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "blog" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  res.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: blogTemplate,
      path: `/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });

  const bookTemplate = path.resolve("./src/templates/book.js");
  const resReads = await graphql(`
    query {
      allMarkdownRemark(filter: { fields: { collection: { eq: "reads" } } }) {
        edges {
          node {
            fields {
              slug
            }
          }
        }
      }
    }
  `);

  resReads.data.allMarkdownRemark.edges.forEach((edge) => {
    createPage({
      component: bookTemplate,
      path: `/reads/${edge.node.fields.slug}`,
      context: {
        slug: edge.node.fields.slug,
      },
    });
  });
};
