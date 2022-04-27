const solrNode = require("solr-node");

let host = "localhost";
//let host = 'solrdb'

const client = new solrNode({
  host: host,
  port: 8983,
  core: "Books",
  protocol: "http",
});

module.exports = client
