const fs = require('fs');

const header = fs.readFileSync('src/app/components/header/header.component.html', 'utf8');
const home = fs.readFileSync('src/app/pages/home/home.component.html', 'utf8');
const footer = fs.readFileSync('src/app/components/footer/footer.component.html', 'utf8');
const styles = fs.readFileSync('src/styles.css', 'utf8');

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ArborTechnologies | Premium DevOps</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;500;600;700;800;900&family=JetBrains+Mono:wght@400;500&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="style.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</head>
<body class="light-theme" style="background-color: var(--bg-base); color: var(--text-primary);">
${header}
${home}
${footer}
</body>
</html>`;

fs.writeFileSync('index.html', htmlContent);
fs.writeFileSync('style.css', styles);

console.log('Successfully updated index.html and style.css');
