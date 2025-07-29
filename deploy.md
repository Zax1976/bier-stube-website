# GitHub Pages Deployment Instructions

Your website files are ready! To deploy to GitHub Pages:

## Option 1: Upload files directly
1. Go to https://github.com/Zax1976/bier-stube-website
2. Click "uploading an existing file"
3. Drag and drop all the files from this directory
4. Commit the files

## Option 2: Use Git with Personal Access Token
1. Generate token at: https://github.com/settings/tokens
2. Run: `git remote add origin https://github.com/Zax1976/bier-stube-website.git`
3. Run: `git push -u origin master` (use token as password)

## Enable GitHub Pages
1. Go to repository Settings
2. Scroll to "Pages" section
3. Source: Deploy from branch
4. Branch: master / (root)
5. Save

Your website will be available at: https://zax1976.github.io/bier-stube-website/

The main file to use is `index-stunning.html` - this is your completed website!