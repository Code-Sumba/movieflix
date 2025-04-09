const ghpages = require('gh-pages');
const path = require('path');

// Deploy the build folder to GitHub Pages with increased timeout
ghpages.publish(
  path.join(process.cwd(), 'build'),
  {
    branch: 'gh-pages',
    repo: 'https://github.com/Code-Sumba/movieflix.git',
    message: 'Auto-generated commit with updated features',
    push: true,
    silent: false,
    timeout: 120000, // 2 minutes timeout
  },
  function(err) {
    if (err) {
      console.error('Deployment error:', err);
    } else {
      console.log('Successfully deployed to GitHub Pages!');
      console.log('Your site should be available at: https://code-sumba.github.io/movieflix');
    }
  }
); 