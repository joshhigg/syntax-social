// Helper to format date as MM/DD/YYYY
module.exports = {
    format_date: (date) => {
      return date.toLocaleDateString();
    },
};

module.exports = {
  format_date: (date) => {
      return date.toLocaleDateString();
  },
  // for sorting posts in descending order
  sort_posts_desc: (posts) => {
      return posts.sort((a, b) => new Date(b.date_created) - new Date(a.date_created));
  },
};